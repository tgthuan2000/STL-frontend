import clsx from 'clsx'
import React from 'react'

interface WrapProps {
    children: React.ReactNode
    className: string
}

const Wrap: React.FC<WrapProps> = (props) => {
    const { children, className } = props

    return (
        <div
            className={clsx(
                'items-center divide-x overflow-x-auto rounded-lg border dark:divide-slate-800 dark:border-slate-700',
                className
            )}
        >
            {children}
        </div>
    )
}

export default Wrap
