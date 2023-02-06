import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { find, get, isNil } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { SelectionProps } from '~/@types/components'
import { people } from '~/constant/components'

const Selection: React.FC<SelectionProps> = ({
    label,
    data = people,
    idKey = '_id',
    valueKey = 'name',
    placeholder = 'Placeholder',
    className,
    form,
    rules,
    name,
    disabled,
}) => {
    const value = useMemo(() => form.getValues(name), [JSON.stringify(form.getValues(name))])
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [selected, setSelected] = useState(value)

    useEffect(() => {
        setSelected((prev: any) => {
            if (isNil(prev)) {
                return
            }

            return find(data, [idKey, get(selected, idKey)])
        })
    }, [data])

    const handleChange = (value: any, onChange: (value: any) => void) => {
        setSelected(value)
        onChange(value)
    }

    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <Listbox
                        value={selected}
                        onChange={(value) => handleChange(value, field.onChange)}
                        disabled={disabled}
                    >
                        {({ open }) => (
                            <>
                                {label && (
                                    <Listbox.Label className='inline-block text-sm font-medium text-gray-700 dark:text-slate-100'>
                                        {label}
                                    </Listbox.Label>
                                )}
                                <div className='mt-1 relative'>
                                    <Listbox.Button
                                        className={clsx(
                                            'relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                                            disabled
                                                ? 'bg-gray-50 text-gray-500 select-none dark:bg-slate-600 dark:border-slate-700 dark:text-slate-300'
                                                : 'bg-white text-gray-900 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-200'
                                        )}
                                    >
                                        <span
                                            className={clsx('block truncate', {
                                                'text-gray-400': isNil(field.value),
                                            })}
                                        >
                                            {field.value?.[valueKey] ?? placeholder}
                                        </span>
                                        <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                            <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                        </span>
                                    </Listbox.Button>

                                    <Listbox.Options className='absolute z-10 mt-1 w-full bg-white dark:bg-slate-600 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                        {data.map((item) => (
                                            <Listbox.Option
                                                key={item[idKey]}
                                                className={({ active }) =>
                                                    clsx(
                                                        active
                                                            ? 'text-white bg-indigo-600 dark:bg-cyan-500'
                                                            : 'text-gray-900 dark:text-slate-200',
                                                        'cursor-default select-none relative py-2 pl-8 pr-4'
                                                    )
                                                }
                                                value={item}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span
                                                            className={clsx(
                                                                selected ? 'font-medium' : 'font-light',
                                                                'block truncate'
                                                            )}
                                                        >
                                                            {item[valueKey]}
                                                        </span>

                                                        {selected ? (
                                                            <span
                                                                className={clsx(
                                                                    active
                                                                        ? 'text-white'
                                                                        : 'text-indigo-600 dark:text-cyan-500',
                                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                )}
                                                            >
                                                                <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </>
                        )}
                    </Listbox>
                    <div ref={parent}>
                        {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                    </div>
                </div>
            )}
        />
    )
}

export default Selection
