import clsx from 'clsx'
import numeral from 'numeral'
import React, { Fragment } from 'react'
import { StatisticProps } from '~/@types/spending'

const Statistic: React.FC<StatisticProps> = ({ data, loading }) => {
    if (loading) return <StatisticSkeleton />

    return (
        <div className='flex flex-col gap-y-2 p-2'>
            {Array.isArray(data) &&
                data?.map((item) => {
                    const { _id, name, color, value } = item

                    return (
                        <Fragment key={_id}>
                            {Boolean(value) && (
                                <div className='flex w-full items-center gap-x-1 overflow-hidden px-2'>
                                    <h4 className='flex-1 truncate text-base font-normal text-gray-900 dark:text-slate-200'>
                                        {name}
                                    </h4>
                                    <span className={clsx('font-base block text-base text-gray-500', color)}>
                                        <span className='block w-full truncate text-center'>
                                            {numeral(value || 0).format()}
                                        </span>
                                    </span>
                                </div>
                            )}
                        </Fragment>
                    )
                })}
        </div>
    )
}

export default Statistic

const StatisticSkeleton = () => {
    return (
        <div className='flex animate-pulse flex-col gap-y-2 p-2'>
            {Array.from(Array(5)).map((value, index) => (
                <div key={index} className='flex w-full justify-between gap-x-1 px-2'>
                    <span className='h-5 w-20 rounded-full bg-gray-200 dark:bg-slate-700' />
                    <span className='h-5 w-24 rounded-full bg-gray-200 dark:bg-slate-700' />
                </div>
            ))}
        </div>
    )
}
