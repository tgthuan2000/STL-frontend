import { ArrowSmRightIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import React from 'react'
import { ContentBoxProps } from '~/@types/components'
import { SuspenseAnimate, AnimateWrap } from '~/components'
import LoadingButton from '~/components/Loading/LoadingButton'

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
    fallback,
}) => {
    return (
        <SuspenseAnimate
            className={clsx(
                'w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none',
                { 'max-w-lg': !fullWidth },
                className
            )}
            fallback={<Fallback data={{ fullWidth, className, onReload: !!onReload }}>{fallback}</Fallback>}
        >
            <Title title={title} onReload={onReload} loading={loading} />
            <AnimateWrap>{children?.({ fallback })}</AnimateWrap>
            <SeeMore seeMore={seeMore} to={to} />
        </SuspenseAnimate>
    )
}

export default ContentBox

interface FallbackProps {
    children: React.ReactNode
    data: { fullWidth?: boolean; className?: string; onReload?: boolean }
}

const Fallback: React.FC<FallbackProps> = ({ children, data }) => {
    const { fullWidth, className, onReload } = data
    return (
        <div
            className={clsx(
                'w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none',
                { 'max-w-lg': !fullWidth },
                className
            )}
        >
            <div className='flex justify-between items-center border-b border-gray-200 bg-gray-50 px-4 py-2'>
                <h4 className='text-base font-medium text-gray-500 animate-pulse'>Đang tải...</h4>
                {onReload && <LoadingButton onReload={() => {}} disabled />}
            </div>
            <div>{children}</div>
            <div className='text-right border-t border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium'>
                <span className='cursor-pointer inline-flex items-center gap-x-1 text-blue-500 hover:opacity-70'>
                    Xem thêm
                    <ArrowSmRightIcon className='h-6 w-6' />
                </span>
            </div>
        </div>
    )
}
