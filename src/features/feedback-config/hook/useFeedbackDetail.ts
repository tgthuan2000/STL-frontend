import { get, isEmpty } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Feedback, FeedbackQueryData, IFeedback } from '~/@types/feedback'
import { ParamsTypeUseQuery, QueryTypeUseQuery, RefactorUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { client } from '~/sanityConfig'
import {
    GET_FEEDBACK_BY_ID,
    GET_FEEDBACK_PARENT_BY_ID,
    GET_FEED_BACK_BY_PARENT_ID,
    GET_FIRST_FEED_BACK_BY_PARENT_ID,
    SUBSCRIPTION_FEED_BACK,
} from '~/schema/query/feedback'
import { useProfile } from '~/store/auth'
import { listToTree } from '../services'

interface State {
    query: QueryTypeUseQuery<FeedbackQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<FeedbackQueryData>
    refactor: RefactorUseQuery<FeedbackQueryData>
}

interface useFeedbackDetailOptions {
    feedbackId: string | null
    cancelListToTree?: boolean
}

interface FeedbackSubscription {
    _id: string
    parent: { _ref: string } | null
}

const useFeedbackDetail = (options: useFeedbackDetailOptions) => {
    const { feedbackId, cancelListToTree } = options
    const isRevert = useRef(true)
    const { userProfile } = useProfile()
    const [{ query, params, tags, refactor }, setQuery] = useState<State>({
        query: { feedback: GET_FEEDBACK_BY_ID },
        params: { feedbackId, status: 'old' },
        tags: { feedback: TAGS.SHORT },
        refactor: ({ feedback }) => {
            const data =
                feedback.data.reduce((acc, cur) => {
                    const { children, parent, ...d } = cur

                    acc.push({ ...d, parent: parent ? ({ _id: parent?._id } as Feedback) : null, children: [] })

                    if (children && !isEmpty(children)) {
                        acc.push(...children.map((child) => ({ ...child, children: [] })))
                    }

                    if (parent?.parent) {
                        acc.push({ ...parent, children: [] })
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

    const [{ feedback }, , deleteCache, reload, , updateData] = useQuery<FeedbackQueryData>(
        query,
        params,
        tags,
        refactor
    )

    useEffect(() => {
        let timeout = setTimeout(() => {
            if (feedbackId) {
                setQuery((prev) => ({
                    ...prev,
                    query: { feedback: GET_FEEDBACK_BY_ID },
                    params: { ...prev.params, feedbackId, status: 'old' },
                }))
                deleteCache('feedback')
                reload()
            }
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [feedbackId])

    useEffect(() => {
        if (!feedbackId) return

        const sub = client
            .listen<FeedbackSubscription>(SUBSCRIPTION_FEED_BACK, {
                userId: userProfile?._id,
            })
            .subscribe((update) => {
                if (update.documentId.includes('drafts')) return
                if (update.result) {
                    const __ = update.result as FeedbackSubscription

                    setTimeout(async () => {
                        try {
                            switch (update.transition) {
                                case 'update': {
                                    updateData((prev) => {
                                        const temp = structuredClone(prev.feedback.data?.data)
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
                                            feedback: GET_FIRST_FEED_BACK_BY_PARENT_ID,
                                        },
                                        params: {
                                            ...prev.params,
                                            __excludeIds: [],
                                            parentId: __.parent?._ref ?? null,
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
    }, [feedbackId])

    const treeData = useMemo(() => {
        if (!feedback.data?.data || cancelListToTree) return []
        return listToTree(feedback.data?.data)
    }, [feedback.data?.data])

    const handleSeeMoreClick = useCallback(
        (parentId: string, excludes?: string[]) => {
            setQuery((prev) => ({
                ...prev,
                query: {
                    feedback: GET_FEED_BACK_BY_PARENT_ID,
                },
                params: {
                    ...prev.params,
                    __excludeIds: excludes ?? [],
                    parentId,
                    status: 'old',
                },
            }))
            reload('feedback')
        },
        [feedback.data?.data]
    )

    const handleGetParent = useCallback((parentId: string) => {
        setQuery((prev) => ({
            ...prev,
            query: {
                feedback: GET_FEEDBACK_PARENT_BY_ID,
            },
            params: {
                ...prev.params,
                feedbackId: parentId,
                status: 'old',
            },
        }))

        reload('feedback')
    }, [])

    return { feedback, treeData, actions: { seeMoreClick: handleSeeMoreClick, getParent: handleGetParent } }
}

export default useFeedbackDetail
