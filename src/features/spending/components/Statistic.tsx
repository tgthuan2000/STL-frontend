import clsx from 'clsx'
import { isNil } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { StatisticProps } from '~/@types/spending'

const Statistic: React.FC<StatisticProps> = ({ data, loading }) => {
    if (loading) return <StatisticSkeleton />
    return (
        <div className='grid grid-cols-3 xl:gap-x-4 py-6'>
            {data?.map(({ _id, name, color, value, getLoan }) => {
                return (
                    <div key={_id} className='flex flex-col justify-start items-center gap-y-2 overflow-hidden w-full'>
                        <h4 className={clsx('xl:text-lg text-base font-medium', color)}>{name}</h4>
                        <span className={clsx('xl:text-base text-sm font-medium text-gray-500 block w-full', color)}>
                            <span className='truncate block w-full text-center'>{numeral(value || 0).format()}</span>
                        </span>
                        {!isNil(getLoan) && (
                            <span className='xl:text-sm text-xs font-medium block w-full text-yellow-500'>
                                <span className='truncate block w-full text-center'>
                                    [Vay {numeral(getLoan || 0).format()}]
                                </span>
                            </span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Statistic

const StatisticSkeleton = () => {
    return (
        <div className='grid grid-cols-3 gap-x-4 py-8 animate-pulse'>
            {Array.from(Array(3)).map((value, index) => (
                <div key={index} className='flex flex-col justify-center items-center gap-y-3'>
                    <h4 className='xl:h-4 h-3.5 xl:w-1/3 w-1/2 rounded-full bg-gray-200' />
                    <span className='xl:h-4 h-3.5 xl:w-1/2 w-2/3 rounded-full bg-gray-200' />
                </div>
            ))}
        </div>
    )
}
