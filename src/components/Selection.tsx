import React, { Fragment, useMemo, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { SelectionProps } from '~/@types/components'
import { people } from '~/constant/components'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import _ from 'lodash'
import { Controller } from 'react-hook-form'

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
}) => {
    const value = useMemo(() => form.getValues(name), [JSON.stringify(form.getValues(name))])
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [selected, setSelected] = useState(value)

    const handleChange = (value: any) => {
        setSelected(value)
    }

    return (
        <Controller
            name={name}
            control={form.control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={clsx(className)}>
                    <Listbox value={selected} onChange={handleChange}>
                        {({ open }) => (
                            <>
                                {label && (
                                    <Listbox.Label className='inline-block text-sm font-medium text-gray-700'>
                                        {label}
                                    </Listbox.Label>
                                )}
                                <div className='mt-1 relative'>
                                    <Listbox.Button className='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                                        <span
                                            className={clsx('block truncate', {
                                                'text-gray-400': _.isNull(field.value),
                                            })}
                                        >
                                            {field.value?.[valueKey] ?? placeholder}
                                        </span>
                                        <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                            <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave='transition ease-in duration-50'
                                        leaveFrom='opacity-100'
                                        leaveTo='opacity-0'
                                    >
                                        <Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                            {data.map((item) => (
                                                <Listbox.Option
                                                    key={item[idKey]}
                                                    className={({ active }) =>
                                                        clsx(
                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
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
                                                                        active ? 'text-white' : 'text-indigo-600',
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
                                    </Transition>
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
