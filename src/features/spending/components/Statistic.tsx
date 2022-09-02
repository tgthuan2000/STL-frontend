import clsx from 'clsx'
import numeral from 'numeral'
import { StatisticProps } from '~/@types/spending'

const Statistic = ({ data, loading, fallback }: StatisticProps) => {
    if (loading) return <>{fallback}</>
    return (
        <div className='grid grid-cols-3 xl:gap-x-4 py-6'>
            {data?.map(({ _id, name, color, value }) => {
                return (
                    <div key={_id} className='flex flex-col justify-center items-center gap-y-2 overflow-hidden w-full'>
                        <h4 className={clsx('xl:text-lg text-base font-medium', color)}>{name}</h4>
                        <span className={clsx('xl:text-base text-sm font-medium text-gray-500 block w-full', color)}>
                            <span className='truncate block w-full text-center'>{numeral(value || 0).format()}</span>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default Statistic
