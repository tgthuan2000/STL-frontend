import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { GET_BUDGET_METHOD_DETAIL_SPENDING_BY_MONTH } from '~/schema/query/spending'
import BudgetDetailContent from '../components/BudgetDetailContent'
import useBudgetDetail from '../hook/useBudgetDetail'

const BudgetDetailMethod = () => {
    const { t } = useTranslation()
    const {
        data: { budget },
        refetch,
    } = useBudgetDetail(GET_BUDGET_METHOD_DETAIL_SPENDING_BY_MONTH)

    return (
        <Transaction hasBack title={t(LANGUAGE.BUDGET_BY_METHOD)}>
            <BudgetDetailContent type='methodSpending' data={budget.data} loading={budget.loading} reload={refetch} />
        </Transaction>
    )
}

export default BudgetDetailMethod
