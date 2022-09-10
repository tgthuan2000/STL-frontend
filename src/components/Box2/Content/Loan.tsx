import clsx from 'clsx'
import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { loadable } from 'react-lazily/loadable'
import { Link } from 'react-router-dom'
import { ContentLoanBox2Props } from '~/@types/components'
import { DATE_TIME_FORMAT } from '~/constant'

const { AvatarUser } = loadable(() => import('~/components'), {
    fallback: <>...</>,
})

const Content: React.FC<ContentLoanBox2Props> = ({ data, loading, fallback }) => {
    if (loading) return <>{fallback}</>

    if (isEmpty(data)) {
        return <div className='text-center text-gray-500 py-4 px-8 rounded-xl bg-white'>Không có dữ liệu</div>
    }

    return (
        <>
            {data?.map((item) => {
                let numberDay: number | undefined, date: { message: string; color: string }
                const isHavePayDate = item.date && item.date !== 'Invalid date'
                if (isHavePayDate) {
                    numberDay = moment(item.date).diff(moment(), 'days')
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
                        className='flex flex-col group bg-white gap-x-3 gap-y-1 py-3 px-3 border rounded-md cursor-pointer shadow-md hover:shadow-lg hover:bg-gray-50 transition-all'
                        key={item._id}
                    >
                        <AvatarUser size='small' image={item.userLoan?.image} />
                        <span className='truncate flex-1 max-w-[150px]'>{item.userLoan?.userName}</span>
                        <span title='Hạn trả' className={clsx('font-normal truncate', date?.color)}>
                            {isHavePayDate && moment(item.date).format(DATE_TIME_FORMAT) + ' - '} {date?.message}
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
