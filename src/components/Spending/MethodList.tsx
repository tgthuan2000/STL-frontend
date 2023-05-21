import { isEmpty } from 'lodash'
import React from 'react'
import { Link, To } from 'react-router-dom'

interface Props {
    data: any[] | undefined
    fallback?: React.ReactNode
    getItemKey: (item: any) => string | number
    getItemLink: (item: any) => To
    renderName: (item: any) => React.ReactNode
    renderSurplus: (item: any) => React.ReactNode
}

const RecentList: React.FC<Props> = (props) => {
    const { data, fallback, getItemKey, getItemLink, renderName, renderSurplus } = props

    if (isEmpty(data)) {
        return <>{fallback}</>
    }

    return (
        <ul role='list' className='text-gray-900 dark:text-slate-200'>
            {Array.isArray(data) &&
                data?.map((item) => {
                    const key = getItemKey(item)
                    const link = getItemLink(item)
                    const name = renderName?.(item)
                    const surplus = renderSurplus?.(item)

                    return (
                        <li key={key}>
                            <Link to={link} className='flex cursor-pointer px-3 py-2 hover:opacity-70'>
                                <div className='w-2/3 truncate'>
                                    <h3 className='truncate font-medium'>{name}</h3>
                                </div>
                                <div className='w-1/3 truncate text-right'>{surplus}</div>
                            </Link>
                        </li>
                    )
                })}
        </ul>
    )
}

export default RecentList
