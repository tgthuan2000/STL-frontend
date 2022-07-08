import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import clsx from 'clsx'
import _ from 'lodash'
import { RecentProps } from '~/@types/spending'
import { KIND_SPENDING } from '~/constant/spending'
import { Fragment } from 'react'

const Recent = ({ data, loading }: RecentProps) => {
    if (loading) return <RecentSkeleton />

    if (!_.isEmpty(data)) {
        return (
            <ul role='list' className='divide-y divide-gray-300'>
                {data.map((item) => (
                    <li key={item._id}>
                        <Link
                            to={`transaction/${item._id}`}
                            className='px-3 py-2 flex hover:bg-gray-100 cursor-pointer'
                        >
                            <div className='w-2/3 truncate'>
                                <span>{moment(item.date).format('DD/MM/YYYY - HH:mm:ss')}</span>
                                <h3 className='font-medium'>{item.methodSpending.name}</h3>
                                {item.description && (
                                    <span title={item.description}>
                                        {item.description.split('\n').map((line, index) => (
                                            <Fragment key={index}>
                                                <span className='truncate'>{line}</span>
                                                <br />
                                            </Fragment>
                                        ))}
                                    </span>
                                )}
                            </div>
                            <div className='w-1/3 truncate text-right'>
                                <h4 className={clsx('font-medium')}>{item.kindSpending.name}</h4>
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
                                        'font-medium'
                                    )}
                                    value={item.amount}
                                    displayType='text'
                                    thousandSeparator
                                />
                            </div>
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
