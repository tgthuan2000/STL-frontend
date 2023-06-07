import React from 'react'

interface Props {
    children: React.ReactNode
    onClick?: () => void
}

const IconButton: React.FC<Props> = (props) => {
    const { children, onClick } = props

    return (
        <span
            className='h-8 w-8 cursor-pointer rounded-lg bg-slate-200 p-2 text-gray-600 transition-opacity hover:opacity-50 dark:bg-slate-700 dark:text-slate-400 lg:h-9 lg:w-9'
            onClick={onClick}
        >
            {children}
        </span>
    )
}

export default IconButton
