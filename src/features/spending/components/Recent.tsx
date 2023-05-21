import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { get } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SkeletonProps } from '~/@types/components'
import { RecentProps } from '~/@types/spending'
import { SkeletonLine } from '~/components'
import { RecentList, RenderAmount, RenderDate, RenderDescription, RenderDot, RenderTitle } from '~/components/Spending'
import { KIND_SPENDING, getKindSpendingTextColor } from '~/constant/spending'
import LANGUAGE from '~/i18n/language/key'
import { getLinkSpending } from '~/utils'
import Empty from './Empty'

const Recent: React.FC<RecentProps> = (props) => {
    const { data, loading } = props
    const { t } = useTranslation()

    if (loading) return <RecentSkeleton />

    return (
        <RecentList
            data={data}
            fallback={<Empty icon={ArchiveBoxXMarkIcon} text={t(LANGUAGE.EMPTY_DATA)} />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => getLinkSpending(get(item, 'kindSpending.key'), get(item, '_id'))}
            renderDate={(item) => <RenderDate date={get(item, 'date')} />}
            renderMethod={(item) => <RenderTitle title={get(item, 'methodSpending.name')} fallback={<></>} />}
            renderAmount={(item) => (
                <RenderAmount
                    amount={get(item, 'amount')}
                    className={() => getKindSpendingTextColor(get(item, 'kindSpending.key'))}
                />
            )}
            renderCategory={(item) => (
                <RenderTitle title={get(item, 'categorySpending.name')} fallback={get(item, 'kindSpending.name')} />
            )}
            renderDescription={(item) => <RenderDescription data={get(item, 'description')} />}
            renderDot={(item) => (
                <RenderDot
                    hidden={![KIND_SPENDING.CREDIT].includes(get(item, 'kindSpending.key'))}
                    className={get(item, 'paid') ? 'bg-green-500' : 'bg-radical-red-500'}
                />
            )}
        />
    )
}

export default Recent

export const RecentSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber = 5 } = props

    return (
        <ul role='list' className='pointer-events-none select-none divide-y divide-gray-300 dark:divide-slate-700'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <li key={index} className='animate-pulse' style={{ animationDelay: `${index * 300}ms` }}>
                    <div className='flex px-3 py-2'>
                        <div className='w-2/3 space-y-1'>
                            <SkeletonLine className='h-3.5 w-2/3' />
                            <SkeletonLine className='h-3.5 w-1/2' />
                        </div>
                        <div className='flex w-1/3 flex-col items-end space-y-1'>
                            <SkeletonLine className='h-3.5 w-1/2' />
                            <SkeletonLine className='h-3.5 w-full' />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
