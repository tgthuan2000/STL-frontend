import React from 'react'
import { SkeletonProps } from '~/@types/components'
import SkeletonLine from '~/components/SkeletonLine'

const SimpleListSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber = 5 } = props

    return (
        <ul role='list' className='pointer-events-none select-none'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <li key={index} className='animate-pulse' style={{ animationDelay: `${index * 300}ms` }}>
                    <div className='flex px-3 py-2'>
                        <div className='w-2/3 space-y-1'>
                            <SkeletonLine className='h-3.5 w-2/3' />
                        </div>
                        <div className='flex w-1/3 flex-col items-end space-y-1'>
                            <SkeletonLine className='h-3.5 w-2/3' />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default SimpleListSkeleton
