import { isEmpty } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FeedbackQueryData, IFeedback } from '~/@types/feedback'
import { ParamsTypeUseQuery, QueryTypeUseQuery, RefactorUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { GET_FEEDBACK_BY_ID, GET_FEED_BACK_BY_PARENT_ID } from '~/schema/query/feedback'
import { listToTree } from '../services'

interface State {
    query: QueryTypeUseQuery<FeedbackQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<FeedbackQueryData>
}

interface useFeedbackDetailOptions {
    feedbackId: string | null
    cancelListToTree?: boolean
}

const useFeedbackDetail = (options: useFeedbackDetailOptions) => {
    const { feedbackId, cancelListToTree } = options
    const [{ query, params, tags }, setQuery] = useState<State>({
        query: { feedback: GET_FEEDBACK_BY_ID },
        params: { feedbackId, status: 'old' },
        tags: { feedback: TAGS.ALTERNATE },
    })

    const [{ feedback }, , deleteCache, reload, ,] = useQuery<FeedbackQueryData>(query, params, tags)

    useEffect(() => {
        if (feedbackId) {
            setQuery((prev) => ({
                ...prev,
                query: { feedback: GET_FEEDBACK_BY_ID },
                params: { ...prev.params, feedbackId, status: 'old' },
            }))
            deleteCache('feedback')
            reload()
        }
    }, [feedbackId])

    const treeData = useMemo(() => {
        if (!feedback.data?.data || cancelListToTree) return []
        return listToTree(feedback.data?.data)
    }, [feedback.data?.data])

    const handleSeeMoreClick = useCallback((parentId: string) => {
        const count = feedback.data?.data.filter((d) => d.parent?._id === parentId && d.deleted === false).length || 0
        setQuery((prev) => ({
            ...prev,
            query: {
                feedback: GET_FEED_BACK_BY_PARENT_ID,
            },
            params: {
                ...prev.params,
                parentId,
                status: 'old',
            },
        }))
        reload('feedback')
    }, [])

    const handleGetParent = useCallback((parentId: string) => {
        setQuery((prev) => ({
            ...prev,
        }))

        reload('feedback')
    }, [])

    return { feedback, treeData, actions: { seeMoreClick: handleSeeMoreClick, getParent: handleGetParent } }
}

export default useFeedbackDetail
