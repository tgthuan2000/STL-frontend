import { SanityAssetDocument } from '@sanity/client'
import React, { useEffect } from 'react'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { GET_TOP_FEEDBACK } from '~/schema/query/feedback'

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

const useFeedback = () => {
    const [{ feedbacks }, fetchData] = useQuery<QueryData>(
        { feedbacks: GET_TOP_FEEDBACK },
        {},
        { feedbacks: TAGS.ALTERNATE }
    )

    useEffect(() => {
        fetchData()
    }, [])

    return { feedbacks }
}

export default useFeedback
