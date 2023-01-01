import React from 'react'
import { SkeletonProps } from '../Table/Skeleton'

const SkeletonList: React.FC<SkeletonProps> = ({ elNumber = 2 }) => {
    return (
        <div className='border-t animate-pulse'>
            {Array.from(Array(elNumber)).map((item, index) => (
                <div key={index}>
                    <div className='bg-cyan-200 p-2'>
                        <span className='block bg-cyan-300 h-6 w-1/4 rounded-full' />
                    </div>
                    <ul className='divide-y'>
                        {Array.from(Array(Math.ceil(Math.random() * 5))).map((item, index) => (
                            <li key={index}>
                                <div className='flex items-center p-2 bg-gray-50'>
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <div className='flex justify-between items-center'>
                                            <span className='block bg-gray-200 h-4 w-1/4 rounded-full' />
                                            <span className='block bg-gray-200 h-4 w-1/2 rounded-full' />
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='block bg-gray-200 h-4 w-1/3 rounded-full' />
                                            <span className='block bg-gray-200 h-4 w-1/4 rounded-full' />
                                        </div>
                                        <span className='block bg-gray-200 h-4 w-3/4 rounded-full' />
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