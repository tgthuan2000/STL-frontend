import { Listbox } from '@headlessui/react'
import React from 'react'
import { SelectionLabelProps } from '~/@types/components'

const Label: React.FC<SelectionLabelProps> = ({ label }) => {
    return (
        <>
            {label && (
                <Listbox.Label className='inline-block text-sm font-medium text-gray-700 dark:text-slate-100'>
                    {label}
                </Listbox.Label>
            )}
        </>
    )
}

export default Label
