import React from 'react'
import { SkeletonProps } from '~/@types/components'
import SkeletonLine from '~/components/SkeletonLine'

const BudgetListSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber = 5 } = props

    return (
        <ul role='list' className='pointer-events-none select-none'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <li className='animate-pulse py-1' style={{ animationDelay: `${index * 300}ms` }} key={index}>
                    <div className='mt-2 flex justify-between px-3'>
                        <SkeletonLine className='h-3 w-1/3' />
                        <SkeletonLine className='h-3 w-1/4' />
                    </div>
                    <div className='relative mx-3 my-2 h-2'>
                        <SkeletonLine className='absolute h-full w-full' />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default BudgetListSkeleton
