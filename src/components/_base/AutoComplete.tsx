import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, RefreshIcon, SelectorIcon, XIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { find, get, isNil } from 'lodash'
import { forwardRef, useEffect, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { AutoCompleteProps } from '~/@types/components'
import numeral from 'numeral'
import { urlFor } from '~/sanityConfig'
import UserSvg from '../_constant/UserSvg'

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
    (
        {
            label,
            data = [],
            idKey = '_id',
            valueKey = 'name',
            className,
            name,
            form,
            rules,
            onReload,
            addMore,
            loading,
            disabled,
            onChange,
            showImage,
            disabledClear,
            surplusName = 'Số dư',
        },
        ref
    ) => {
        const value = useMemo(() => {
            return form.getValues(name)
        }, [JSON.stringify(form.getValues(name))])

        const [query, setQuery] = useState(value?.[valueKey] ?? '')
        const [selectedItem, setSelectedItem] = useState(value)
        const [parent] = useAutoAnimate<HTMLDivElement>()
        const [closeRef] = useAutoAnimate<HTMLButtonElement>()
        const [loadingAddMore, setLoadingAddMore] = useState(false)
        const [surplus, setSurplus] = useState(value?.surplus || null)

        useEffect(() => {
            setSelectedItem((prev: any) => {
                if (isNil(prev)) {
                    return
                }
                return find(data, [idKey, get(selectedItem, idKey)])
            })
        }, [data])

        useEffect(() => {
            if (!isNil(selectedItem?.surplus)) {
                setSurplus(selectedItem.surplus)
            } else if (!isNil(surplus)) setSurplus(null)
        }, [selectedItem])

        const filterData =
            query === ''
                ? data
                : data.filter((item) => {
                      return item[valueKey].toLowerCase().includes(query.toLowerCase())
                  })

        const handleChange = async (value: any, fieldChange: (...event: any[]) => void) => {
            if (typeof value === 'string') {
                if (addMore) {
                    try {
                        setLoadingAddMore(true)
                        // delete spaces between and last first
                        value = value.replace(/\s+/g, ' ').trim()
                        // capitalize first letter
                        value = value.charAt(0).toUpperCase() + value.slice(1)
                        const data = await addMore(value)
                        if (data) {
                            fieldChange(data)
                            onChange?.(data)
                            setSelectedItem(data)
                        } else {
                            console.log('Error add more!')
                        }
                    } catch (error) {
                        console.log(error)
                    } finally {
                        setLoadingAddMore(false)
                    }
                } else {
                    alert('Could not find "addMore" function in Autocomplete')
                }
            } else {
                setSelectedItem(value)
                onChange?.(value)
                fieldChange(value)
            }
        }

        return (
            <Controller
                name={name}
                control={form.control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <div className={clsx(className)}>
                        <Combobox
                            as='div'
                            ref={ref}
                            onBlur={() => {
                                field.onBlur()
                                setTimeout(() => {
                                    setQuery('')
                                }, 300)
                            }}
                            value={selectedItem}
                            onChange={(value) => handleChange(value, field.onChange)}
                            disabled={disabled || loading}
                        >
                            <div className='flex justify-between items-center'>
                                <Combobox.Label className='inline-block text-sm font-medium text-gray-700'>
                                    {label}
                                </Combobox.Label>
                                {onReload && (
                                    <button
                                        type='button'
                                        className='cursor-pointer group disabled:cursor-wait disabled:animate-spin -scale-100'
                                        onClick={onReload}
                                        disabled={loading}
                                        title='Tải lại'
                                    >
                                        <RefreshIcon className='h-4 w-4 text-gray-500 group-hover:text-gray-400 group-disabled:text-gray-300' />
                                    </button>
                                )}
                            </div>
                            <div className='relative mt-1'>
                                <Combobox.Input
                                    className={clsx(
                                        'w-full h-10 rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm sm:text-sm focus:outline-none',
                                        loading || disabled
                                            ? 'bg-gray-50 text-gray-500 select-none'
                                            : 'bg-white text-gray-900'
                                    )}
                                    displayValue={(item: any) =>
                                        loadingAddMore ? 'Đang thực hiện tạo mới...' : item?.[valueKey]
                                    }
                                    onChange={(event) => setQuery(event.target.value)}
                                    spellCheck={false}
                                    autoComplete='off'
                                />

                                {!disabledClear && !disabled && !loading && (
                                    <Combobox.Button
                                        ref={closeRef}
                                        className='absolute inset-y-0 right-6 flex items-center rounded-r-md px-2 focus:outline-none'
                                    >
                                        {selectedItem && (
                                            <XIcon
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSelectedItem(null)
                                                    field.onChange(null)
                                                    onChange?.(null)
                                                }}
                                                className={
                                                    'h-5 w-5 text-gray-400 transition-colors hover:text-gray-500'
                                                }
                                                aria-hidden='true'
                                            />
                                        )}
                                    </Combobox.Button>
                                )}

                                <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                                    <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                                </Combobox.Button>

                                {filterData.length > 0 ? (
                                    <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                        {filterData.map((item) => {
                                            return (
                                                <Combobox.Option
                                                    key={item[idKey]}
                                                    value={item}
                                                    className={({ active }) =>
                                                        clsx(
                                                            'relative cursor-default select-none py-2 pl-8 pr-4',
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                        )
                                                    }
                                                >
                                                    {({ active, selected }) => (
                                                        <>
                                                            <div className='flex items-center gap-2'>
                                                                {showImage &&
                                                                    (item.image ? (
                                                                        <img
                                                                            src={urlFor(item.image)}
                                                                            alt={item.name}
                                                                            className='h-7 w-7 rounded-full'
                                                                        />
                                                                    ) : (
                                                                        <span className='inline-block h-7 w-7 rounded-full overflow-hidden bg-gray-100'>
                                                                            <UserSvg />
                                                                        </span>
                                                                    ))}
                                                                <span
                                                                    className={clsx(
                                                                        'block truncate',
                                                                        selected && 'font-semibold'
                                                                    )}
                                                                >
                                                                    {item[valueKey]}
                                                                </span>
                                                            </div>

                                                            {selected && (
                                                                <span
                                                                    className={clsx(
                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                                        active ? 'text-white' : 'text-indigo-600'
                                                                    )}
                                                                >
                                                                    <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </Combobox.Option>
                                            )
                                        })}
                                    </Combobox.Options>
                                ) : (
                                    query.trim() !== '' &&
                                    addMore && (
                                        <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                            <Combobox.Option
                                                value={query.trim()}
                                                className={({ active }) =>
                                                    clsx(
                                                        'relative bg-indigo-600 text-white cursor-default select-none py-2 pl-8 pr-4'
                                                    )
                                                }
                                            >
                                                <span className='block truncate'>
                                                    Tạo mới{' '}
                                                    <span className='font-medium'>
                                                        "
                                                        {(() => {
                                                            let temp = query.replace(/\s+/g, ' ').trim()
                                                            temp = temp.charAt(0).toUpperCase() + temp.slice(1)
                                                            return temp
                                                        })()}
                                                        "
                                                    </span>
                                                </span>
                                            </Combobox.Option>
                                        </Combobox.Options>
                                    )
                                )}
                            </div>
                        </Combobox>
                        <div ref={parent}>
                            {!isNil(surplus) && (
                                <div className='mt-1 ml-3'>
                                    {surplusName}:{' '}
                                    <strong
                                        className={clsx(
                                            { 'text-green-400': surplus > 0 },
                                            { 'text-radical-red-400': surplus < 0 },
                                            { 'text-slate-400': surplus === 0 }
                                        )}
                                    >
                                        {numeral(surplus).format()}
                                    </strong>
                                </div>
                            )}
                            {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                        </div>
                    </div>
                )}
            />
        )
    }
)

AutoComplete.displayName = 'AutoComplete'

export default AutoComplete
