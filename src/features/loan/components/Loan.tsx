import { get } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RecentProps } from '~/@types/spending'
import * as Atom from '~/components/_atomic/Atom'
import { RecentList } from '~/components/_atomic/Template'
import { getKindSpendingTextColor } from '~/constant/template'
import LANGUAGE from '~/i18n/language/key'
import { getLinkSpending } from '~/utils'

const Loan: React.FC<RecentProps> = (props) => {
    const { data, loading } = props
    const { t } = useTranslation()

    return (
        <RecentList
            data={data}
            loading={loading}
            fallback={<Atom.EmptyList />}
            loadingFallback={<Atom.RecentListSkeleton />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => getLinkSpending(get(item, 'kindSpending.key'), get(item, '_id'))}
            renderDate={(item) => <Atom.Date date={get(item, 'estimatePaidDate')} />}
            renderMethod={(item) => (
                <Atom.Title title={get(item, 'methodSpending.name')} fallback={t(LANGUAGE.EMPTY_METHOD)} />
            )}
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
            renderDot={(item) => <Atom.Dot className={get(item, 'paid') ? 'bg-green-500' : 'bg-radical-red-500'} />}
        />
    )
}

export default Loan
