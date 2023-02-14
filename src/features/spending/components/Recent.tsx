import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RecentProps } from '~/@types/spending'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import LANGUAGE from '~/i18n/language/key'
import { getLinkSpending } from '~/utils'

const Recent: React.FC<RecentProps> = ({ data, loading }) => {
    const { t } = useTranslation()
    if (loading) return <RecentSkeleton />

    if (!isEmpty(data)) {
        return (
            <ul
                role='list'
                className='divide-y divide-gray-300 dark:divide-slate-700 text-gray-900 dark:text-slate-200'
            >
                {Array.isArray(data) &&
                    data?.map((item) => (
                        <li key={item._id}>
                            <Link
                                to={getLinkSpending(item.kindSpending.key, item._id)}
                                state={{ status: item.kindSpending._id }}
                                className='px-3 py-2 flex flex-col hover:bg-gray-100 dark:hover:bg-slate-600 cursor-pointer'
                            >
                                <div className='flex'>
                                    <div className='xl:w-2/3 w-1/2 overflow-hidden'>
                                        <span>
                                            {item.date
                                                ? moment(item.date).format(DATE_FORMAT.D_DATE_TIME)
                                                : t(LANGUAGE.UNLIMITED_TIME)}
                                        </span>
                                        <h3 className='font-medium truncate'>
                                            {item.methodSpending?.name || t(LANGUAGE.EMPTY_METHOD)}
                                        </h3>
                                    </div>
                                    <div className='xl:w-1/3 w-1/2 overflow-hidden text-right'>
                                        <span className='flex justify-end items-center gap-x-2'>
                                            {[KIND_SPENDING.GET_LOAN].includes(item.kindSpending.key) && (
                                                <span
                                                    className={clsx(
                                                        'inline-block h-1.5 w-1.5 rounded-full',
                                                        item.paid ? 'bg-green-500' : 'bg-radical-red-500'
                                                    )}
                                                />
                                            )}
                                            <h4 className={clsx('font-medium truncate')}>
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
                                                        KIND_SPENDING.GET_LOAN,
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
                                            <span key={index} className='block truncate w-full'>
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
    return <div className='py-2 text-center text-gray-700 dark:text-slate-200'>{t(LANGUAGE.EMPTY_DATA)}</div>
}

export default Recent

const RecentSkeleton = () => (
    <ul role='list' className='divide-y divide-gray-300 dark:divide-slate-700 select-none pointer-events-none'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='px-4 py-3 flex'>
                    <div className='w-2/3 space-y-1'>
                        <div className='animate-pulse bg-gray-200 dark:bg-slate-700 rounded-full h-4 w-2/3' />
                        <div className='animate-pulse bg-gray-200 dark:bg-slate-700 rounded-full h-4 w-1/2' />
                        <div className='animate-pulse bg-gray-200 dark:bg-slate-700 rounded-full h-4 w-1/3' />
                    </div>
                    <div className='w-1/3 space-y-1 flex flex-col items-end'>
                        <div className='animate-pulse bg-gray-200 dark:bg-slate-700 rounded-full h-4 w-1/2' />
                        <div className='animate-pulse bg-gray-200 dark:bg-slate-700 rounded-full h-4 w-full' />
                    </div>
                </div>
            </li>
        ))}
    </ul>
)
