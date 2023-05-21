import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import { get, isEmpty, sum } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { LongBudget as TypeLongBudget } from '~/@types/spending'
import { Button, ProgressLine } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { BudgetList, RenderAmount, RenderTitle } from '~/components/Spending'
import { budgetLongColors } from '~/constant/spending'
import { useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import BudgetSkeleton from '../Budget/Skeleton'
import Empty from '../Empty'

const MakeLongBudget = React.lazy(() => import('../MakeLongBudget'))

interface Props {
    data: TypeLongBudget[] | undefined
    loading: boolean
}

const LongBudget: React.FC<Props> = (props) => {
    const { data, loading } = props

    if (loading && isEmpty(data)) return <BudgetSkeleton elNumber={3} />

    return (
        <BudgetList
            data={data}
            fallback={<EmptyData />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => `long-budget/${get(item, '_id')}`}
            renderAmount={(item, index: number) => (
                <RenderAmount
                    amount={get(item, 'amount')}
                    className={budgetLongColors.text[index % budgetLongColors.text.length]}
                />
            )}
            renderProgress={(item, index) => {
                const totalAmounts = sum(get(item, 'amounts', []))
                const percent = (totalAmounts * 100) / get(item, 'amount', 0)
                const bgColor = budgetLongColors.bg[index % budgetLongColors.bg.length]

                return <ProgressLine data={[{ color: bgColor, percent }]} background={bgColor} className='mx-3 my-1' />
            }}
            renderTitle={(item) => <RenderTitle title={get(item, 'title')} />}
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
            url.set('slide', 'long-budget')
            return url
        })
        set({
            title: t(LANGUAGE.MAKE_LONG_BUDGET),
            content: <MakeLongBudget />,
            slide: 'long-budget',
            fallback: <LoadingText className='p-6' />,
        })
    }

    return (
        <Empty icon={CubeTransparentIcon} text={t(LANGUAGE.EMPTY_LONG_BUDGET)}>
            <Button type='button' onClick={handleClick} color='outline-yellow'>
                {t(LANGUAGE.CREATE)}
            </Button>
        </Empty>
    )
}

export default LongBudget
