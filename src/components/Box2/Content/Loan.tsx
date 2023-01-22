import clsx from 'clsx'
import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { Link } from 'react-router-dom'
import { ContentLoanBox2Props } from '~/@types/components'
import AvatarUser from '~/components/AvatarUser'
import { DATE_FORMAT } from '~/constant'

const Content: React.FC<ContentLoanBox2Props> = ({ data, loading }) => {
    if (loading) return <Skeleton />
    if (isEmpty(data))
        return (
            <div className='text-center text-gray-500 py-4 px-8 rounded-xl bg-white dark:bg-slate-700 dark:text-white'>
                Không có dữ liệu
            </div>
        )
    return (
        <>
            {data?.map((item) => {
                let numberDay: number | undefined, date: { message: string; color: string }
                const isHaveEstimatePayDate = item.estimatePaidDate && item.estimatePaidDate !== 'Invalid date'
                if (isHaveEstimatePayDate) {
                    numberDay = moment(item.estimatePaidDate).diff(moment(), 'days')
                }
                date = {
                    message: `Còn lại ${numberDay} ngày`,
                    color: 'text-yellow-500',
                }

                if (!isNil(numberDay)) {
                    if (numberDay === 0) {
                        date = {
                            message: 'Hôm nay',
                            color: 'text-indigo-500',
                        }
                    }
                    if (numberDay < 0) {
                        date = {
                            message: 'Quá hạn',
                            color: 'text-radical-red-500',
                        }
                    }
                } else {
                    date = {
                        message: 'Không có hạn trả',
                        color: 'text-gray-500',
                    }
                }

                return (
                    <Link
                        to={`transaction/${item._id}/detail`}
                        className='flex flex-col group bg-white dark:bg-slate-800 dark:border-slate-800 gap-x-3 gap-y-1 py-3 px-3 border rounded-md cursor-pointer shadow-md hover:shadow-lg hover:bg-gray-50 transition-all'
                        key={item._id}
                    >
                        <AvatarUser size='small' image={item.userLoan?.image} />

                        <span className='truncate flex-1 max-w-[150px] text-gray-900 dark:text-slate-200'>
                            {item.userLoan?.userName}
                        </span>
                        <span title='Hạn trả' className={clsx('font-normal truncate', date?.color)}>
                            {isHaveEstimatePayDate &&
                                moment(item.estimatePaidDate).format(DATE_FORMAT.D_DATE_TIME) + ' - '}{' '}
                            {date?.message}
                        </span>
                        <span className={clsx('font-normal', item.amount > 0 ? 'text-green-500' : 'text-red-500')}>
                            {numeral(item.amount).format()}
                        </span>
                    </Link>
                )
            })}
        </>
    )
}

export default Content

const Skeleton = () => {
    return (
        <>
            {Array.from(Array(5))?.map((item, index) => {
                return (
                    <div
                        key={index}
                        className='animate-pulse flex flex-col group bg-white dark:bg-slate-800 dark:border-slate-800 gap-x-3 gap-y-2 py-3 px-3 border rounded-md cursor-wait shadow-md'
                    >
                        <div className='flex flex-shrink-0'>
                            <div className='w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700' />
                            <div className='w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700' />
                            <div className='w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700' />
                        </div>
                        <span className='w-20 h-8 bg-gray-100 dark:bg-slate-600 rounded-full' />
                        <span className='w-40 h-8 bg-gray-100 dark:bg-slate-600 rounded-full' />
                        <span className='w-28 h-8 bg-gray-100 dark:bg-slate-600 rounded-full' />
                    </div>
                )
            })}
        </>
    )
}
