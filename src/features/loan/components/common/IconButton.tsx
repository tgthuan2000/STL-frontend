import React from 'react'
import { IconButtonProps } from '~/@types/loan'

const IconButton: React.FC<IconButtonProps> = ({ children, onClick }) => {
    return (
        <span
            className='h-8 w-8 cursor-pointer rounded-lg bg-slate-200 p-1.5 text-gray-600 transition-opacity hover:opacity-50 dark:bg-slate-700 dark:text-slate-400 lg:h-9 lg:w-9'
            onClick={onClick}
        >
            {children}
        </span>
    )
}

export default IconButton
