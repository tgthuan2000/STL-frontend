import { SanityAssetDocument } from '@sanity/client'
import { get } from 'lodash'
import React, { useEffect } from 'react'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_TOP_FEEDBACK, SUBSCRIPTION_TOP_FEED_BACK } from '~/schema/query/feedback'

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
}

interface QueryData {
    feedbacks: IFeedback[]
}

interface FeedbackSubscription {
    _id: string
    parent: { _ref: string } | null
}

const useTopFeedback = () => {
    const [{ feedbacks }, fetchData, deleteCache, reloadData, , updateData] = useQuery<QueryData>(
        { feedbacks: GET_TOP_FEEDBACK },
        {
            __fromFeedback: 0,
            __toFeedback: 10,
        },
        { feedbacks: TAGS.ALTERNATE }
    )

    useEffect(() => {
        fetchData()
    }, [])

    // useEffect(() => {
    //     const sub = client.listen<FeedbackSubscription>(SUBSCRIPTION_TOP_FEED_BACK).subscribe((update) => {
    //         if (update.documentId.includes('drafts')) return
    //         if (update.result) {
    //             const __ = update.result as FeedbackSubscription

    //             console.log(__)

    //             setTimeout(async () => {
    //                 try {
    //                     switch (update.transition) {
    //                         case 'update': {
    //                             updateData((prev) => {
    //                                 const temp = structuredClone(prev.feedbacks.data)
    //                                 const index = temp?.findIndex((d) => d._id === __._id)
    //                                 if (index !== undefined && index !== -1 && temp?.[index]) {
    //                                     temp[index] = {
    //                                         ...temp?.[index],
    //                                         // edited: get(__, 'edited') as any,
    //                                         // deleted: get(__, 'deleted') as any,
    //                                         // message: get(__, 'message') as any,
    //                                     }
    //                                     return { ...prev, feedbacks: { ...prev.feedbacks, data: temp } }
    //                                 }
    //                                 return prev
    //                             })
    //                             break
    //                         }
    //                         case 'appear': {
    //                             // setQuery((prev) => ({
    //                             //     ...prev,
    //                             //     query: {
    //                             //         feedback: GET_FEED_BACK_BY_PARENT_ID,
    //                             //     },
    //                             //     params: {
    //                             //         ...prev.params,
    //                             //         __fromFeedback: 0,
    //                             //         __toFeedback: 1,
    //                             //         parentId: __.parent?._ref ?? null,
    //                             //         status: 'new',
    //                             //     },
    //                             // }))
    //                             // reload('feedback')
    //                             break
    //                         }
    //                     }
    //                 } catch (error) {
    //                     console.log(error)
    //                 } finally {
    //                 }
    //             }, 1000)
    //         }
    //     })

    //     return () => {
    //         sub.unsubscribe()
    //     }
    // }, [])

    const refetch = () => {
        deleteCache('feedbacks')
        reloadData()
    }

    return { feedbacks, refetch }
}

export default useTopFeedback
