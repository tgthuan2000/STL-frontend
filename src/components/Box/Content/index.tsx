import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { ContentBoxProps } from '~/@types/components'
import SeeMore from './SeeMore'
import Title from './Title'

const ContentBox = ({
    title,
    seeMore = true,
    children,
    to,
    onReload,
    loading,
    className,
    fullWidth,
}: ContentBoxProps) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return (
        <div
            className={clsx(
                'w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none',
                { 'max-w-lg': !fullWidth },
                className
            )}
        >
            <Title title={title} onReload={onReload} loading={loading} />
            <div ref={parent}>{children}</div>
            <SeeMore seeMore={seeMore} to={to} />
        </div>
    )
}

export default ContentBox
