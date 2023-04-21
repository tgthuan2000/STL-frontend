import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { LazySearchSelectInputProp } from '~/@types/components'

const Input = forwardRef<HTMLInputElement, LazySearchSelectInputProp>(
    ({ field, autoFocus, loading, disabled, placeholder, handleSearch }, ref) => {
        return (
            <Combobox.Input
                ref={ref}
                className={clsx(
                    'h-10 w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm',
                    loading || disabled
                        ? 'cursor-not-allowed select-none bg-gray-50 text-gray-500 dark:border-slate-700 dark:bg-slate-600 dark:text-slate-300'
                        : 'bg-white text-gray-900 dark:border-slate-800 dark:bg-slate-700 dark:text-slate-200'
                )}
                onChange={(e) => handleSearch?.(e.target.value, field.onChange)}
                spellCheck={false}
                autoComplete='off'
                autoFocus={autoFocus}
                placeholder={placeholder as string}
            />
        )
    }
)

export default Input
