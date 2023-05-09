import clsx from 'clsx'
import React from 'react'

interface Props {
    className?: string
    children: React.ReactNode
    disabledPadding?: boolean
}

const Paper: React.FC<Props> = (props) => {
    const { className, children, disabledPadding } = props

    return (
        <div
            className={clsx(
                '-m-4 bg-white dark:bg-slate-800 sm:m-0 sm:rounded-xl sm:shadow-sm',
                { 'p-4 sm:p-4 xl:p-6': !disabledPadding },
                className
            )}
        >
            {children}
        </div>
    )
}

export default Paper
