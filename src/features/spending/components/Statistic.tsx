import { get } from 'lodash'
import React from 'react'
import { StatisticProps } from '~/@types/spending'
import * as Atom from '~/components/_atomic/Atom'
import { SimpleList } from '~/components/_atomic/Template'

const Statistic: React.FC<StatisticProps> = (props) => {
    const { data, loading } = props

    return (
        <SimpleList
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
