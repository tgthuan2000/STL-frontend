import { CubeIcon, CubeTransparentIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { SkeletonProps } from '~/@types/components'
import SkeletonLine from '~/components/SkeletonLine'

const SmallStatisticListSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber } = props

    return (
        <ul role='list' className='grid select-none grid-cols-[repeat(auto-fill,minmax(144px,1fr))] gap-4'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <li key={index} className='animate-pulse' style={{ animationDelay: `${index * 300}ms` }}>
                    <div className='flex items-center gap-1 rounded-md border border-gray-300 py-1.5 px-3 shadow-sm dark:border-slate-700 sm:py-2 sm:px-4'>
                        <CubeTransparentIcon className='h-7 w-7 text-gray-400 dark:text-slate-400 sm:h-9 sm:w-9' />
                        <SkeletonLine className='h-4 w-20' />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default SmallStatisticListSkeleton
