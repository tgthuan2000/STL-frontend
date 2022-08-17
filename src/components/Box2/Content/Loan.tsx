import clsx from 'clsx'
import { isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { ContentLoanBox2Props } from '~/@types/components'
import UserSvg from '~/components/UserSvg'
import { DATE_TIME_FORMAT } from '~/constant'
import { urlFor } from '~/sanityConfig'

const Content = ({ data, loading }: ContentLoanBox2Props) => {
    if (loading) return <Skeleton />
    return (
        <>
            {data?.map((item) => {
                let numberDay: number | undefined, date: { message: string; color: string }
                const isHavePayDate = item.payDate && item.payDate !== 'Invalid date'
                if (isHavePayDate) {
                    numberDay = moment(item.payDate).diff(moment(), 'days')
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
                        to={`transaction/${item._id}`}
                        className='flex flex-col group bg-white gap-x-3 gap-y-1 py-3 px-3 border rounded-md cursor-pointer shadow-md hover:shadow-lg hover:bg-gray-50 transition-all'
                        key={item._id}
                    >
                        {item.userLoan?.image ? (
                            <div
                                style={{
                                    backgroundImage: `url(${urlFor(item.userLoan?.image)})`,
                                }}
                                className='flex-shrink-0 w-8 h-8 rounded-full bg-no-repeat bg-center bg-cover bg-gray-200'
                            />
                        ) : (
                            <div className='inline-block flex-shrink-0 w-8 h-8 overflow-hidden rounded-full bg-gray-100'>
                                <UserSvg />
                            </div>
                        )}

                        <span className='truncate flex-1 max-w-[150px]'>{item.userLoan?.userName}</span>
                        <span title='Hạn trả' className={clsx('font-normal truncate', date?.color)}>
                            {isHavePayDate && moment(item.payDate).format(DATE_TIME_FORMAT) + ' - '} {date?.message}
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
                        className='animate-pulse flex flex-col group bg-white gap-x-3 gap-y-2 py-3 px-3 border rounded-md cursor-wait shadow-md'
                    >
                        <div className='flex flex-shrink-0'>
                            <div className='w-8 h-8 rounded-full bg-gray-200' />
                            <div className='w-8 h-8 rounded-full bg-gray-200' />
                            <div className='w-8 h-8 rounded-full bg-gray-200' />
                        </div>
                        <span className='w-20 h-8 bg-gray-100 rounded-full' />
                        <span className='w-40 h-8 bg-gray-100 rounded-full' />
                        <span className='w-28 h-8 bg-gray-100 rounded-full' />
                    </div>
                )
            })}
        </>
    )
}
