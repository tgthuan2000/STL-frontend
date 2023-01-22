import { useAutoAnimate } from '@formkit/auto-animate/react'
import { isEmpty } from 'lodash'
import React from 'react'
import { BudgetProps } from '~/@types/spending'
import { colors } from '~/constant/spending'
import { TEMPLATE } from '~/constant/template'
import { sum } from '~/services'
import BudgetItem from './Item'
import BudgetSkeleton from './Skeleton'

const Category: React.FC<BudgetProps> = ({ data, loading }) => {
    const [ref] = useAutoAnimate<HTMLUListElement>()
    if (loading && isEmpty(data)) return <BudgetSkeleton />

    if (!isEmpty(data?.CategorySpending)) {
        return (
            <ul
                role='list'
                className='divide-y divide-gray-300 text-gray-900 dark:text-slate-200 dark:divide-slate-700'
                ref={ref}
            >
                {data?.CategorySpending?.map((item, index) => {
                    const totalAmounts = sum(item.amounts)
                    const percent = (totalAmounts * 100) / item.amount
                    const isOver = percent > 100

                    const bgColor = colors.bg[index % colors.bg.length]
                    const textColor = colors.text[index % colors.text.length]

                    return (
                        <BudgetItem
                            key={item._id}
                            name={item.categorySpending.name}
                            textColor={textColor}
                            amount={item.amount}
                            percent={percent}
                            bgColor={bgColor}
                            isOver={isOver}
                            totalAmounts={totalAmounts}
                        />
                    )
                })}
            </ul>
        )
    }
    return <div className='py-2 text-center text-gray-700 dark:text-slate-200'>{TEMPLATE.EMPTY_DATA}</div>
}

export default Category
