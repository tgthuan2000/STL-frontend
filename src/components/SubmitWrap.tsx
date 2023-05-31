import clsx from 'clsx'
import React from 'react'
import { SubmitWrapProps } from '~/@types/components'
import AnimateWrap from './AnimateWrap'

const SubmitWrap: React.FC<SubmitWrapProps> = (props) => {
    const { children, className, hiddenBorder } = props

    return (
        <div
            className={clsx(
                'mx-auto w-full flex-shrink-0 px-4 py-5 sm:px-6',
                { 'border-t border-gray-200 dark:border-slate-600': !hiddenBorder },
                className
            )}
        >
            <AnimateWrap className='flex justify-end space-x-3 sm:justify-start'>{children}</AnimateWrap>
        </div>
    )
}

export default SubmitWrap
