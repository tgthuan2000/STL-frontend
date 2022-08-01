import { useConfig } from '~/context'
import useAuth from '~/store/auth'
import * as services from '~/services/query'
import { IKindSpending } from '~/@types/context'
import { find } from 'lodash'

const useServiceQuery = () => {
    const { userProfile } = useAuth()
    const { kindSpending, getKindSpendingId } = useConfig()
    return {
        COST_CATEGORY_SPENDING: services.getCategorySpending({
            userProfile,
            kindSpending: find(kindSpending, ['_id', getKindSpendingId('COST')]) as IKindSpending,
        }),
        RECEIVE_CATEGORY_SPENDING: services.getCategorySpending({
            userProfile,
            kindSpending: find(kindSpending, ['_id', getKindSpendingId('RECEIVE')]) as IKindSpending,
        }),
        TRANSFER_FROM_CATEGORY_SPENDING: services.getCategorySpending({
            userProfile,
            kindSpending: find(kindSpending, ['_id', getKindSpendingId('TRANSFER_FROM')]) as IKindSpending,
        }),
        TRANSFER_TO_CATEGORY_SPENDING: services.getCategorySpending({
            userProfile,
            kindSpending: find(kindSpending, ['_id', getKindSpendingId('TRANSFER_TO')]) as IKindSpending,
        }),
        ALL_RECENT_SPENDING: services.getAllRecentSpending({ userProfile }),
        METHOD_SPENDING: services.getMethodSpending({ userProfile }),
        METHOD_KIND_SPENDING: services.getMethodKindSpending({ userProfile, kindSpending }),
        RECENT_SPENDING: services.getRecentSpending({ userProfile }),
        STATISTIC_SPENDING: services.getStatisticSpending({ userProfile }),
    }
}

export default useServiceQuery
