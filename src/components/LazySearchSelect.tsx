import { Combobox } from '@headlessui/react'
import { RefreshIcon, SearchIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { useEffect, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Waypoint } from 'react-waypoint'
import { LazySearchSelectProps } from '~/@types/components'
import { TEMPLATE } from '~/constant/template'

const LazySearchSelect: React.FC<LazySearchSelectProps> = ({
    className,
    onChange,
    disabled,
    label,
    options,
    hasNextPage,
    onGetMore,
    onSearch,
    valueKey = '_id',
    labelKey = 'name',
    loading,
    getOptionLabel,
    autoFocus,
}) => {
    const form = useForm({
        defaultValues: {
            search: '',
        },
    })
    const handleChange = (value: any) => {
        onChange(value)
        form.setValue('search', '')
    }

    const wpLoading = useRef(false)

    const handleGetMoreData = () => {
        if (onGetMore) {
            wpLoading.current = true
            onGetMore()
        }
    }

    useEffect(() => {
        if (!loading && wpLoading.current) {
            wpLoading.current = false
        }
    }, [loading])

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null

        const value = form.watch('search').trim()
        if (value) {
            timeout = setTimeout(() => {
                try {
                    onSearch?.(value)
                } catch (error) {
                    console.log(error)
                }
            }, 1000)
        }
        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [JSON.stringify(form.watch('search'))])

    const handleSearch = (value: string, onChange: (...event: any[]) => void) => {
        onChange(value)
    }

    return (
        <Controller
            control={form.control}
            name='search'
            render={({ field }) => (
                <div className={className}>
                    <Combobox
                        as='div'
                        value={null}
                        onChange={handleChange}
                        onBlur={() => {
                            field.onBlur()
                            setTimeout(() => {
                                form.setValue('search', '')
                            }, 300)
                        }}
                        disabled={disabled}
                    >
                        {label && (
                            <Combobox.Label className='inline-block text-sm font-medium text-gray-700'>
                                {label}
                            </Combobox.Label>
                        )}
                        <div className='mt-1 relative'>
                            <Combobox.Input
                                className={clsx(
                                    'w-full h-10 rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm sm:text-sm focus:outline-none',
                                    loading || disabled
                                        ? 'bg-gray-50 text-gray-500 select-none cursor-not-allowed'
                                        : 'bg-white text-gray-900'
                                )}
                                onChange={(e) => handleSearch(e.target.value, field.onChange)}
                                spellCheck={false}
                                autoComplete='off'
                                autoFocus={autoFocus}
                            />
                            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                {loading ? (
                                    <button
                                        type='button'
                                        className='cursor-pointer group disabled:cursor-wait disabled:animate-spin -scale-100'
                                        disabled={true}
                                    >
                                        <RefreshIcon className='h-5 w-5 text-gray-500 group-hover:text-gray-400 group-disabled:text-gray-300' />
                                    </button>
                                ) : (
                                    <SearchIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
                                )}
                            </span>

                            <Combobox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
                                {loading ? (
                                    <Combobox.Option value={null} disabled>
                                        <p className='p-2 text-center text-xs text-gray-500'>Loading...</p>
                                    </Combobox.Option>
                                ) : (
                                    <>
                                        {isEmpty(options) ? (
                                            <p className='p-2 text-center text-xs text-gray-500'>
                                                {TEMPLATE.EMPTY_DATA}
                                            </p>
                                        ) : (
                                            <>
                                                {options?.map((item, index) => (
                                                    <Combobox.Option
                                                        key={item[valueKey]}
                                                        className={({ active }) =>
                                                            clsx(
                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                            )
                                                        }
                                                        value={item}
                                                    >
                                                        {({ active }) => (
                                                            <>
                                                                {getOptionLabel?.(item, active) ?? (
                                                                    <p>{item[labelKey]}</p>
                                                                )}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </>
                                        )}
                                        {hasNextPage && <Waypoint onEnter={handleGetMoreData} bottomOffset='-20%' />}
                                    </>
                                )}
                            </Combobox.Options>
                        </div>
                    </Combobox>
                </div>
            )}
        />
    )
}

export default LazySearchSelect
