import { Combobox } from '@headlessui/react'
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { AutocompleteButtonProps } from '~/@types/components'

const Button: React.FC<AutocompleteButtonProps> = ({
    disabledClear,
    disabled,
    loading,
    selectedItem,
    setSelectedItem,
    field,
    onChange,
}) => {
    return (
        <>
            {!disabledClear && !disabled && !loading && (
                <Combobox.Button className='absolute inset-y-0 right-6 flex items-center rounded-r-md px-2 focus:outline-none'>
                    {selectedItem && (
                        <XMarkIcon
                            onClick={(e) => {
                                e.stopPropagation()
                                setSelectedItem(null)
                                field.onChange(null)
                                onChange?.(null)
                            }}
                            className='h-5 w-5 text-gray-400 transition-colors hover:text-gray-500'
                            aria-hidden='true'
                        />
                    )}
                </Combobox.Button>
            )}

            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </Combobox.Button>
        </>
    )
}

export default Button
