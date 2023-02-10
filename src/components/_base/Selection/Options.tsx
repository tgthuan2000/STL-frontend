import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import { SelectionOptionsProps } from '~/@types/components'

const Options: React.FC<SelectionOptionsProps> = ({ data, idKey, valueKey }) => {
    return (
        <Listbox.Options className='absolute z-10 mt-1 w-full bg-white dark:bg-slate-600 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
            {data.map((item) => (
                <Listbox.Option
                    key={item[idKey]}
                    className={({ active }) =>
                        clsx(
                            active ? 'text-white bg-indigo-600 dark:bg-cyan-500' : 'text-gray-900 dark:text-slate-200',
                            'cursor-default select-none relative py-2 pl-8 pr-4'
                        )
                    }
                    value={item}
                >
                    {({ selected, active }) => (
                        <>
                            <span className={clsx(selected ? 'font-medium' : 'font-light', 'block truncate')}>
                                {item[valueKey]}
                            </span>

                            {selected ? (
                                <span
                                    className={clsx(
                                        active ? 'text-white' : 'text-indigo-600 dark:text-cyan-500',
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
    )
}

export default Options
