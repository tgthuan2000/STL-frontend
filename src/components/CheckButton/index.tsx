import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'

interface Props {
    label: string
    subLabel?: string
    value: string
    checked: boolean
    disabled?: boolean
    onChange: () => void
    className?: string
}

const CheckButton: React.FC<Props> = (props) => {
    const { label, subLabel, value, checked, onChange, disabled, className } = props

    return (
        <label
            className={clsx(
                'flex min-h-[40px] w-full select-none items-center justify-between gap-2 rounded-xl py-2 px-2 sm:gap-4 sm:px-4',
                checked
                    ? 'bg-indigo-500 text-white dark:bg-cyan-500'
                    : 'bg-gray-200 text-gray-900 dark:bg-slate-700 dark:text-slate-200',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                { 'hover:opacity-70': !checked && !disabled },
                className
            )}
        >
            <input
                type='radio'
                checked={checked}
                disabled={disabled}
                value={value}
                onChange={onChange}
                className='hidden'
            />
            <div className='flex flex-col'>
                {label && <span className='truncate'>{label}</span>}
                {subLabel && (
                    <span
                        className={clsx(
                            'truncate text-xs',
                            checked ? 'text-white dark:text-gray-200' : 'text-gray-600 dark:text-gray-400'
                        )}
                    >
                        {subLabel}
                    </span>
                )}
            </div>
            {checked && (
                <span className='flex-shrink-0 rounded-full bg-indigo-400 p-1 text-white dark:bg-cyan-600'>
                    <CheckIcon className='h-4 w-4' />
                </span>
            )}
        </label>
    )
}

export default CheckButton
