import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { LazySearchSelectIconProps } from '~/@types/components'

const Icon: React.FC<LazySearchSelectIconProps> = ({ loading }) => {
    return (
        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            {loading ? (
                <button
                    type='button'
                    className='group cursor-pointer disabled:animate-spin disabled:cursor-wait'
                    disabled={true}
                >
                    <ArrowPathIcon className='h-5 w-5 text-gray-500 group-hover:text-gray-400 group-disabled:text-gray-300' />
                </button>
            ) : (
                <MagnifyingGlassIcon className='h-5 w-5 text-gray-500 dark:text-slate-400' aria-hidden='true' />
            )}
        </span>
    )
}

export default Icon
