import clsx from 'clsx'
import numeral from 'numeral'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StatisticProps } from '~/@types/spending'
import LANGUAGE from '~/i18n/language/key'

const Statistic: React.FC<StatisticProps> = ({ data, loading }) => {
    const { t } = useTranslation()
    if (loading) return <StatisticSkeleton />
    return (
        <div className='grid grid-cols-3 py-6 xl:gap-x-4'>
            {Array.isArray(data) &&
                data?.map(({ _id, name, color, value, getLoan }) => {
                    return (
                        <div
                            key={_id}
                            className='flex w-full flex-col items-center justify-start gap-y-2 overflow-hidden'
                        >
                            <h4 className={clsx('text-base font-medium xl:text-lg', color)}>{name}</h4>
                            <span
                                className={clsx('block w-full text-sm font-medium text-gray-500 xl:text-base', color)}
                            >
                                <span className='block w-full truncate text-center'>
                                    {numeral(value || 0).format()}
                                </span>
                            </span>
                            {Boolean(getLoan) && (
                                <span className='block w-full text-xs font-medium text-yellow-500 xl:text-sm'>
                                    <span className='block w-full truncate text-center'>
                                        [{t(LANGUAGE.LOAN)} {numeral(getLoan || 0).format()}]
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
        <div className='grid animate-pulse grid-cols-3 gap-x-4 py-8'>
            {Array.from(Array(3)).map((value, index) => (
                <div key={index} className='flex flex-col items-center justify-center gap-y-3'>
                    <h4 className='h-3.5 w-1/2 rounded-full bg-gray-200 dark:bg-slate-500 xl:h-4 xl:w-1/3' />
                    <span className='h-3.5 w-2/3 rounded-full bg-gray-200 dark:bg-slate-500 xl:h-4 xl:w-1/2' />
                </div>
            ))}
        </div>
    )
}
