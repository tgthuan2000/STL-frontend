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
    getItemLink?: (item: any) => To
    renderTitle: (item: any) => React.ReactNode
    renderAmount: (item: any, index: number) => React.ReactNode
    renderProgress: (item: any, index: number) => React.ReactNode
}

const BudgetProgressList: React.FC<Props> = (props) => {
    const {
        data,
        loading,
        fallback,
        loadingFallback,
        getItemKey,
        getItemLink,
        renderTitle,
        renderAmount,
        renderProgress,
    } = props

    if (loading) {
        return <>{loadingFallback}</>
    }

    if (isEmpty(data)) {
        return <>{fallback}</>
    }

    return (
        <ul role='list' className='cursor-pointer divide-y text-gray-900 dark:divide-slate-700 dark:text-slate-200'>
            {Array.isArray(data) &&
                data?.map((item, index) => {
                    const key = getItemKey(item)
                    const link = getItemLink?.(item)
                    const title = renderTitle(item)
                    const amount = renderAmount(item, index)
                    const progress = renderProgress(item, index)

                    const Component = link ? Link : 'div'

                    return (
                        <li key={key}>
                            <Component
                                to={link as To}
                                className={clsx('block py-3', {
                                    'cursor-pointer hover:opacity-70': link,
                                    'cursor-default': !link,
                                })}
                            >
                                <div className='flex items-end justify-between px-3'>
                                    <h4 className='font-medium'>{title}</h4>
                                    {amount}
                                </div>
                                {progress && <div className='mx-3 my-1'>{progress}</div>}
                            </Component>
                        </li>
                    )
                })}
        </ul>
    )
}

export default BudgetProgressList
