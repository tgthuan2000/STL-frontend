import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { head, isEmpty } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { BudgetProps } from '~/@types/spending'
import { colors } from '~/constant/spending'
import { TEMPLATE } from '~/constant/template'
import { sum } from '~/services'

const Budget: React.FC<BudgetProps> = ({ data, loading }) => {
    const [ref] = useAutoAnimate<HTMLUListElement>()
    if (loading && isEmpty(data)) return <BudgetSkeleton />

    if (!isEmpty(head(data)?.MethodSpending)) {
        return (
            <ul role='list' className='divide-y divide-gray-300q' ref={ref}>
                {head(data)?.MethodSpending?.map((item, index) => {
                    const totalAmounts = sum(item.amounts)
                    const percent = (totalAmounts * 100) / item.amount
                    const isOver = percent > 100

                    const bgColor = colors.bg[index % colors.bg.length]
                    const textColor = colors.text[index % colors.text.length]

                    return (
                        <li key={item._id}>
                            <div className='flex justify-between px-2 mt-2'>
                                <h4 className='font-medium'>{item.methodSpending.name}</h4>
                                <span className={clsx('font-normal', textColor)}>{numeral(item.amount).format()}</span>
                            </div>
                            <div className='relative mx-2 my-2 h-4'>
                                <div
                                    className='absolute w-full h-full rounded-full opacity-30'
                                    style={{ background: bgColor }}
                                />
                                <div
                                    style={{
                                        width: `${percent > 100 ? 100 : percent}%`,
                                        background: bgColor,
                                    }}
                                    className='absolute h-full rounded-full transition-all'
                                />
                            </div>
                            <div
                                className={clsx(
                                    'flex justify-between mb-4 px-2 font-normal',
                                    isOver ? 'text-radical-red-500' : textColor
                                )}
                            >
                                <span>
                                    CP: {numeral(totalAmounts).format()} • {numeral(percent).format()}%
                                </span>
                                <span>CL: {numeral(item.amount - totalAmounts).format()}</span>
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
    <ul role='list' className='select-none pointer-events-none divide-y divide-gray-300'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='flex justify-between px-2 mt-2'>
                    <span className='animate-pulse bg-gray-200 h-4 w-1/3 rounded-full' />
                    <span className='animate-pulse bg-gray-200 h-4 w-1/4 rounded-full' />
                </div>
                <div className='relative mx-2 my-2 h-4'>
                    <span className='animate-pulse bg-gray-200 absolute w-full h-full rounded-full' />
                </div>
                <div className='flex justify-between px-2 mb-4'>
                    <span className='animate-pulse bg-gray-200 h-4 w-1/4 rounded-full' />
                    <span className='animate-pulse bg-gray-200 h-4 w-1/3 rounded-full' />
                </div>
            </li>
        ))}
    </ul>
)
