import React from 'react'
import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const BudgetDetailMethod = () => {
    const { t } = useTranslation()

    return (
        <Transaction hasBack title={t(LANGUAGE.BUDGET_BY_METHOD)}>
            <div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.COMING_SOON)}</div>
        </Transaction>
    )
}

export default BudgetDetailMethod
