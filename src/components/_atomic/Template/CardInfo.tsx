import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React from 'react'

interface Props {
    data: any[] | undefined
    loading?: boolean
    fallback?: React.ReactNode
    loadingFallback?: React.ReactNode
    className?: string
    getItemKey: (item: any) => string | number
    renderTitle?: (item: any) => string
    renderSubTitle?: (item: any, index: number) => React.ReactNode
    renderIcon?: (item: any) => any
    getClassName?: (item: any) => string
}

const CardInfo: React.FC<Props> = (props) => {
    const {
        data,
        loading,
        fallback,
        loadingFallback,
        className,
        getItemKey,
        renderTitle,
        renderSubTitle,
        renderIcon,
        getClassName,
    } = props

    if (loading) {
        return <>{loadingFallback}</>
    }

    if (isEmpty(data)) {
        return <>{fallback}</>
    }

    return (
        <ul
            role='list'
            className={clsx(
                'grid select-none grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 text-gray-900 dark:text-slate-200',
                className
            )}
        >
            {Array.isArray(data) &&
                data?.map((item, index) => {
                    const key = getItemKey(item)
                    const title = renderTitle?.(item)
                    const subtitle = renderSubTitle?.(item, index)
                    const Icon = renderIcon?.(item)
                    const className = getClassName?.(item)

                    return (
                        <li key={key}>
                            <div
                                title={title}
                                className={clsx(
                                    'flex items-center gap-2 rounded-md border border-gray-200 py-1.5 px-3 dark:border-slate-700 sm:py-2 sm:px-4',
                                    className
                                )}
                            >
                                {Icon}
                                <div className='flex flex-grow flex-col overflow-hidden'>
                                    <p className='truncate text-xs'>{title}</p>
                                    {subtitle}
                                </div>
                            </div>
                        </li>
                    )
                })}
        </ul>
    )
}

export default CardInfo
