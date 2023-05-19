import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { isEmpty, sum } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { LongBudget as TypeLongBudget } from '~/@types/spending'
import { Button, ProgressLine } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { budgetLongColors } from '~/constant/spending'
import { useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import BudgetSkeleton from '../Budget/Skeleton'
import Empty from '../Empty'
import WrapItemLink from '../WrapItemLink'
import WrapList from '../WrapList'

const MakeLongBudget = React.lazy(() => import('../MakeLongBudget'))

interface Props {
    data: TypeLongBudget[] | undefined
    loading: boolean
}

const LongBudget: React.FC<Props> = (props) => {
    const { data, loading } = props

    if (loading && isEmpty(data)) return <BudgetSkeleton elNumber={3} />

    if (data && !isEmpty(data)) {
        return (
            <WrapList>
                {Array.isArray(data) &&
                    data.map((item, index) => {
                        const { _id, amount, title, amounts } = item

                        return (
                            <WrapItemLink key={_id} to={`long-budget/${_id}`}>
                                <div className='flex justify-between px-3'>
                                    <h4 className='font-medium'>{title}</h4>
                                    <span className={clsx('font-normal', budgetLongColors.text[index])}>
                                        {numeral(amount).format()}
                                    </span>
                                </div>
                                <ProgressLine
                                    data={[
                                        {
                                            color: budgetLongColors.bg[index],
                                            percent: (sum(amounts) * 100) / item.amount,
                                        },
                                    ]}
                                    background={budgetLongColors.bg[index]}
                                    className='mx-3 my-1'
                                />
                            </WrapItemLink>
                        )
                    })}
            </WrapList>
        )
    }

    return <EmptyData />
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
