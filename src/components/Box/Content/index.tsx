import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import React, { Suspense } from 'react'
import { ContentBoxProps } from '~/@types/components'

const SeeMore = React.lazy(() => import('./SeeMore'))
const Title = React.lazy(() => import('./Title'))

const ContentBox: React.FC<ContentBoxProps> = ({
    title,
    seeMore = true,
    children,
    to,
    onReload,
    loading,
    className,
    fullWidth,
}) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return (
        <div
            className={clsx(
                'w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none',
                { 'max-w-lg': !fullWidth },
                className
            )}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <Title title={title} onReload={onReload} loading={loading} />
                <div ref={parent}>{children}</div>
                <SeeMore seeMore={seeMore} to={to} />
            </Suspense>
        </div>
    )
}

export default ContentBox
