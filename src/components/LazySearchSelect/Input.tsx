import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'
import { LazySearchSelectInputProp } from '~/@types/components'

const Input: React.FC<LazySearchSelectInputProp> = ({ field, autoFocus, loading, disabled, handleSearch }) => {
    return (
        <Combobox.Input
            className={clsx(
                'w-full h-10 rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm sm:text-sm focus:outline-none',
                loading || disabled
                    ? 'bg-gray-50 text-gray-500 select-none cursor-not-allowed dark:bg-slate-600 dark:border-slate-700 dark:text-slate-300'
                    : 'bg-white text-gray-900 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-200'
            )}
            onChange={(e) => handleSearch?.(e.target.value, field.onChange)}
            spellCheck={false}
            autoComplete='off'
            autoFocus={autoFocus}
        />
    )
}

export default Input
