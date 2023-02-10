import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AutocompleteInputProps } from '~/@types/components'
import LANGUAGE from '~/i18n/language/key'

const Input: React.FC<AutocompleteInputProps> = ({ loading, disabled, onChange, loadingAddMore, valueKey }) => {
    const { t } = useTranslation()
    return (
        <Combobox.Input
            className={clsx(
                'w-full h-10 rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm sm:text-sm focus:outline-none',
                loading || disabled
                    ? 'bg-gray-50 text-gray-500 select-none dark:bg-slate-600 dark:border-slate-700 dark:text-slate-300'
                    : 'bg-white text-gray-900 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-200'
            )}
            displayValue={(item: any) => (loadingAddMore ? t(LANGUAGE.CREATING) : item?.[valueKey])}
            onChange={(event) => onChange?.(event.target.value)}
            spellCheck={false}
            autoComplete='off'
        />
    )
}

export default Input
