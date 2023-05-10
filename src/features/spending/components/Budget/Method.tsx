import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import { isEmpty, sum } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { BudgetProps } from '~/@types/spending'
import { Button } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { colors } from '~/constant/spending'
import { useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import Empty from '../Empty'
import BudgetItem from './Item'
import BudgetSkeleton from './Skeleton'

const MakeBudget = React.lazy(() => import('../MakeBudget'))

const Method: React.FC<BudgetProps> = ({ data, loading }) => {
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

    if (!isEmpty(data?.MethodSpending)) {
        return (
            <ul
                role='list'
                className='divide-y divide-gray-100 text-gray-900 dark:divide-slate-700 dark:text-slate-200 sm:divide-gray-200'
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
    return (
        <Empty icon={CubeTransparentIcon} text={t(LANGUAGE.EMPTY_BUDGET_METHOD)}>
            <Button type='button' onClick={handleClick} color='outline-yellow'>
                {t(LANGUAGE.CREATE)}
            </Button>
        </Empty>
    )
}

export default Method
