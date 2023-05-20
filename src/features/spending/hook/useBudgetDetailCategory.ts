import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TAGS } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { useConfig } from '~/context'
import { useQuery } from '~/hook'
import { GET_BUDGET_CATEGORY_DETAIL_SPENDING_BY_MONTH } from '~/schema/query/spending'
import { service } from '~/services'
import { useProfile } from '~/store/auth'

export interface BudgetCategoryDetail {
    _id: string
    categorySpending: { _id: string; name: string }
    amount: number
    spending: BudgetCategoryDetailItem[]
}

export interface BudgetCategoryDetailItem {
    _id: string
    categorySpending: { _id: string; name: string }
    methodSpending: { name: string }
    kindSpending: { _id: string; name: string; key: KIND_SPENDING }
    description?: string
    amount: number
    date: string
}

interface Query {
    budget: BudgetCategoryDetail
}

const useBudgetDetailCategory = () => {
    const { id } = useParams()
    const { userProfile } = useProfile()
    const { getKindSpendingId } = useConfig()

    const [data, fetch, deleteCache, reload] = useQuery<Query>(
        { budget: GET_BUDGET_CATEGORY_DETAIL_SPENDING_BY_MONTH },
        {
            userId: userProfile?._id as string,
            startDate: service.getDateOfMonth('start'),
            endDate: service.getDateOfMonth('end'),
            budgetKind: getKindSpendingId('COST') as string,
            budgetId: id,
        },
        { budget: TAGS.ALTERNATE }
    )

    const refetch = () => {
        deleteCache('budget')
        reload()
    }

    useEffect(() => {
        fetch()
    }, [])

    return { data, refetch }
}

export default useBudgetDetailCategory
