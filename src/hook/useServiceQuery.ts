import { useMemo } from 'react'
import { useConfig } from '~/context'
import { service } from '~/services'
import * as services from '~/services/query'
import { useProfile } from '~/store/auth'

const useServiceQuery = () => {
    let { userProfile } = useProfile()
    const { getKindSpendingId, getKindSpendingIds, budgetSpending } = useConfig()

    const cost = useMemo(() => getKindSpendingId('COST') as string, [])
    const receive = useMemo(() => getKindSpendingId('RECEIVE') as string, [])
    const transferFrom = useMemo(() => getKindSpendingId('TRANSFER_FROM') as string, [])
    const transferTo = useMemo(() => getKindSpendingId('TRANSFER_TO') as string, [])
    const loan = useMemo(() => getKindSpendingId('LOAN') as string, [])
    const getLoan = useMemo(() => getKindSpendingId('CREDIT') as string, [])

    return {
        // SPENDING
        COST_CATEGORY_SPENDING: services.getCategorySpending({ userProfile, kindSpending: cost }),
        RECEIVE_CATEGORY_SPENDING: services.getCategorySpending({ userProfile, kindSpending: receive }),
        TRANSFER_FROM_CATEGORY_SPENDING: services.getCategorySpending({ userProfile, kindSpending: transferFrom }),
        TRANSFER_TO_CATEGORY_SPENDING: services.getCategorySpending({ userProfile, kindSpending: transferTo }),
        RECENT_SPENDING_PAGINATE: services.getRecentSpendingPaginate({ userProfile, getKindSpendingIds }),
        RECENT_LOAN_PAGINATE: services.getRecentLoanPaginate({ userProfile, getKindSpendingIds }),
        RECENT_LOAN_FILTER_DATE_RANGE_PAGINATE: services.getRecentLoanFilterDateRangePaginate({
            userProfile,
            getKindSpendingIds,
        }),
        RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE: services.getRecentSpendingFilterDateRangePaginate({
            userProfile,
            getKindSpendingIds,
        }),
        METHOD_SPENDING: services.getMethodSpending({ userProfile }),
        METHOD_SPENDING_DESC_SURPLUS: services.getMethodSpendingDescSurplus({ userProfile }),
        RECENT_SPENDING: services.getRecentSpending({ userProfile, getKindSpendingIds }),
        STATISTIC_SPENDING: services.getStatisticSpending({ userProfile }),
        BUDGET_SPENDING: services.getBudgetSpending({
            userProfile,
            budgetId: budgetSpending?._id,
            budgetKind: getKindSpendingId('COST') as string,
            startDate: service.getDateOfMonth('start'),
            endDate: service.getDateOfMonth('end'),
        }),

        // LOAN
        GET_RECENT_LOAN: services.getRecentLoan({ userProfile, kindGetLoan: getLoan, kindLoan: loan }),
        GET_PAY_DUE_LOAN: services.getPayDueLoan({ userProfile, kindGetLoan: getLoan, kindLoan: loan }),
        GET_STATISTIC_LOAN: services.getStatisticLoan({ userProfile }),
    }
}

export default useServiceQuery
