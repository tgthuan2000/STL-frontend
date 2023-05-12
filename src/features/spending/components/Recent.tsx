import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SkeletonProps } from '~/@types/components'
import { RecentProps } from '~/@types/spending'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import LANGUAGE from '~/i18n/language/key'
import { getLinkSpending } from '~/utils'
import Empty from './Empty'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'

const Recent: React.FC<RecentProps> = ({ data, loading }) => {
    const { t } = useTranslation()
    if (loading) return <RecentSkeleton />

    if (!isEmpty(data)) {
        return (
            <ul
                role='list'
                className='divide-y divide-gray-100 text-gray-900 dark:divide-slate-700 dark:text-slate-200 sm:divide-gray-200'
            >
                {Array.isArray(data) &&
                    data?.map((item) => (
                        <li key={item._id}>
                            <Link
                                to={getLinkSpending(item.kindSpending.key, item._id)}
                                state={{ status: item.kindSpending._id }}
                                className='flex cursor-pointer flex-col px-3 py-2 hover:opacity-70'
                            >
                                <div className='flex'>
                                    <div className='w-1/2 overflow-hidden xl:w-2/3'>
                                        <span>
                                            {item.date
                                                ? moment(item.date).format(DATE_FORMAT.D_DATE_TIME)
                                                : t(LANGUAGE.UNLIMITED_TIME)}
                                        </span>
                                        <h3 className='truncate font-medium'>
                                            {item.methodSpending?.name || t(LANGUAGE.EMPTY_METHOD)}
                                        </h3>
                                    </div>
                                    <div className='w-1/2 overflow-hidden text-right xl:w-1/3'>
                                        <span className='flex items-center justify-end gap-x-2'>
                                            {[KIND_SPENDING.CREDIT].includes(item.kindSpending.key) && (
                                                <span
                                                    className={clsx(
                                                        'inline-block h-1.5 w-1.5 rounded-full',
                                                        item.paid ? 'bg-green-500' : 'bg-radical-red-500'
                                                    )}
                                                />
                                            )}
                                            <h4 className={clsx('truncate font-medium')}>
                                                {item.categorySpending?.name ?? item.kindSpending.name}
                                            </h4>
                                        </span>

                                        <span
                                            className={clsx(
                                                { 'text-red-500': item.kindSpending.key === KIND_SPENDING.COST },
                                                { 'text-green-500': item.kindSpending.key === KIND_SPENDING.RECEIVE },
                                                {
                                                    'text-blue-500': [
                                                        KIND_SPENDING.TRANSFER_FROM,
                                                        KIND_SPENDING.TRANSFER_TO,
                                                    ].includes(item.kindSpending.key),
                                                },
                                                {
                                                    'text-orange-500': [
                                                        KIND_SPENDING.LOAN,
                                                        KIND_SPENDING.CREDIT,
                                                    ].includes(item.kindSpending.key),
                                                },
                                                'font-medium'
                                            )}
                                        >
                                            {numeral(item.amount).format()}
                                        </span>
                                    </div>
                                </div>
                                {item.description && (
                                    <span title={item.description}>
                                        {item.description.split('\n').map((line, index) => (
                                            <span key={index} className='block w-full truncate'>
                                                {line}
                                            </span>
                                        ))}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
            </ul>
        )
    }
    return <Empty icon={ArchiveBoxXMarkIcon} text={t(LANGUAGE.EMPTY_DATA)} />
}

export default Recent

export const RecentSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber = 5 } = props

    return (
        <ul role='list' className='pointer-events-none select-none divide-y divide-gray-300 dark:divide-slate-700'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <li key={index}>
                    <div className='flex px-4 py-3'>
                        <div className='w-2/3 space-y-1'>
                            <div className='h-4 w-2/3 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                            <div className='h-4 w-1/2 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                            <div className='h-4 w-1/3 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                        </div>
                        <div className='flex w-1/3 flex-col items-end space-y-1'>
                            <div className='h-4 w-1/2 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                            <div className='h-4 w-full animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
