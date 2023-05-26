import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TAGS } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { useCheck, useConfig } from '~/context'
import { useQuery } from '~/hook'
import { service } from '~/services'
import { useProfile } from '~/store/auth'

export interface BudgetCategoryDetail {
    _id: string
    categorySpending: { _id: string; name: string }
    amount: number
    spending: BudgetDetailItem[]
}

export interface BudgetMethodDetail {
    _id: string
    methodSpending: { _id: string; name: string }
    amount: number
    spending: BudgetDetailItem[]
}

interface BudgetDetailItem {
    _id: string
    categorySpending: { _id: string; name: string }
    methodSpending: { name: string }
    kindSpending: { _id: string; name: string; key: KIND_SPENDING }
    description?: string
    amount: number
    date: string
}

interface Query {
    budget: BudgetCategoryDetail | BudgetMethodDetail
}

const useBudgetDetail = (query: string) => {
    const { id } = useParams()
    const { userProfile } = useProfile()
    const { getKindSpendingId } = useConfig()

    const [data, fetch, deleteCache, reload] = useQuery<Query>(
        { budget: query },
        {
            userId: userProfile?._id as string,
            startDate: service.getDateOfMonth('start'),
            endDate: service.getDateOfMonth('end'),
            budgetKind: getKindSpendingId('COST') as string,
            budgetId: id,
        },
        { budget: TAGS.ALTERNATE }
    )

    const refetch = useCallback(() => {
        deleteCache('budget')
        reload()
    }, [])

    useEffect(() => {
        fetch()
    }, [])

    useCheck(reload)

    return { data, refetch }
}

export default useBudgetDetail
