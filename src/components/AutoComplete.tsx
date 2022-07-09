import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import _ from 'lodash'
import { forwardRef, startTransition, useState } from 'react'
import { AutoCompleteProps } from '~/@types/components'
import { people } from '~/constant/components'

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
    (
        {
            label,
            data = people,
            idKey = '_id',
            valueKey = 'name',
            className,
            error,
            onChange,
            onBlur,
            addMore,
            value,
            ...props
        },
        ref
    ) => {
        const [query, setQuery] = useState(value?.[valueKey] ?? '')
        const [selectedItem, setSelectedItem] = useState(value)
        const [parent] = useAutoAnimate<HTMLDivElement>()
        const [loading, setLoading] = useState(false)

        const filterData =
            query === ''
                ? data
                : data.filter((item) => {
                      return item[valueKey].toLowerCase().includes(query.toLowerCase())
                  })

        const handleChange = async (value: any) => {
            if (typeof value === 'string') {
                if (addMore) {
                    try {
                        setLoading(true)
                        // delete spaces between and last first
                        value = value.replace(/\s+/g, ' ').trim()
                        // capitalize first letter
                        value = value.charAt(0).toUpperCase() + value.slice(1)
                        const data = await addMore(value)
                        if (data) {
                            onChange?.(data)
                            setSelectedItem(data)
                        } else {
                            console.log('Error add more!')
                        }
                    } catch (error) {
                        console.log(error)
                    } finally {
                        setLoading(false)
                    }
                } else {
                    alert('Could not find "addMore" function in Autocomplete')
                }
            } else {
                setSelectedItem(value)
                onChange?.(value)
            }
        }

        return (
            <div className={clsx(className)}>
                <Combobox
                    as='div'
                    ref={ref}
                    onBlur={() => {
                        onBlur()
                        setTimeout(() => {
                            setQuery('')
                        }, 300)
                    }}
                    value={selectedItem}
                    onChange={handleChange}
                    disabled={loading}
                    {...props}
                >
                    <Combobox.Label className='inline-block text-sm font-medium text-gray-700'>{label}</Combobox.Label>
                    <div className='relative mt-1'>
                        <Combobox.Input
                            className={clsx(
                                'w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm sm:text-sm focus:outline-none',
                                loading ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-900'
                            )}
                            displayValue={(item: any) => (loading ? 'Đang thực hiện tạo mới...' : item?.[valueKey])}
                            onChange={(event) => setQuery(event.target.value)}
                            spellCheck={false}
                            autoComplete='off'
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                            <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </Combobox.Button>

                        {filterData.length > 0 ? (
                            <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                {filterData.map((item) => (
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
                                                <span className={clsx('block truncate', selected && 'font-semibold')}>
                                                    {item[valueKey]}
                                                </span>

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
                                ))}
                            </Combobox.Options>
                        ) : (
                            query.trim() !== '' && (
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
                    {error && <div className='mt-1 text-radical-red-700 text-sm'>{error.message}</div>}
                </div>
            </div>
        )
    }
)

AutoComplete.displayName = 'AutoComplete'

export default AutoComplete
