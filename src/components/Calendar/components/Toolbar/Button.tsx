import clsx from 'clsx'
import React from 'react'

interface ButtonProps {
    onClick: () => void
    title?: string
    children: React.ReactNode
    isIcon?: boolean
    className?: string
    noHover?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
    const { onClick, noHover, title, children, isIcon, className } = props

    return (
        <button
            className={clsx(
                'bg-white text-gray-900 transition dark:bg-slate-600 dark:text-slate-200',
                { 'hover:bg-gray-700 hover:text-white hover:opacity-70': !noHover },
                { 'whitespace-nowrap px-4 py-2 text-sm font-medium': !isIcon },
                { 'flex items-center justify-center p-2': isIcon },
                className
            )}
            onClick={onClick}
            title={title}
        >
            {children}
        </button>
    )
}

export default Button
