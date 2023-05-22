import { get, isEmpty, sum } from 'lodash'
import React from 'react'
import { LongBudget as TypeLongBudget } from '~/@types/spending'
import { ProgressLine } from '~/components'
import Atom from '~/components/_atomic/Atom'
import Template from '~/components/_atomic/Template'
import { budgetLongColors } from '~/constant/template'
import EmptyData from './EmptyData'

interface Props {
    data: TypeLongBudget[] | undefined
    loading: boolean
}

const LongBudget: React.FC<Props> = (props) => {
    const { data, loading } = props

    return (
        <Template.BudgetList
            data={data}
            loading={loading && isEmpty(data)}
            fallback={<EmptyData />}
            loadingFallback={<Atom.BudgetListSkeleton elNumber={3} />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => `long-budget/${get(item, '_id')}`}
            renderAmount={(item, index: number) => (
                <Atom.Amount
                    amount={get(item, 'amount')}
                    className={budgetLongColors.text[index % budgetLongColors.text.length]}
                />
            )}
            renderProgress={(item, index) => {
                const totalAmounts = sum(get(item, 'amounts', []))
                const percent = (totalAmounts * 100) / get(item, 'amount', 0)
                const bgColor = budgetLongColors.bg[index % budgetLongColors.bg.length]

                return <ProgressLine data={[{ color: bgColor, percent }]} background={bgColor} />
            }}
            renderTitle={(item) => <Atom.Title title={get(item, 'title')} />}
        />
    )
}

export default LongBudget
