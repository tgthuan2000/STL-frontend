import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StatusLoanProps } from '~/@types/loan'
import LANGUAGE from '~/i18n/language/key'

const StatusLoan: React.FC<StatusLoanProps> = ({ form, name }) => {
    const { t } = useTranslation()
    const watchName = form.watch(name)
    return (
        <p className='text-gray-900 dark:text-slate-200'>
            {t(LANGUAGE.STATUS)}:{' '}
            <span className={clsx('font-medium', watchName ? 'text-indigo-500' : 'text-orange-500')}>
                {watchName ? t(LANGUAGE.ADD_ORIGIN_AMOUNT) : t(LANGUAGE.TEMP_LOAN)}
            </span>
        </p>
    )
}

export default StatusLoan
