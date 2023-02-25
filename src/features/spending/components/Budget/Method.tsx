import { useAutoAnimate } from '@formkit/auto-animate/react'
import { isEmpty, sum } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BudgetProps } from '~/@types/spending'
import { colors } from '~/constant/spending'
import LANGUAGE from '~/i18n/language/key'
import BudgetItem from './Item'
import BudgetSkeleton from './Skeleton'

const Method: React.FC<BudgetProps> = ({ data, loading }) => {
    const { t } = useTranslation()
    const [ref] = useAutoAnimate<HTMLUListElement>()
    if (loading && isEmpty(data)) return <BudgetSkeleton />

    if (!isEmpty(data?.MethodSpending)) {
        return (
            <ul
                role='list'
                className='divide-y divide-gray-300 text-gray-900 dark:divide-slate-700 dark:text-slate-200'
                ref={ref}
            >
                {data?.MethodSpending?.map((item, index) => {
                    const totalAmounts = sum(item.amounts)
                    const percent = (totalAmounts * 100) / item.amount
                    const isOver = percent > 100

                    const bgColor = colors.bg[index % colors.bg.length]
                    const textColor = colors.text[index % colors.text.length]

                    return (
                        <BudgetItem
                            key={item._id}
                            name={item.methodSpending.name}
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
    return <div className='py-2 text-center text-gray-700 dark:text-slate-200'>{t(LANGUAGE.EMPTY_DATA)}</div>
}

export default Method
