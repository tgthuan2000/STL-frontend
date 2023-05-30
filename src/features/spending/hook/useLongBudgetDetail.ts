import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TAGS } from '~/constant'
import { useCheck } from '~/context'
import { useQuery } from '~/hook'
import { GET_LONG_BUDGET_DETAIL } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'

export interface LongBudgetDetailItem {
    _id: string
    _createdAt: string
    amount: number
    description?: string
    method: { _id: string; name: string }
}

export interface LongBudgetDetail {
    _id: string
    amount: number
    duration: string
    items: LongBudgetDetailItem[]
}

interface Query {
    longBudget: LongBudgetDetail
}

const useLongBudgetDetail = () => {
    const { id } = useParams()
    const { userProfile } = useProfile()

    const [data, fetch, deleteCache, reload] = useQuery<Query>(
        { longBudget: GET_LONG_BUDGET_DETAIL },
        {
            userId: userProfile?._id as string,
            budgetId: id,
        },
        { longBudget: TAGS.ALTERNATE }
    )

    const refetch = useCallback(() => {
        deleteCache('longBudget')
        reload()
    }, [])

    useEffect(() => {
        fetch()
    }, [])

    useCheck(reload)

    return { data, refetch }
}

export default useLongBudgetDetail
