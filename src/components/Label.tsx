import React from 'react'
import { LabelProps } from '~/@types/components'

const Label: React.FC<LabelProps> = ({ id, label }) => {
    return (
        <>
            {label && (
                <label htmlFor={id} className='inline-block font-medium text-gray-900 dark:text-slate-100'>
                    {label}
                </label>
            )}
        </>
    )
}

export default Label
