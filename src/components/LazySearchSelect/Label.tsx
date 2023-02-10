import { Combobox } from '@headlessui/react'
import React from 'react'
import { LazySearchSelectLabelProps } from '~/@types/components'

const Label: React.FC<LazySearchSelectLabelProps> = ({ label }) => {
    return (
        <>
            {label && (
                <Combobox.Label className='inline-block text-sm font-medium text-gray-700 dark:text-slate-100'>
                    {label}
                </Combobox.Label>
            )}
        </>
    )
}

export default Label
