import { isEmpty } from 'lodash'
import React from 'react'
import { Link, To } from 'react-router-dom'

interface Props {
    data: any[] | undefined
    fallback?: React.ReactNode
    getItemKey: (item: any) => string | number
    getItemLink: (item: any) => To
    renderTitle: (item: any) => React.ReactNode
    renderAmount: (item: any, index: number) => React.ReactNode
    renderProgress: (item: any, index: number) => React.ReactNode
}

const BudgetList: React.FC<Props> = (props) => {
    const { data, fallback, getItemKey, getItemLink, renderTitle, renderAmount, renderProgress } = props

    if (isEmpty(data)) {
        return <>{fallback}</>
    }

    return (
        <ul role='list' className='cursor-pointer divide-y text-gray-900 dark:divide-slate-700 dark:text-slate-200'>
            {Array.isArray(data) &&
                data?.map((item, index) => {
                    const key = getItemKey(item)
                    const link = getItemLink(item)
                    const title = renderTitle(item)
                    const amount = renderAmount(item, index)
                    const progress = renderProgress(item, index)

                    return (
                        <li key={key}>
                            <Link to={link} className='block cursor-pointer py-3 hover:opacity-70'>
                                <div className='flex items-end justify-between px-3'>
                                    <h4 className='font-medium'>{title}</h4>
                                    {amount}
                                </div>
                                {progress}
                            </Link>
                        </li>
                    )
                })}
        </ul>
    )
}

export default BudgetList
