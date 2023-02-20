import { ArrowPathIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { LoadingButtonProps } from '~/@types/components'

const LoadingButton: React.FC<LoadingButtonProps> = ({ onReload, disabled }) => {
    return (
        <button
            type='button'
            className='group cursor-pointer disabled:animate-spin disabled:cursor-wait'
            onClick={onReload}
            disabled={disabled}
            title='Tải lại'
        >
            <ArrowPathIcon className='h-4 w-4 text-gray-500 group-hover:text-gray-400 group-disabled:text-gray-300 dark:text-slate-200' />
        </button>
    )
}

export default LoadingButton
