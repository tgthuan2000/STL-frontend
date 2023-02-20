import clsx from 'clsx'
import { Fragment } from 'react'
import { SkeletonProps } from '~/@types/components'

const SkeletonTable: React.FC<SkeletonProps> = ({ elNumber = 2 }) => {
    return (
        <>
            {Array.from(Array(elNumber)).map((item, index, data) => (
                <Fragment key={index}>
                    <tr className='animate-pulse'>
                        <td className='py-4 px-2'>
                            <span className='flex w-full flex-col gap-2'>
                                <span className='block h-4 w-3/4 rounded-full bg-gray-200 dark:bg-slate-600' />
                                <span className='block h-4 w-1/2 rounded-full bg-gray-200 dark:bg-slate-600' />
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
                    <tr className='animate-pulse'>
                        <td
                            colSpan={4}
                            className={clsx('px-2 pb-4', {
                                'border-b border-gray-200 dark:border-slate-600': data && index !== data.length - 1,
                            })}
                        >
                            <span className='block h-4 w-4/5 rounded-full bg-gray-200 dark:bg-slate-600' />
                        </td>
                    </tr>
                </Fragment>
            ))}
        </>
    )
}

export default SkeletonTable
