import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import React from 'react'
import { BackButtonProps } from '~/@types/components'

const BackButton: React.FC<BackButtonProps> = ({ onClick, disabled }) => {
    return (
        <button
            className='p-1 bg-slate-200 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-200 cursor-pointer transition-colors group rounded-full inline-block disabled:opacity-50'
            onClick={onClick}
            disabled={disabled}
        >
            <ArrowSmLeftIcon className='h-6 text-gray-700 group-hover:text-white dark:text-slate-200 dark:group-hover:text-slate-700 transition-colors' />
        </button>
    )
}

export default BackButton
