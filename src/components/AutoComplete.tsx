import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import { AutoCompleteProps } from '~/@types/components'
import { people } from '~/constant/components'

const AutoComplete = forwardRef<HTMLInputElement, AutoCompleteProps>(
    ({ label, data = people, idKey = '_id', valueKey = 'name', className, error, onChange, value, ...props }, ref) => {
        const [query, setQuery] = useState(value?.[valueKey] ?? '')
        const [selectedItem, setSelectedItem] = useState(value)
        const [parent] = useAutoAnimate<HTMLDivElement>()

        const filterData =
            query === ''
                ? data
                : data.filter((item) => {
                      return item[valueKey].toLowerCase().includes(query.toLowerCase())
                  })

        const handleChange = (value: any) => {
            setSelectedItem(value)
            onChange?.(value)
        }

        return (
            <div className={clsx(className)}>
                <Combobox as='div' ref={ref} {...props} value={selectedItem} onChange={handleChange}>
                    <Combobox.Label className='block text-sm font-medium text-gray-700'>{label}</Combobox.Label>
                    <div className='relative mt-1'>
                        <Combobox.Input
                            className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                            displayValue={(item: any) => item?.[valueKey]}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                            <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                        </Combobox.Button>

                        {filterData.length > 0 && (
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
