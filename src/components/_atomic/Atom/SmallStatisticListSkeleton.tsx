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
                    <div className='flex flex-col items-center gap-2 rounded-md border border-gray-200 p-4 shadow-sm dark:border-slate-700'>
                        <CubeTransparentIcon className='h-9 w-9 text-gray-400 dark:text-slate-400' />
                        <SkeletonLine className='h-4 w-1/2' />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default SmallStatisticListSkeleton
