import { isEmpty } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FeedbackQueryData, IFeedback } from '~/@types/feedback'
import { ParamsTypeUseQuery, QueryTypeUseQuery, RefactorUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { GET_FEEDBACK_BY_ID, GET_FEED_BACK_BY_PARENT_ID } from '~/schema/query/feedback'

interface State {
    query: QueryTypeUseQuery<FeedbackQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<FeedbackQueryData>
    refactor: RefactorUseQuery<FeedbackQueryData>
}

const useFeedbackDetail = (feedbackId: string | null) => {
    const isRevert = useRef(true)
    const [{ query, params, tags, refactor }, setQuery] = useState<State>({
        query: { feedback: GET_FEEDBACK_BY_ID },
        params: { feedbackId },
        tags: { feedback: TAGS.ALTERNATE },
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

    const [{ feedback }, , , reload, ,] = useQuery<FeedbackQueryData>(query, params, tags, refactor, isRevert.current)

    useEffect(() => {
        if (feedbackId) {
            isRevert.current = false
            setQuery((prev) => ({
                ...prev,
                query: { feedback: GET_FEEDBACK_BY_ID },
                params: { ...prev.params, status: 'old' },
            }))
            reload('feedback')
        }
    }, [feedbackId])

    const handleSeeMoreClick = useCallback((parentId: string) => {
        const count = feedback.data?.data.filter((d) => d.parent?._id === parentId && d.deleted === false).length || 0
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
    }, [])

    return { feedback, actions: { seeMoreClick: handleSeeMoreClick } }
}

export default useFeedbackDetail
