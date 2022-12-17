import clsx from 'clsx'
import { BudgetProps } from '~/@types/spending'
import { head, isEmpty } from 'lodash'
import { TEMPLATE } from '~/constant/template'
import numeral from 'numeral'
import React, { useEffect, useRef } from 'react'
import { sum } from '~/services'

const C = ['indigo-500', 'green-500', 'yellow-500', 'blue-500', 'orange-500', 'purple-500', 'pink-500']

const colors = {
    bg: C.map((c) => `bg-${c}`),
    text: C.map((c) => `text-${c}`),
}

const Budget: React.FC<BudgetProps> = ({ data, loading }) => {
    if (loading && isEmpty(data)) return <BudgetSkeleton />

    if (!isEmpty(data)) {
        return (
            <ul role='list'>
                {head(data)?.MethodSpending?.map((item, index) => {
                    const percent = (sum(item.amounts) * 100) / item.amount
                    return (
                        <li key={item._id}>
                            <div className='flex justify-between px-2 mt-2'>
                                <h4 className='font-medium'>{item.methodSpending.name}</h4>
                                <span className={clsx('font-normal', colors.text[index % colors.text.length])}>
                                    {numeral(item.amount).format()}
                                </span>
                            </div>
                            <div className='relative mx-2 mt-2 mb-4 h-4'>
                                <div
                                    className={clsx(
                                        'absolute w-full h-full rounded-full opacity-50',
                                        colors.bg[index % colors.bg.length]
                                    )}
                                />
                                <div
                                    style={{ width: `${percent > 100 ? 100 : percent}%` }}
                                    className={clsx(
                                        'absolute h-full rounded-full transition-all',
                                        colors.bg[index % colors.bg.length]
                                    )}
                                />
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
    return <div className='py-2 text-center text-gray-700'>{TEMPLATE.EMPTY_DATA}</div>
}

export default Budget

const BudgetSkeleton = () => (
    <ul role='list' className='select-none pointer-events-none'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='flex justify-between px-2 mt-2'>
                    <span className='animate-pulse bg-gray-200 h-4 w-1/3 rounded-full' />
                    <span className='animate-pulse bg-gray-200 h-4 w-1/4 rounded-full' />
                </div>
                <div className='relative mx-2 mt-2 mb-4 h-4'>
                    <span className='animate-pulse bg-gray-200 absolute w-full h-full rounded-full' />
                </div>
            </li>
        ))}
    </ul>
)
