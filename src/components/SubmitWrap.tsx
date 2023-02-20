import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import React from 'react'
import { SubmitWrapProps } from '~/@types/components'

const SubmitWrap: React.FC<SubmitWrapProps> = ({ children, className }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return (
        <div
            className={clsx(
                'mx-auto w-full flex-shrink-0 border-t border-gray-200 px-4 py-5 dark:border-slate-600 sm:px-6',
                className
            )}
        >
            <div className='flex justify-end space-x-3 sm:justify-start' ref={parent}>
                {children}
            </div>
        </div>
    )
}

export default SubmitWrap
