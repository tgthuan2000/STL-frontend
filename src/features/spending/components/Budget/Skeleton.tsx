import clsx from 'clsx'
import React from 'react'
import { SkeletonProps } from '~/@types/components'

const BudgetSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber = 5 } = props

    return (
        <ul role='list' className='pointer-events-none select-none'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <li className='animate-pulse py-1' style={{ animationDelay: `${index * 300}ms` }} key={index}>
                    <div className='mt-2 flex justify-between px-3'>
                        <span className='h-3 w-1/3 rounded-full bg-gray-200 dark:bg-slate-700' />
                        <span className='h-3 w-1/4 rounded-full bg-gray-200 dark:bg-slate-700' />
                    </div>
                    <div className='relative mx-3 my-2 h-2'>
                        <span className='absolute h-full w-full rounded-full bg-gray-200 dark:bg-slate-700' />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default BudgetSkeleton
