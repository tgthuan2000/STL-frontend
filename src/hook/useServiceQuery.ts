import { useConfig } from '~/context'
import useAuth from '~/store/auth'
import * as services from '~/services/query'

const useServiceQuery = () => {
    const { userProfile } = useAuth()
    const { kindSpending, getKindSpendingId } = useConfig()
    return {
        COST_CATEGORY_SPENDING: services.getCategorySpending({
            userProfile,
            kindSpending: getKindSpendingId('COST') as string,
        }),
        RECEIVE_CATEGORY_SPENDING: services.getCategorySpending({
            userProfile,
            kindSpending: getKindSpendingId('RECEIVE') as string,
        }),
        TRANSFER_FROM_CATEGORY_SPENDING: services.getCategorySpending({
            userProfile,
            kindSpending: getKindSpendingId('TRANSFER_FROM') as string,
        }),
        TRANSFER_TO_CATEGORY_SPENDING: services.getCategorySpending({
            userProfile,
            kindSpending: getKindSpendingId('TRANSFER_TO') as string,
        }),
        ALL_RECENT_SPENDING: services.getAllRecentSpending({ userProfile }),
        METHOD_SPENDING: services.getMethodSpending({ userProfile }),
        METHOD_KIND_SPENDING: services.getMethodKindSpending({ userProfile, kindSpending }),
        RECENT_SPENDING: services.getRecentSpending({ userProfile }),
        STATISTIC_SPENDING: services.getStatisticSpending({ userProfile }),
    }
}

export default useServiceQuery
