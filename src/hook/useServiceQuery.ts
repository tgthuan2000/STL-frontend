import { useConfig } from '~/context'
import useAuth from '~/store/auth'
import * as services from '~/services/query'
import { useMemo } from 'react'

const useServiceQuery = () => {
    let { userProfile } = useAuth()
    const { getKindSpendingId } = useConfig()

    const cost = useMemo(() => getKindSpendingId('COST') as string, [])
    const receive = useMemo(() => getKindSpendingId('RECEIVE') as string, [])
    const transferFrom = useMemo(() => getKindSpendingId('TRANSFER_FROM') as string, [])
    const transferTo = useMemo(() => getKindSpendingId('TRANSFER_TO') as string, [])
    const loan = useMemo(() => getKindSpendingId('LOAN') as string, [])
    const getLoan = useMemo(() => getKindSpendingId('GET_LOAN') as string, [])

    return {
        // SPENDING
        COST_CATEGORY_SPENDING: services.getCategorySpending({ userProfile, kindSpending: cost }),
        RECEIVE_CATEGORY_SPENDING: services.getCategorySpending({ userProfile, kindSpending: receive }),
        TRANSFER_FROM_CATEGORY_SPENDING: services.getCategorySpending({ userProfile, kindSpending: transferFrom }),
        TRANSFER_TO_CATEGORY_SPENDING: services.getCategorySpending({ userProfile, kindSpending: transferTo }),
        ALL_RECENT_SPENDING: services.getAllRecentSpending({ userProfile }),
        METHOD_SPENDING: services.getMethodSpending({ userProfile }),
        METHOD_SPENDING_DESC_SURPLUS: services.getMethodSpendingDescSurplus({ userProfile }),
        RECENT_SPENDING: services.getRecentSpending({ userProfile }),
        STATISTIC_SPENDING: services.getStatisticSpending({ userProfile }),

        // LOAN
        GET_RECENT_LOAN: services.getRecentLoan({ userProfile, kindGetLoan: getLoan, kindLoan: loan }),
        GET_PAY_DUE_LOAN: services.getPayDueLoan({ userProfile, kindGetLoan: getLoan, kindLoan: loan }),
        GET_STATISTIC_LOAN: services.getStatisticLoan({ userProfile }),
    }
}

export default useServiceQuery
