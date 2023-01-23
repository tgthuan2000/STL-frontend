import { Fragment } from 'react'
import { SkeletonProps } from '~/@types/components'

const SkeletonTableNotify: React.FC<SkeletonProps> = ({ elNumber }) => {
    return (
        <>
            {Array.from(Array(elNumber)).map((item, index, data) => (
                <Fragment key={index}>
                    <tr className='animate-pulse'>
                        <td className='py-4 px-2' colSpan={2}>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block bg-gray-200 h-4 w-1/2 rounded-full' />
                                <span className='block bg-gray-200 h-4 w-3/4 rounded-full' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block mx-auto bg-gray-200 h-4 w-1/2 sm:w-1/3 rounded-full' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block mx-auto bg-gray-200 h-4 w-1/2 rounded-full' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block mx-auto bg-gray-200 h-4 w-1/2 rounded-full' />
                            </span>
                        </td>
                    </tr>
                </Fragment>
            ))}
        </>
    )
}

export default SkeletonTableNotify
