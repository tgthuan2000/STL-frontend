import { useAutoAnimate } from '@formkit/auto-animate/react'
import { isEmpty, sum } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BudgetProps } from '~/@types/spending'
import { colors } from '~/constant/spending'
import LANGUAGE from '~/i18n/language/key'
import BudgetItem from './Item'
import BudgetSkeleton from './Skeleton'
import Empty from '../Empty'
import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import { Button } from '~/components'
import { useSearchParams } from 'react-router-dom'
import { useSlideOver } from '~/context'
import LoadingText from '~/components/Loading/LoadingText'

const MakeBudget = React.lazy(() => import('../MakeBudget'))

const Category: React.FC<BudgetProps> = ({ data, loading }) => {
    const { t } = useTranslation()
    const [ref] = useAutoAnimate<HTMLUListElement>()
    const [, setSearchParams] = useSearchParams()
    const { set } = useSlideOver()

    const handleClick = () => {
        setSearchParams((prev) => {
            const url = new URLSearchParams(prev)
            url.set('slide', 'budget')
            return url
        })
        set({
            title: t(LANGUAGE.MAKE_BUDGET),
            content: <MakeBudget />,
            slide: 'budget',
            fallback: <LoadingText className='p-6' />,
        })
    }

    if (loading && isEmpty(data)) return <BudgetSkeleton />

    if (!isEmpty(data?.CategorySpending)) {
        return (
            <ul
                role='list'
                className='divide-y divide-gray-100 text-gray-900 dark:divide-slate-700 dark:text-slate-200 sm:divide-gray-200'
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
    return (
        <Empty icon={CubeTransparentIcon} text={t(LANGUAGE.EMPTY_BUDGET_CATEGORY)}>
            <Button type='button' onClick={handleClick} color='outline-yellow'>
                {t(LANGUAGE.CREATE)}
            </Button>
        </Empty>
    )
}

export default Category
