import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import LongBudgetDetailContent from '../components/LongBudgetDetail/Content'
import useLongBudgetDetail from '../hook/useLongBudgetDetail'

const LongBudgetDetail = () => {
    const { t } = useTranslation()
    const {
        data: { longBudget },
        refetch,
        clearCache,
    } = useLongBudgetDetail()

    return (
        <Transaction hasBack title={t(LANGUAGE.LONG_BUDGET)}>
            <LongBudgetDetailContent
                data={longBudget.data}
                loading={longBudget.loading}
                reload={refetch}
                clearCache={clearCache}
            />
        </Transaction>
    )
}

export default LongBudgetDetail
