import clsx from 'clsx'
import React from 'react'
import { Controller } from 'react-hook-form'
import { ButtonGroupProps } from '~/@types/components'

const ButtonGroup: React.FC<ButtonGroupProps> = ({ form, name, data, idKey = 'id', valueKey = 'name', onChange }) => {
    const handleChange = (item: any, fieldChange: (...event: any[]) => void) => {
        fieldChange(item)
        onChange?.(item)
    }

    return (
        <Controller
            control={form.control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div className='flex divide-x overflow-hidden rounded-md border border-gray-700 bg-gray-400 text-gray-900 dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white'>
                    {data?.map((item) => (
                        <button
                            key={item[idKey]}
                            className={clsx(
                                'py-2 px-4',
                                value[idKey] === item[idKey]
                                    ? 'bg-gray-700 text-white dark:bg-slate-600 dark:text-cyan-500'
                                    : 'bg-transparent opacity-30'
                            )}
                            onClick={() => handleChange(item, onChange)}
                        >
                            {item[valueKey]}
                        </button>
                    ))}
                </div>
            )}
        />
    )
}

export default ButtonGroup
