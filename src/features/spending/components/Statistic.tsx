import { get } from 'lodash'
import React from 'react'
import { StatisticProps } from '~/@types/spending'
import Atom from '~/components/_atomic/Atom'
import Template from '~/components/_atomic/Template'

const Statistic: React.FC<StatisticProps> = (props) => {
    const { data, loading } = props

    return (
        <Template.SimpleList
            data={data}
            loading={loading}
            loadingFallback={<Atom.SimpleListSkeleton />}
            getItemKey={(item) => get(item, '_id')}
            renderTitle={(item) => <Atom.Title title={get(item, 'name')} />}
            renderValue={(item) => {
                const value = get(item, 'value')
                const color = get(item, 'color')
                return <Atom.Amount amount={value} className={color} />
            }}
        />
    )
}

export default Statistic
