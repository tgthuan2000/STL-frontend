import clsx from 'clsx'
import React from 'react'
import { LabelProps } from '~/@types/components'

const Label: React.FC<LabelProps> = ({ id, label, className }) => {
    return (
        <>
            {label && (
                <label
                    htmlFor={id}
                    className={clsx('inline-block font-medium text-gray-900 dark:text-slate-100', className)}
                >
                    {label}
                </label>
            )}
        </>
    )
}

export default Label
