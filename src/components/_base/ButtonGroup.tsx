import clsx from 'clsx'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

export interface Props {
    type?: 'button' | 'submit'
    form: UseFormReturn<any, object>
    name: string
    data: any[] | undefined
    getItemKey: (item: any) => string
    getItemLabel: (item: any) => string
}

const ButtonGroup: React.FC<Props> = (props) => {
    const { type = 'button', form, name, data, getItemKey, getItemLabel } = props

    return (
        <Controller
            control={form.control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div className='flex overflow-hidden rounded-full bg-gray-200 p-1 dark:bg-slate-700'>
                    {Array.isArray(data) &&
                        data?.map((item) => {
                            const key = getItemKey(item)
                            const label = getItemLabel(item)
                            const isActive = getItemKey(value) === key

                            return (
                                <button
                                    type={type}
                                    key={key}
                                    className={clsx(
                                        'rounded-full py-1.5 px-3 text-xs sm:min-w-[100px] sm:py-2 sm:px-4 sm:text-sm',
                                        isActive
                                            ? 'bg-indigo-500 text-white dark:bg-cyan-500'
                                            : 'text-gray-700 dark:text-slate-400'
                                    )}
                                    onClick={() => onChange(item)}
                                >
                                    {label}
                                </button>
                            )
                        })}
                </div>
            )}
        />
    )
}

export default ButtonGroup
