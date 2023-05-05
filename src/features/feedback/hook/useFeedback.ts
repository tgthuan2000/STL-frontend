import { get, isEmpty } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Feedback, FeedbackQueryData, IFeedback } from '~/@types/feedback'
import { ParamsTypeUseQuery, QueryTypeUseQuery, RefactorUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { client } from '~/sanityConfig'
import {
    GET_FEED_BACK_USER_BY_PARENT_ID,
    GET_FIRST_FEED_BACK_USER_BY_PARENT_ID,
    GET_PARENT_FEED_BACK,
    SUBSCRIPTION_FEED_BACK,
} from '~/schema/query/feedback'
import { service } from '~/services'
import { useProfile } from '~/store/auth'

interface QueryState {
    query: QueryTypeUseQuery<FeedbackQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<FeedbackQueryData>
    refactor: RefactorUseQuery<FeedbackQueryData>
}

interface FeedbackSubscription {
    _id: string
    parent: { _ref: string } | null
}

interface useFeedbackOption {
    cancelListToTree?: boolean
}

const useFeedback = (options?: useFeedbackOption) => {
    const { cancelListToTree } = options || {}
    const { userProfile } = useProfile()
    const isRevert = useRef(true)
    const [{ query, params, tags, refactor }, setQuery] = useState<QueryState>({
        query: {
            feedback: GET_PARENT_FEED_BACK,
        },
        params: {
            userId: userProfile?._id as string,
            parentId: null,
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

    const [{ feedback }, fetchData, , reload, , updateData, getCurrentData] = useQuery<FeedbackQueryData>(
        query,
        params,
        tags,
        refactor,
        isRevert.current
    )

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
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
                                    const current = getCurrentData()
                                    const feedbackData = current?.feedback.data?.data

                                    if (
                                        __.parent?._ref &&
                                        !feedbackData?.find((item) => item._id === __.parent?._ref)
                                    ) {
                                        return
                                    }
                                    isRevert.current = true
                                    setQuery((prev) => ({
                                        ...prev,
                                        query: {
                                            feedback: GET_FIRST_FEED_BACK_USER_BY_PARENT_ID,
                                        },
                                        params: {
                                            ...prev.params,
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
    }, [])

    const treeData = useMemo(() => {
        if (!feedback.data?.data || cancelListToTree) return []
        return service.listToTree<Feedback>(feedback.data?.data, (item) => item.parent?._id)
    }, [feedback.data?.data])

    const handleSeeMoreClick = useCallback(
        (parentId: string, excludes?: string[]) => {
            isRevert.current = false
            setQuery((prev) => ({
                ...prev,
                query: {
                    feedback: GET_FEED_BACK_USER_BY_PARENT_ID,
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

    return { feedback, treeData, actions: { seeMoreClick: handleSeeMoreClick } }
}

export default useFeedback
