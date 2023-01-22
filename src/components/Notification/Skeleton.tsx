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
                        className='flex flex-col w-full rounded-md px-2 py-2 bg-gray-50 dark:bg-slate-500 animate-pulse'
                    >
                        <div className='flex justify-between gap-3'>
                            <span className='h-5 w-1/2 bg-slate-200 dark:bg-slate-600 rounded-full' />
                            <span className='h-5 w-14 bg-slate-200 dark:bg-slate-600 rounded-full' />
                        </div>
                        <span className='mt-2 h-5 w-1/4 bg-slate-200 dark:bg-slate-600 rounded-full' />
                        <span className='mt-2 h-5 w-1/3 bg-slate-200 dark:bg-slate-600 rounded-full' />
                        <div className='mt-2 flex justify-between'>
                            <span className='h-5 w-3/5 bg-slate-200 dark:bg-slate-600 rounded-full' />
                            <span className='h-5 w-1/4 bg-slate-200 dark:bg-slate-600 rounded-full' />
                        </div>
                    </div>
                ))}
        </>
    )
}

export default SkeletonNotify
