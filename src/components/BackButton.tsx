import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { BackButtonProps } from '~/@types/components'

const BackButton: React.FC<BackButtonProps> = ({ onClick, disabled }) => {
    return (
        <button
            className='group inline-block cursor-pointer rounded-full bg-slate-200 p-1 transition-colors hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-700 dark:hover:bg-slate-200'
            onClick={onClick}
            disabled={disabled}
        >
            <ArrowSmallLeftIcon className='h-6 text-gray-700 transition-colors group-hover:text-white dark:text-slate-200 dark:group-hover:text-slate-700' />
        </button>
    )
}

export default BackButton
