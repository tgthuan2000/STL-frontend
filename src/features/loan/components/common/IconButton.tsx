import React from 'react'

interface IconButtonProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLSpanElement>
}

const IconButton: React.FC<IconButtonProps> = ({ children, onClick }) => {
    return (
        <span
            className='h-8 lg:h-9 w-8 lg:w-9 hover:opacity-50 transition-opacity text-gray-600 cursor-pointer bg-slate-200 p-1.5 rounded-lg'
            onClick={onClick}
        >
            {children}
        </span>
    )
}

export default IconButton
