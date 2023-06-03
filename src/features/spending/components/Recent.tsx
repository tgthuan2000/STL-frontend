import { get } from 'lodash'
import React from 'react'
import { RecentProps } from '~/@types/spending'
import * as Atom from '~/components/_atomic/Atom'
import { RecentList } from '~/components/_atomic/Template'
import { getKindSpendingTextColor } from '~/constant/template'
import { getLinkSpending } from '~/utils'

const Recent: React.FC<RecentProps> = (props) => {
    const { data, loading } = props

    return (
        <RecentList
            data={data}
            loading={loading}
            fallback={<Atom.EmptyList />}
            loadingFallback={<Atom.RecentListSkeleton />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => getLinkSpending(get(item, 'kindSpending.key'), get(item, '_id'))}
            renderDate={(item) => <Atom.Date date={get(item, 'date')} />}
            renderMethod={(item) => <Atom.Title title={get(item, 'methodSpending.name')} />}
            renderAmount={(item) => (
                <Atom.Amount
                    amount={get(item, 'amount')}
                    className={() => getKindSpendingTextColor(get(item, 'kindSpending.key'))}
                />
            )}
            renderCategory={(item) => (
                <Atom.Title title={get(item, 'categorySpending.name')} fallback={get(item, 'kindSpending.name')} />
            )}
            renderDescription={(item) => <Atom.Description data={get(item, 'description')} />}
            // renderDot={(item) => (
            //     <Atom.Dot
            //         hidden={![KIND_SPENDING.CREDIT].includes(get(item, 'kindSpending.key'))}
            //         className={get(item, 'paid') ? 'bg-green-500' : 'bg-radical-red-500'}
            //     />
            // )}
        />
    )
}

export default Recent
