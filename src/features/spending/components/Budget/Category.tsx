import { get, isEmpty, sum } from 'lodash'
import React from 'react'
import { BudgetProps } from '~/@types/spending'
import { ProgressLine } from '~/components'
import Atom from '~/components/_atomic/Atom'
import Template from '~/components/_atomic/Template'
import { colors } from '~/constant/template'
import EmptyData from './EmptyData'

const Category: React.FC<BudgetProps> = (props) => {
    const { data, loading } = props

    return (
        <Template.BudgetList
            data={data?.CategorySpending}
            loading={loading && isEmpty(data)}
            fallback={<EmptyData />}
            loadingFallback={<Atom.BudgetListSkeleton elNumber={3} />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => `budget-category/${get(item, '_id')}`}
            renderAmount={(item, index) => (
                <Atom.Amount amount={get(item, 'amount')} className={colors.text[index % colors.text.length]} />
            )}
            renderProgress={(item, index) => {
                const totalAmounts = sum(get(item, 'amounts', []))
                const percent = (totalAmounts * 100) / get(item, 'amount', 0)
                const bgColor = colors.bg[index % colors.bg.length]

                return <ProgressLine data={[{ color: bgColor, percent }]} background={bgColor} className='mx-3 my-1' />
            }}
            renderTitle={(item) => <Atom.Title title={get(item, 'categorySpending.name')} />}
        />
    )
}

export default Category
