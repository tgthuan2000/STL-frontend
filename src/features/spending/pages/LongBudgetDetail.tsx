import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const LongBudgetDetail = () => {
    const { t } = useTranslation()

    return (
        <Transaction hasBack title={t(LANGUAGE.LONG_BUDGET)}>
            <div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.COMING_SOON)}</div>
        </Transaction>
    )
}

export default LongBudgetDetail
