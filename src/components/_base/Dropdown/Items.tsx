import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { get } from 'lodash'
import React from 'react'
import { DropdownItemsProps } from '~/@types/components'

const Items: React.FC<DropdownItemsProps> = ({ data, idKey, valueKey, selected, handleChange, field }) => {
    return (
        <Menu.Items className='absolute right-0 mt-2 origin-top-right select-none divide-y divide-gray-100 whitespace-nowrap rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-slate-600 dark:bg-slate-700'>
            {data.map((options, index) => {
                return (
                    <div className='space-y-0.5 px-1 py-1' key={index}>
                        {options?.map((option) => {
                            const Icon = option.icon
                            return (
                                <Menu.Item key={option[idKey]}>
                                    <button
                                        className={clsx(
                                            option[idKey] === get(selected, idKey, null)
                                                ? 'font-normal text-indigo-500 dark:text-sky-500'
                                                : 'text-gray-900 dark:text-slate-200',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white'
                                        )}
                                        onClick={() => handleChange?.(option, field.onChange)}
                                    >
                                        {Icon && <Icon className='mr-2 h-5 w-5' aria-hidden='true' />}
                                        {option[valueKey]}
                                    </button>
                                </Menu.Item>
                            )
                        })}
                    </div>
                )
            })}
        </Menu.Items>
    )
}

export default Items
