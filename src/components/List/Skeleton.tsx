import React from 'react'
import { SkeletonProps } from '~/@types/components'

const SkeletonList: React.FC<SkeletonProps> = ({ elNumber = 2 }) => {
    return (
        <div className='animate-pulse border-t dark:border-slate-800'>
            {Array.from(Array(elNumber)).map((item, index) => (
                <div key={index}>
                    <div className='bg-cyan-200 p-2 dark:bg-slate-800'>
                        <span className='block h-6 w-1/4 rounded-full bg-cyan-300 dark:bg-slate-700' />
                    </div>
                    <ul className='divide-y dark:divide-slate-700'>
                        {Array.from(Array(Math.ceil(Math.random() * 5))).map((item, index) => (
                            <li key={index}>
                                <div className='flex items-center bg-gray-50 p-2 dark:bg-slate-700'>
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <div className='flex items-center justify-between'>
                                            <span className='block h-4 w-1/4 rounded-full bg-gray-200 dark:bg-slate-600' />
                                            <span className='block h-4 w-1/2 rounded-full bg-gray-200 dark:bg-slate-600' />
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='block h-4 w-1/3 rounded-full bg-gray-200 dark:bg-slate-600' />
                                            <span className='block h-4 w-1/4 rounded-full bg-gray-200 dark:bg-slate-600' />
                                        </div>
                                        <span className='block h-4 w-3/4 rounded-full bg-gray-200 dark:bg-slate-600' />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default SkeletonList
