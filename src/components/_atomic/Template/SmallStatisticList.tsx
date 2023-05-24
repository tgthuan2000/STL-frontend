import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React from 'react'
import { Link, To } from 'react-router-dom'

interface Props {
    data: any[] | undefined
    loading?: boolean
    fallback?: React.ReactNode
    loadingFallback?: React.ReactNode
    getItemKey: (item: any) => string | number
    renderTitle: (item: any) => string
    renderAmount: (item: any, index: number) => React.ReactNode
    getIcon: (item: any) => any
    getClassName: (item: any) => string
}

const SmallStatisticList: React.FC<Props> = (props) => {
    const { data, loading, fallback, loadingFallback, getItemKey, renderTitle, renderAmount, getIcon, getClassName } =
        props

    if (loading) {
        return <>{loadingFallback}</>
    }

    if (isEmpty(data)) {
        return <>{fallback}</>
    }

    return (
        <ul role='list' className='grid select-none grid-cols-[repeat(auto-fit,minmax(144px,1fr))] gap-4'>
            {Array.isArray(data) &&
                data?.map((item, index) => {
                    const key = getItemKey(item)
                    const title = renderTitle(item)
                    const amount = renderAmount(item, index)
                    const Icon = getIcon(item)
                    const className = getClassName(item)

                    return (
                        <li key={key}>
                            <div
                                title={title}
                                className={clsx(
                                    'flex flex-col items-center gap-1 rounded-md border border-gray-200 p-4 shadow-sm',
                                    className
                                )}
                            >
                                <Icon className='h-9 w-9' />
                                {amount}
                            </div>
                        </li>
                    )
                })}
        </ul>
    )
}

export default SmallStatisticList
