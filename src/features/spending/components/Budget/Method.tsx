import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import { get, isEmpty, sum } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { BudgetProps } from '~/@types/spending'
import { Button, ProgressLine } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { BudgetList, RenderAmount, RenderTitle } from '~/components/Spending'
import { colors } from '~/constant/spending'
import { useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import Empty from '../Empty'
import BudgetSkeleton from './Skeleton'

const MakeBudget = React.lazy(() => import('../MakeBudget'))

const Method: React.FC<BudgetProps> = (props) => {
    const { data, loading } = props

    if (loading && isEmpty(data)) return <BudgetSkeleton elNumber={3} />

    return (
        <BudgetList
            data={data?.MethodSpending}
            fallback={<EmptyData />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => `budget-method/${get(item, '_id')}`}
            renderAmount={(item, index: number) => (
                <RenderAmount amount={get(item, 'amount')} className={colors.text[index % colors.text.length]} />
            )}
            renderProgress={(item, index) => {
                const totalAmounts = sum(get(item, 'amounts', []))
                const percent = (totalAmounts * 100) / get(item, 'amount', 0)
                const bgColor = colors.bg[index % colors.bg.length]

                return <ProgressLine data={[{ color: bgColor, percent }]} background={bgColor} className='mx-3 my-1' />
            }}
            renderTitle={(item) => <RenderTitle title={get(item, 'methodSpending.name')} />}
        />
    )
}

const EmptyData = () => {
    const { t } = useTranslation()
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

    return (
        <Empty icon={CubeTransparentIcon} text={t(LANGUAGE.EMPTY_BUDGET_METHOD)}>
            <Button type='button' onClick={handleClick} color='outline-yellow'>
                {t(LANGUAGE.CREATE)}
            </Button>
        </Empty>
    )
}

export default Method
