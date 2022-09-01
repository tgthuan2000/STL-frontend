import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import React from 'react'
import { ContentBoxProps } from '~/@types/components'
import { SuspenseAnimate } from '~/components'

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
        <SuspenseAnimate
            className={clsx(
                'w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none',
                { 'max-w-lg': !fullWidth },
                className
            )}
        >
            <Title title={title} onReload={onReload} loading={loading} />
            <div ref={parent}>{children}</div>
            <SeeMore seeMore={seeMore} to={to} />
        </SuspenseAnimate>
    )
}

export default ContentBox
