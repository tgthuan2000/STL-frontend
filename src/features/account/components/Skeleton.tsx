import React, { Fragment } from 'react'
import { SkeletonProps } from '~/@types/components'

const Skeleton: React.FC<SkeletonProps> = ({ elNumber }) => {
    return (
        <>
            {Array.from(Array(elNumber)).map((item, index, data) => (
                <Fragment key={index}>
                    <tr className='animate-pulse'>
                        <td className='py-4 px-2'>
                            <div className='flex items-center gap-2'>
                                <span className='block h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 dark:bg-slate-600' />
                                <span className='flex w-full flex-col gap-2'>
                                    <span className='block h-4 w-1/2 rounded-full bg-gray-200 dark:bg-slate-600' />
                                    <span className='block h-4 w-3/4 rounded-full bg-gray-200 dark:bg-slate-600' />
                                </span>
                            </div>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex w-full flex-col gap-2'>
                                <span className='mx-auto block h-4 w-1/2 rounded-full bg-gray-200 dark:bg-slate-600 sm:w-1/3' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex w-full flex-col gap-2'>
                                <span className='mx-auto block h-4 w-1/2 rounded-full bg-gray-200 dark:bg-slate-600' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex w-full flex-col gap-2'>
                                <span className='mx-auto block h-4 w-1/2 rounded-full bg-gray-200 dark:bg-slate-600' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex w-full flex-col gap-2'>
                                <span className='mx-auto block h-4 w-1/2 rounded-full bg-gray-200 dark:bg-slate-600' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex w-full flex-col gap-2'>
                                <span className='mx-auto block h-4 w-1/2 rounded-full bg-gray-200 dark:bg-slate-600' />
                            </span>
                        </td>
                    </tr>
                </Fragment>
            ))}
        </>
    )
}

export default Skeleton
