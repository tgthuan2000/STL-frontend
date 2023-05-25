import clsx from 'clsx'
import { DefaultTFuncReturn } from 'i18next'
import React from 'react'

export interface Props {
    id?: string
    label?: DefaultTFuncReturn | React.ReactNode
    className?: string
    as?: any
}

const Label: React.FC<Props> = (props) => {
    const { id, label, className, as } = props
    const Component = as ?? 'label'

    return (
        <>
            {label && (
                <Component
                    htmlFor={id}
                    className={clsx('inline-block font-medium text-gray-900 dark:text-slate-200', className)}
                >
                    {label}
                </Component>
            )}
        </>
    )
}

export default Label
