import clsx from 'clsx'
import React from 'react'
import { ContentBoxProps } from '~/@types/components'
import { AnimateWrap } from '~/components'
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
    fallback,
}) => {
    return (
        <div
            className={clsx(
                'w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none',
                { 'max-w-lg': !fullWidth },
                className
            )}
        >
            <Title title={title} onReload={onReload} loading={loading} />
            <AnimateWrap>{children?.({ fallback })}</AnimateWrap>
            <SeeMore seeMore={seeMore} to={to} />
        </div>
    )
}

export default ContentBox
