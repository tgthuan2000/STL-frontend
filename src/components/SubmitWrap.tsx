import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import React from 'react'
import { SubmitWrapProps } from '~/@types/components'

const SubmitWrap: React.FC<SubmitWrapProps> = ({ children, className }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return (
        <div
            className={clsx(
                'flex-shrink-0 border-t border-gray-200 dark:border-slate-600 px-4 py-5 sm:px-6 w-full mx-auto',
                className
            )}
        >
            <div className='flex sm:justify-start justify-end space-x-3' ref={parent}>
                {children}
            </div>
        </div>
    )
}

export default SubmitWrap
