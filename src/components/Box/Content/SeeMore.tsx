import { ArrowSmRightIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'

const SeeMore: React.FC<{ seeMore?: boolean; to?: string }> = ({ seeMore, to = '/' }) => {
    if (!seeMore) return null
    return (
        <div className='text-right border-t border-gray-200 bg-gray-50 dark:bg-slate-700 dark:border-slate-700 px-6 py-2 text-sm font-medium'>
            <Link
                to={to}
                className='cursor-pointer inline-flex items-center gap-x-1 text-blue-500 dark:text-blue-600 hover:opacity-70'
            >
                Xem thêm
                <ArrowSmRightIcon className='h-6 w-6' />
            </Link>
        </div>
    )
}

export default SeeMore
