import { get, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { FeedbackQueryData, IFeedback } from '~/@types/feedback'
import { Transaction } from '~/components'
import { TAGS } from '~/constant'
import { useLoading } from '~/context'
import { useQuery } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery, RefactorUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import { client } from '~/sanityConfig'
import { GET_FEED_BACK_BY_PARENT_ID, GET_PARENT_FEED_BACK, SUBSCRIPTION_FEED_BACK } from '~/schema/query/feedback'
import useAuth from '~/store/auth'
import { InputForm, Messages } from '../components'

const Dashboard = () => {
    const { userProfile } = useAuth()
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

    const [{ feedback }, fetchData, , reload] = useQuery<FeedbackQueryData>(query, params, tags, refactor)

    useEffect(() => {
        const sub = client
            .listen<{ _id: string; parentId: string | null }>(SUBSCRIPTION_FEED_BACK, { userId: userProfile?._id })
            .subscribe((update) => {
                if (update.documentId.includes('drafts')) return
                if (update.result) {
                    const __ = update.result as { _id: string; parentId: string | null }
                    if (get(__, 'feedbackForUser._ref') !== userProfile?._id) return
                    // if(__.parentId === null || !feedback.data?.data.some(d => d.parentId === __.parentId)) return
                    setTimeout(async () => {
                        try {
                            switch (update.transition) {
                                case 'update': {
                                    // setNotify((prev) => {
                                    //     const index = prev.findIndex((item) => item._id === data._id)
                                    //     if (index > -1) {
                                    //         prev[index] = data
                                    //     }
                                    //     return prev
                                    // })
                                    // setTotal((prev) => (data.read ? prev - 1 : prev + 1))
                                    break
                                }
                                case 'appear': {
                                    setQuery((prev) => ({
                                        ...prev,
                                        query: {
                                            feedback: GET_FEED_BACK_BY_PARENT_ID,
                                        },
                                        params: {
                                            ...prev.params,
                                            __fromFeedback: 0,
                                            __toFeedback: 1,
                                            parentId: __.parentId,
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
        const count = feedback.data?.data.filter((d) => d.parentId === parentId).length || 0
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
            parentId: null,
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

    const handleReplyMessage = async (message: string, parentId: string) => {
        if (!parentId || !message) return

        const __ = client.transaction()
        __.create({
            _type: 'feedback',
            message,
            parentId,
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

    return (
        <Transaction hasBack={false} title='Phản hồi'>
            <div className='mt-5 bg-gray-200 dark:bg-slate-800 sm:rounded-lg -mx-4 sm:-mx-0 h-[80vh] flex flex-col'>
                <div className='flex-1 sm:px-5 pb-10 px-3 overflow-auto'>
                    {loading.submit && (
                        <p className='text-gray-700 dark:text-slate-300 text-center mt-2'>Đang tải nội dung...</p>
                    )}
                    <Messages
                        data={feedback.data?.data}
                        onSeeMoreClick={handleSeeMoreClick}
                        onReply={handleReplyMessage}
                    />
                </div>
                <div className='flex-shrink-0 border-t dark:border-slate-700 sm:p-5 p-3'>
                    <InputForm onSubmit={handleSubmitNewMessage} />
                </div>
            </div>
        </Transaction>
    )
}

export default Dashboard
