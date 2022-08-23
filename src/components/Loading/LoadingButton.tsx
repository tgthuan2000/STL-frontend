import React from 'react'
import { RefreshIcon } from '@heroicons/react/outline'
import { LoadingButtonProps } from '~/@types/components'

const LoadingButton: React.FC<LoadingButtonProps> = ({ onReload, disabled }) => {
    return (
        <button
            type='button'
            className='cursor-pointer group disabled:cursor-wait disabled:animate-spin -scale-100'
            onClick={onReload}
            disabled={disabled}
            title='Tải lại'
        >
            <RefreshIcon className='h-4 w-4 text-gray-500 group-hover:text-gray-400 group-disabled:text-gray-300' />
        </button>
    )
}

export default LoadingButton
