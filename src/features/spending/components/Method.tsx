import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SkeletonProps } from '~/@types/components'
import { MethodProps } from '~/@types/spending'
import LANGUAGE from '~/i18n/language/key'
import Empty from './Empty'
import { SkeletonLine } from '~/components'

const Method: React.FC<MethodProps> = ({ data, loading }) => {
    const { t } = useTranslation()
    if (loading) return <MethodSkeleton elNumber={8} />

    if (!isEmpty(data)) {
        return (
            <ul role='list' className='text-gray-900 dark:text-slate-200'>
                {Array.isArray(data) &&
                    data?.map((item) => {
                        return (
                            <li key={item._id}>
                                <Link
                                    to={`/spending/method/${item._id}`}
                                    className='flex cursor-pointer px-3 py-2.5 hover:opacity-70'
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
    return <Empty icon={ArchiveBoxXMarkIcon} text={t(LANGUAGE.EMPTY_DATA)} />
}

export default Method

export const MethodSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber = 5 } = props

    return (
        <ul role='list' className='pointer-events-none select-none'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <li key={index} className='animate-pulse' style={{ animationDelay: `${index * 300}ms` }}>
                    <div className='flex px-3 py-2.5'>
                        <div className='w-2/3 space-y-1'>
                            <SkeletonLine className='h-3.5 w-2/3' />
                        </div>
                        <div className='flex w-1/3 flex-col items-end space-y-1'>
                            <SkeletonLine className='h-3.5 w-2/3' />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
