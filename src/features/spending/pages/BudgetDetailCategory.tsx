import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import BudgetDetailCategoryContent from '../components/BudgetDetailCategoryContent'
import useBudgetDetailCategory from '../hook/useBudgetDetailCategory'

const BudgetDetailCategory = () => {
    const { t } = useTranslation()
    const {
        data: { budget },
        refetch,
    } = useBudgetDetailCategory()

    return (
        <Transaction hasBack title={t(LANGUAGE.BUDGET_BY_CATEGORY)}>
            <BudgetDetailCategoryContent data={budget.data} loading={budget.loading} reload={refetch} />
        </Transaction>
    )
}

export default BudgetDetailCategory
