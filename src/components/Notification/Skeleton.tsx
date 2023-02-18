import React from 'react'
import { SkeletonProps } from '~/@types/components'

const SkeletonNotify: React.FC<SkeletonProps> = ({ elNumber = 1 }) => {
    return (
        <>
            {Array(elNumber)
                .fill(0)
                .map((_, index) => (
                    <div
                        key={index}
                        className='flex w-full animate-pulse flex-col rounded-md bg-gray-50 px-2 py-2 dark:bg-slate-500'
                    >
                        <div className='flex justify-between gap-3'>
                            <span className='h-5 w-1/2 rounded-full bg-slate-200 dark:bg-slate-600' />
                            <span className='h-5 w-14 rounded-full bg-slate-200 dark:bg-slate-600' />
                        </div>
                        <span className='mt-2 h-5 w-1/4 rounded-full bg-slate-200 dark:bg-slate-600' />
                        <span className='mt-2 h-5 w-1/3 rounded-full bg-slate-200 dark:bg-slate-600' />
                        <div className='mt-2 flex justify-between'>
                            <span className='h-5 w-3/5 rounded-full bg-slate-200 dark:bg-slate-600' />
                            <span className='h-5 w-1/4 rounded-full bg-slate-200 dark:bg-slate-600' />
                        </div>
                    </div>
                ))}
        </>
    )
}

export default SkeletonNotify
