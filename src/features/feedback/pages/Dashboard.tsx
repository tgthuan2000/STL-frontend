import { cloneDeep, get, isEmpty } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FeedbackQueryData, IFeedback } from '~/@types/feedback'
import { ParamsTypeUseQuery, QueryTypeUseQuery, RefactorUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { Transaction } from '~/components'
import { TAGS } from '~/constant'
import { useLoading } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_FEED_BACK_BY_PARENT_ID, GET_PARENT_FEED_BACK, SUBSCRIPTION_FEED_BACK } from '~/schema/query/feedback'
import { useProfile } from '~/store/auth'
import { InputForm, Messages } from '../components'

const Dashboard = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const { loading, setSubmitLoading } = useLoading()
    const [{ query, params, tags, refactor }, setQuery] = useState<{
        query: QueryTypeUseQuery<FeedbackQueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<FeedbackQueryData>
        refactor: RefactorUseQuery<FeedbackQueryData>
    }>({
        query: {
            feedback: GET_PARENT_FEED_BACK,
        },
        params: {
            userId: userProfile?._id as string,
            parentId: null,
            __fromFeedback: 0,
            __toFeedback: 10,
        },
        tags: {
            feedback: TAGS.ALTERNATE,
        },
        refactor: ({ feedback }) => {
            const data =
                feedback.data.reduce((acc, cur) => {
                    const { children, ...d } = cur

                    acc.push({ ...d, children: [] })

                    if (children && !isEmpty(children)) {
                        acc.push(...children.map((child) => ({ ...child, children: [] })))
                    }

                    return acc
                }, [] as IFeedback[]) || []

            return {
                feedback: {
                    data,
                },
            }
        },
    })

    const isRevert = useRef(true)
    const [{ feedback }, fetchData, , reload, , updateData] = useQuery<FeedbackQueryData>(
        query,
        params,
        tags,
        refactor,
        isRevert.current
    )

    useEffect(() => {
        const sub = client
            .listen<{ _id: string; parentId: string | null }>(SUBSCRIPTION_FEED_BACK, { userId: userProfile?._id })
            .subscribe((update) => {
                if (update.documentId.includes('drafts')) return
                if (update.result) {
                    const __ = update.result as { _id: string; parentId: string | null }
                    if (get(__, 'feedbackForUser._ref') !== userProfile?._id) return

                    setTimeout(async () => {
                        try {
                            switch (update.transition) {
                                case 'update': {
                                    updateData((prev) => {
                                        const temp = cloneDeep(prev.feedback.data?.data)
                                        const index = temp?.findIndex((d) => d._id === __._id)
                                        if (index !== undefined && index !== -1 && temp?.[index]) {
                                            temp[index] = {
                                                ...temp?.[index],
                                                edited: get(__, 'edited') as any,
                                                deleted: get(__, 'deleted') as any,
                                                message: get(__, 'message') as any,
                                            }
                                            return { ...prev, feedback: { ...prev.feedback, data: { data: temp } } }
                                        }
                                        return prev
                                    })
                                    break
                                }
                                case 'appear': {
                                    isRevert.current = true
                                    setQuery((prev) => ({
                                        ...prev,
                                        query: {
                                            feedback: GET_FEED_BACK_BY_PARENT_ID,
                                        },
                                        params: {
                                            ...prev.params,
                                            __fromFeedback: 0,
                                            __toFeedback: 1,
                                            parentId: __.parentId ?? null,
                                            status: 'new',
                                        },
                                    }))
                                    reload('feedback')
                                    break
                                }
                            }
                        } catch (error) {
                            console.log(error)
                        } finally {
                        }
                    }, 1000)
                }
            })

        return () => {
            sub.unsubscribe()
        }
    }, [])

    const handleSeeMoreClick = (parentId: string) => {
        const count = feedback.data?.data.filter((d) => d.parentId === parentId && d.deleted === false).length || 0
        isRevert.current = false
        setQuery((prev) => ({
            ...prev,
            query: {
                feedback: GET_FEED_BACK_BY_PARENT_ID,
            },
            params: {
                ...prev.params,
                __fromFeedback: count,
                __toFeedback: count + 10,
                parentId,
                status: 'old',
            },
        }))
        reload('feedback')
    }

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [])

    const handleSubmitNewMessage = async (message: string) => {
        if (!message) return

        const __ = client.transaction()
        __.create({
            _type: 'feedback',
            message,
            user: {
                _type: 'reference',
                _ref: userProfile?._id as string,
            },
            edited: false,
            deleted: false,
            feedbackForUser: {
                _type: 'reference',
                _ref: userProfile?._id as string,
            },
        })

        await __.commit()
    }

    const handleReplyMessage = async (message: string, parentId: string) => {
        if (!parentId || !message) return

        const __ = client.transaction()
        __.create({
            _type: 'feedback',
            message,
            parentId,
            edited: false,
            deleted: false,
            user: {
                _type: 'reference',
                _ref: userProfile?._id as string,
            },
            feedbackForUser: {
                _type: 'reference',
                _ref: userProfile?._id as string,
            },
        })

        await __.commit()
    }

    const handleEditMessage = async (message: string, _id: string) => {
        if (!_id || !message) return

        const __ = client.transaction()

        __.patch(_id, {
            set: {
                message,
                edited: true,
            },
        })

        await __.commit()
    }

    const handleDeleteMessage = async (_id: string) => {
        if (!_id) return

        const __ = client.transaction()
        __.patch(_id, {
            set: {
                deleted: true,
            },
        })
        await __.commit()
    }

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.FEEDBACK)}>
            <div className='-mx-4 mt-5 flex h-[80vh] flex-col bg-gray-200 dark:bg-slate-800 sm:-mx-0 sm:rounded-lg'>
                <div className='flex-1 overflow-auto px-3 pb-10 sm:px-5'>
                    {loading.submit && (
                        <p className='mt-5 text-center text-gray-700 dark:text-slate-300'>{t(LANGUAGE.LOADING)}</p>
                    )}
                    <Messages
                        data={feedback.data?.data}
                        onSeeMoreClick={handleSeeMoreClick}
                        onReply={handleReplyMessage}
                        onEdit={handleEditMessage}
                        onDelete={handleDeleteMessage}
                    />
                </div>
                <div className='flex-shrink-0 border-t p-3 dark:border-slate-700 sm:p-5'>
                    <InputForm onSubmit={handleSubmitNewMessage} />
                </div>
            </div>
        </Transaction>
    )
}

export default Dashboard
