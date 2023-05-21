import { isEmpty, isNil } from 'lodash'
import React from 'react'
import { Link, To } from 'react-router-dom'

interface Props {
    data: any[] | undefined
    fallback?: React.ReactNode
    getItemKey: (item: any) => string | number
    getItemLink: (item: any) => To
    renderDate?: (item: any) => React.ReactNode
    renderMethod?: (item: any) => React.ReactNode
    renderDot?: (item: any) => React.ReactNode
    renderCategory?: (item: any) => React.ReactNode
    renderAmount?: (item: any) => React.ReactNode
    renderDescription?: (item: any) => React.ReactNode
}
const RecentList: React.FC<Props> = (props) => {
    const {
        data,
        fallback,
        getItemKey,
        getItemLink,
        renderDate,
        renderMethod,
        renderDot,
        renderCategory,
        renderAmount,
        renderDescription,
    } = props

    if (isEmpty(data)) {
        return <>{fallback}</>
    }

    return (
        <ul
            role='list'
            className='divide-y divide-gray-100 text-gray-900 dark:divide-slate-700 dark:text-slate-200 sm:divide-gray-200'
        >
            {Array.isArray(data) &&
                data?.map((item) => {
                    const key = getItemKey(item)
                    const link = getItemLink(item)
                    const date = renderDate?.(item)
                    const method = renderMethod?.(item)
                    const dot = renderDot?.(item)
                    const category = renderCategory?.(item)
                    const amount = renderAmount?.(item)
                    const description = renderDescription?.(item)

                    return (
                        <li key={key}>
                            <Link to={link} className='flex cursor-pointer flex-col px-3 py-2 hover:opacity-70'>
                                <div className='flex'>
                                    <div className='w-1/2 overflow-hidden xl:w-2/3'>
                                        {date && <span>{date}</span>}
                                        {method && <h3 className='truncate font-medium'>{method}</h3>}
                                    </div>
                                    <div className='w-1/2 overflow-hidden text-right xl:w-1/3'>
                                        <span className='flex items-center justify-end gap-x-2'>
                                            {dot}
                                            {category && <h4 className='truncate font-medium'>{category}</h4>}
                                        </span>

                                        {amount}
                                    </div>
                                </div>
                                {description}
                            </Link>
                        </li>
                    )
                })}
        </ul>
    )
}

export default RecentList
