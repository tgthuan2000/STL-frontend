import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import { AutocompleteOptionProps } from '~/@types/components'
import { urlFor } from '~/sanityConfig'
import Image from '../../Image'

const Option: React.FC<AutocompleteOptionProps> = ({ filterData, idKey, valueKey, showImage, query, addMore }) => {
    return (
        <>
            {filterData.length > 0 ? (
                <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600 sm:text-sm'>
                    {filterData.map((item) => {
                        return (
                            <Combobox.Option
                                key={item[idKey]}
                                value={item}
                                className={({ active }) =>
                                    clsx(
                                        'relative cursor-default select-none py-2 pl-8 pr-4',
                                        active
                                            ? 'bg-indigo-600 text-white dark:bg-cyan-500'
                                            : 'text-gray-900 dark:text-slate-200'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <div className='flex items-center gap-2'>
                                            {showImage && (
                                                <Image src={urlFor(item.image)} alt={item.name} size='small' />
                                            )}
                                            <span className={clsx('block truncate', selected && 'font-semibold')}>
                                                {item[valueKey]}
                                            </span>
                                        </div>

                                        {selected && (
                                            <span
                                                className={clsx(
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                    active ? 'text-white' : 'text-indigo-600 dark:text-cyan-500'
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
                    <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600 sm:text-sm'>
                        <Combobox.Option
                            value={query.trim()}
                            className={({ active }) =>
                                clsx('relative cursor-default select-none bg-indigo-600 py-2 pl-8 pr-4 text-white')
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
        </>
    )
}

export default Option
