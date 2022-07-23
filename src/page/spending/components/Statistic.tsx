import NumberFormat from 'react-number-format'
import { StatisticProps } from '~/@types/spending'
import { sum } from '~/util'

const Statistic = ({ data, loading }: StatisticProps) => {
    if (loading) return <StatisticSkeleton />
    return (
        <div className='grid grid-cols-5 gap-x-4 py-6'>
            {data?.map(({ _id, data, name }) => {
                const res = sum(data)
                return (
                    <div key={_id} className='flex flex-col justify-center items-center gap-y-2 overflow-hidden w-full'>
                        <h4 className='text-lg font-medium text-gray-600'>{name}</h4>
                        <span className='text-base font-medium text-gray-500 block w-full'>
                            <NumberFormat
                                className='truncate block w-full text-center'
                                value={res || 0}
                                displayType='text'
                                thousandSeparator
                            />
                        </span>
                    </div>
                )
            })}
            <div className='flex flex-col justify-center items-center gap-y-2'>
                <h4 className='text-lg font-medium text-gray-600'>Số dư</h4>
                <span className='text-base font-medium text-gray-500'>
                    <NumberFormat value={10000} displayType='text' thousandSeparator />
                </span>
            </div>
        </div>
    )
}

export default Statistic

const StatisticSkeleton = () => {
    return (
        <div className='grid grid-cols-3 gap-x-4 py-8 animate-pulse'>
            {Array.from(Array(3)).map((value, index) => (
                <div key={index} className='flex flex-col justify-center items-center gap-y-3'>
                    <h4 className='h-4 w-1/3 rounded-full bg-gray-200' />
                    <span className='h-4 w-1/2 rounded-full bg-gray-200' />
                </div>
            ))}
        </div>
    )
}
