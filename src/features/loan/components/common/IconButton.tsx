import React from 'react'
import { IconButtonProps } from '~/@types/loan'

const IconButton: React.FC<IconButtonProps> = ({ children, onClick }) => {
    return (
        <span
            className='h-8 lg:h-9 w-8 lg:w-9 hover:opacity-50 transition-opacity text-gray-600 dark:text-slate-400 dark:bg-slate-700 cursor-pointer bg-slate-200 p-1.5 rounded-lg'
            onClick={onClick}
        >
            {children}
        </span>
    )
}

export default IconButton
