import clsx from 'clsx'
import React from 'react'

interface ButtonProps {
    onClick: () => void
    title?: string
    children: React.ReactNode
    isIcon?: boolean
    className?: string
    noHover?: boolean
    disabled?: boolean
    noBg?: boolean
    hoverOpacity?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
    const { onClick, noHover, title, children, isIcon, className, disabled, noBg, hoverOpacity } = props

    return (
        <button
            type='button'
            className={clsx(
                'text-gray-900 transition dark:text-slate-200',
                { 'hover:opacity-50': hoverOpacity },
                { 'bg-white dark:bg-slate-600': !noBg },
                { 'hover:bg-gray-700 hover:text-white hover:opacity-70': !noHover },
                { 'whitespace-nowrap px-4 py-2 text-sm font-medium': !isIcon },
                { 'flex items-center justify-center p-2': isIcon },
                { 'opacity-50': disabled },
                className
            )}
            onClick={onClick}
            title={title}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
