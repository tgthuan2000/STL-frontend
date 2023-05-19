import clsx from 'clsx'
import numeral from 'numeral'
import React, { Fragment } from 'react'
import { SkeletonProps } from '~/@types/components'
import { StatisticProps } from '~/@types/spending'
import { SkeletonLine } from '~/components'

const Statistic: React.FC<StatisticProps> = ({ data, loading }) => {
    if (loading) return <StatisticSkeleton />

    return (
        <div className='flex flex-col gap-y-2 p-2'>
            {Array.isArray(data) &&
                data?.map((item) => {
                    const { _id, name, color, value } = item

                    return (
                        <Fragment key={_id}>
                            <div className='flex w-full items-center gap-x-1 overflow-hidden px-2'>
                                <h4 className='flex-1 truncate text-sm font-normal text-gray-900 dark:text-slate-200'>
                                    {name}
                                </h4>
                                <span className={clsx('block text-sm font-normal', color)}>
                                    <span className='block w-full truncate text-center'>
                                        {numeral(value || 0).format()}
                                    </span>
                                </span>
                            </div>
                        </Fragment>
                    )
                })}
        </div>
    )
}

export default Statistic

export const StatisticSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber = 5 } = props

    return (
        <div className='flex flex-col gap-y-2 p-2'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <div
                    key={index}
                    className='flex w-full animate-pulse justify-between gap-x-1 px-2 py-1'
                    style={{ animationDelay: `${index * 300}ms` }}
                >
                    <SkeletonLine className='h-3.5 w-20' />
                    <SkeletonLine className='h-3.5 w-24' />
                </div>
            ))}
        </div>
    )
}
