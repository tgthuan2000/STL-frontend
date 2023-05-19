import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const BudgetDetailCategory = () => {
    const { t } = useTranslation()
    const { id } = useParams()

    return (
        <Transaction hasBack title={t(LANGUAGE.BUDGET_BY_CATEGORY)}>
            <div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.COMING_SOON)}</div>
        </Transaction>
    )
}

export default BudgetDetailCategory
