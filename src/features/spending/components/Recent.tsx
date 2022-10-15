import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import clsx from 'clsx'
import { RecentProps } from '~/@types/spending'
import { KIND_SPENDING } from '~/constant/spending'
import { DATE_TIME_FORMAT } from '~/constant'
import { isEmpty } from 'lodash'
import { getLinkSpending } from '~/utils'

const Recent = ({ data, loading }: RecentProps) => {
    if (loading) return <RecentSkeleton />

    if (!isEmpty(data)) {
        return (
            <ul role='list' className='divide-y divide-gray-300'>
                {data?.map((item) => (
                    <li key={item._id}>
                        <Link
                            to={getLinkSpending(item.kindSpending.key, item._id)}
                            state={{ status: item.kindSpending._id }}
                            className='px-3 py-2 flex flex-col hover:bg-gray-100 cursor-pointer'
                        >
                            <div className='flex'>
                                <div className='xl:w-2/3 w-1/2 overflow-hidden'>
                                    <span>
                                        {item.date ? moment(item.date).format(DATE_TIME_FORMAT) : 'Không có thời hạn'}
                                    </span>
                                    <h3 className='font-medium truncate'>
                                        {item.methodSpending?.name || 'Chưa có phương thức thanh toán'}
                                    </h3>
                                </div>
                                <div className='xl:w-1/3 w-1/2 overflow-hidden text-right'>
                                    <h4 className={clsx('font-medium truncate')}>
                                        {item.categorySpending?.name ?? item.kindSpending.name}
                                    </h4>
                                    <NumberFormat
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
                                        value={item.amount}
                                        displayType='text'
                                        thousandSeparator
                                    />
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
    return <div className='py-2 text-center text-gray-700'>Không có dữ liệu</div>
}

export default Recent

const RecentSkeleton = () => (
    <ul role='list' className='divide-y divide-gray-300 select-none pointer-events-none'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='px-4 py-3 flex'>
                    <div className='w-2/3 space-y-1'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-2/3' />
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-1/2' />
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-1/3' />
                    </div>
                    <div className='w-1/3 space-y-1 flex flex-col items-end'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-1/2' />
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-full' />
                    </div>
                </div>
            </li>
        ))}
    </ul>
)