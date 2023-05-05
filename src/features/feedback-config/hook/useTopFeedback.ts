import { useEffect, useState } from 'react'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_TOP_FEEDBACK, GET_TOP_FEEDBACK_BY_ID, SUBSCRIPTION_TOP_FEED_BACK } from '~/schema/query/feedback'

export interface IUser {
    _id: string
    userName: string
    email: string
    image: string
}

export interface IFeedback {
    _id: string
    _createdAt: string
    message: string
    parentId: string | null
    user: IUser
    deleted: boolean
    edited: boolean
}

interface QueryData {
    feedbacks: {
        data: IFeedback[]
    }
}

interface FeedbackSubscription {
    _id: string
    parent: { _ref: string } | null
}

interface QueryState {
    query: QueryTypeUseQuery<QueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<QueryData>
}

const useTopFeedback = () => {
    const [{ query, params, tags }, setQuery] = useState<QueryState>({
        query: { feedbacks: GET_TOP_FEEDBACK },
        params: {},
        tags: {
            feedbacks: TAGS.ALTERNATE,
        },
    })

    const [{ feedbacks }, fetchData, deleteCache, reloadData, , updateData] = useQuery<QueryData>(query, params, tags)

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const sub = client.listen<FeedbackSubscription>(SUBSCRIPTION_TOP_FEED_BACK).subscribe((update) => {
            if (update.documentId.includes('drafts')) return
            if (update.result) {
                const __ = update.result as FeedbackSubscription

                console.log(__)

                setTimeout(async () => {
                    try {
                        switch (update.transition) {
                            case 'update': {
                                break
                            }
                            case 'appear': {
                                setQuery((prev) => ({
                                    ...prev,
                                    query: {
                                        feedbacks: GET_TOP_FEEDBACK_BY_ID,
                                    },
                                    params: {
                                        ...prev.params,
                                        id: __._id,
                                    },
                                }))
                                reloadData('feedbacks')
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

    const refetch = () => {
        deleteCache('feedbacks')
        reloadData()
    }

    return { feedbacks, refetch }
}

export default useTopFeedback
