import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import React from 'react'
import { ContentBoxProps } from '~/@types/components'
import SeeMore from './SeeMore'
import Title from './Title'

const ContentBox: React.FC<ContentBoxProps> = ({
    title,
    seeMore = true,
    children,
    to,
    onReload,
    loading,
    className,
    fullWidth,
    customHeaderEvent,
}) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return (
        <div
            className={clsx(
                'mx-auto h-fit w-full select-none overflow-hidden rounded-md border border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-800',
                { 'max-w-lg': !fullWidth },
                className
            )}
        >
            <Title title={title} onReload={onReload} loading={loading} customEvent={customHeaderEvent} />
            <div ref={parent}>{children}</div>
            <SeeMore seeMore={seeMore} to={to} />
        </div>
    )
}

export default ContentBox
