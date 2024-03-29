import { get, isEmpty, sum } from 'lodash'
import React from 'react'
import { BudgetProps } from '~/@types/spending'
import { ProgressLine } from '~/components'
import * as Atom from '~/components/_atomic/Atom'
import { BudgetProgressList } from '~/components/_atomic/Template'
import { colors } from '~/constant/template'
import EmptyData from './EmptyData'

const Method: React.FC<BudgetProps> = (props) => {
    const { data, loading } = props

    return (
        <BudgetProgressList
            data={data?.MethodSpending}
            loading={loading && isEmpty(data)}
            fallback={<EmptyData method />}
            loadingFallback={<Atom.BudgetListSkeleton elNumber={3} />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => `budget-method/${get(item, '_id')}`}
            renderAmount={(item, index: number) => (
                <Atom.Amount amount={get(item, 'amount')} className={colors.text[index % colors.text.length]} />
            )}
            renderProgress={(item, index) => {
                const totalAmounts = sum(get(item, 'amounts', []))
                const percent = (totalAmounts * 100) / get(item, 'amount', 0)
                const bgColor = colors.bg[index % colors.bg.length]

                return <ProgressLine data={[{ color: bgColor, percent }]} background={bgColor} />
            }}
            renderTitle={(item) => <Atom.Title title={get(item, 'methodSpending.name')} />}
        />
    )
}

export default Method
