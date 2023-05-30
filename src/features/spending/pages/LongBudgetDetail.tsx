import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import useLongBudgetDetail from '../hook/useLongBudgetDetail'
import LongBudgetDetailContent from '../components/LongBudgetDetailContent'

const LongBudgetDetail = () => {
    const { t } = useTranslation()
    const {
        data: { longBudget },
        refetch,
    } = useLongBudgetDetail()

    return (
        <Transaction hasBack title={t(LANGUAGE.LONG_BUDGET)}>
            <LongBudgetDetailContent data={longBudget.data} loading={longBudget.loading} reload={refetch} />
        </Transaction>
    )
}

export default LongBudgetDetail
