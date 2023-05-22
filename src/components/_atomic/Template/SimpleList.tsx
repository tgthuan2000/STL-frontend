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
    renderValue: (item: any) => React.ReactNode
}

const SimpleList: React.FC<Props> = (props) => {
    const { data, loading, fallback, loadingFallback, getItemKey, getItemLink, renderTitle, renderValue } = props

    if (loading) {
        return <>{loadingFallback}</>
    }

    if (isEmpty(data)) {
        return <>{fallback}</>
    }

    return (
        <ul role='list' className='text-gray-900 dark:text-slate-200'>
            {Array.isArray(data) &&
                data?.map((item) => {
                    const key = getItemKey(item)
                    const link = getItemLink?.(item)
                    const title = renderTitle?.(item)
                    const value = renderValue?.(item)
                    const Component = link ? Link : 'div'

                    return (
                        <li key={key}>
                            <Component
                                to={link as To}
                                className={clsx('flex px-3 py-2', {
                                    'cursor-pointer hover:opacity-70': link,
                                })}
                            >
                                <div className='w-2/3 truncate'>
                                    <h3 className='truncate font-medium'>{title}</h3>
                                </div>
                                <div className='w-1/3 truncate text-right'>{value}</div>
                            </Component>
                        </li>
                    )
                })}
        </ul>
    )
}

export default SimpleList
