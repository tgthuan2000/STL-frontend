import clsx from 'clsx'
import { isEmpty } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SkeletonProps } from '~/@types/components'
import { MethodProps } from '~/@types/spending'
import LANGUAGE from '~/i18n/language/key'

const Method: React.FC<MethodProps> = ({ data, loading }) => {
    const { t } = useTranslation()
    if (loading) return <MethodSkeleton />

    if (!isEmpty(data)) {
        return (
            <ul role='list' className='text-gray-900 dark:text-slate-200'>
                {Array.isArray(data) &&
                    data?.map((item) => {
                        return (
                            <li key={item._id}>
                                <Link
                                    to={`/spending/method/${item._id}`}
                                    className='flex cursor-pointer px-3 py-3 hover:bg-gray-100 dark:hover:bg-slate-600'
                                >
                                    <div className='w-2/3 truncate'>
                                        <h4 className='font-medium'>{item.name}</h4>
                                    </div>
                                    <div className='w-1/3 truncate text-right'>
                                        <span
                                            className={clsx(
                                                'font-medium',
                                                { 'text-red-500': item.surplus < 0 },
                                                { 'text-green-500': item.surplus > 0 },
                                                { 'text-gray-500': item.surplus === 0 }
                                            )}
                                        >
                                            {numeral(item.surplus).format()}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
            </ul>
        )
    }
    return <div className='py-2 text-center text-gray-700 dark:text-slate-200'>{t(LANGUAGE.EMPTY_DATA)}</div>
}

export default Method

export const MethodSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber = 5 } = props

    return (
        <ul role='list' className='pointer-events-none select-none'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <li key={index}>
                    <div className='flex px-4 py-4'>
                        <div className='w-2/3 space-y-1'>
                            <div className='h-4 w-2/3 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                        </div>
                        <div className='flex w-1/3 flex-col items-end space-y-1'>
                            <div className='h-4 w-2/3 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
