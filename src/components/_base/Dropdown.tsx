import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Menu } from '@headlessui/react'
import clsx from 'clsx'
import { find, flatMapDeep, get, isNil } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { DropdownProps } from '~/@types/components'

const Dropdown: React.FC<DropdownProps> = ({
    label,
    data = [],
    idKey = '_id',
    valueKey = 'name',
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

            return find(flatMapDeep(data), [idKey, get(selected, idKey)])
        })
    }, [data])

    const handleChange = (value: any, onChange: (value: any) => void) => {
        const __change = (v: any) => {
            setSelected(v)
            onChange(v)
        }
        if (value.onClick) {
            value.onClick(value, __change)
            return
        }
        __change(value)
    }

    return (
        <Controller
            control={form.control}
            name={name}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <Menu as='div' className='mr-3 relative inline-block z-[2]'>
                        <Menu.Button
                            disabled={disabled}
                            className='inline-flex w-full justify-center rounded-md bg-black dark:bg-slate-500 disabled:bg-slate-500 dark:text-pink-500 bg-opacity-20 lg:px-4 px-2 lg:py-2 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
                        >
                            {label}
                        </Menu.Button>

                        <Menu.Items className='absolute right-0 mt-2 select-none whitespace-nowrap origin-top-right divide-y divide-gray-100 dark:divide-slate-600 rounded-md bg-white dark:bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            {data.map((options, index) => {
                                return (
                                    <div className='px-1 py-1 space-y-0.5' key={index}>
                                        {options?.map((option) => {
                                            const Icon = option.icon
                                            return (
                                                <Menu.Item key={option[idKey]}>
                                                    <button
                                                        className={clsx(
                                                            option[idKey] === get(selected, idKey, null)
                                                                ? 'text-indigo-500 font-normal'
                                                                : 'text-gray-900 dark:text-slate-200',
                                                            'group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-indigo-500 hover:text-white'
                                                        )}
                                                        onClick={() => handleChange(option, field.onChange)}
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
                    </Menu>
                    <div ref={parent}>
                        {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                    </div>
                </div>
            )}
        />
    )
}

export default Dropdown
