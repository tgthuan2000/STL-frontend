import { ArrowPathIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { LoadingButtonProps } from '~/@types/components'

const LoadingButton: React.FC<LoadingButtonProps> = ({ onReload, disabled }) => {
    return (
        <button
            type='button'
            className='cursor-pointer group disabled:cursor-wait disabled:animate-spin'
            onClick={onReload}
            disabled={disabled}
            title='Tải lại'
        >
            <ArrowPathIcon className='h-4 w-4 text-gray-500 dark:text-slate-200 group-hover:text-gray-400 group-disabled:text-gray-300' />
        </button>
    )
}

export default LoadingButton
