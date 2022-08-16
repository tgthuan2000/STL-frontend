import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { ContentLoanBox2Props } from '~/@types/components'
import { DATE_TIME_FORMAT } from '~/constant'
import { urlFor } from '~/sanityConfig'

const Content = ({ data, loading }: ContentLoanBox2Props) => {
    if (loading) return <Skeleton />
    return (
        <>
            {data?.map((item) => {
                const numberDay = moment(item.payDate).diff(moment(), 'days')
                let date = {
                    message: `Còn lại ${numberDay} ngày`,
                    color: 'text-yellow-500',
                }
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
                return (
                    <Link
                        to={`member/${item._id}`}
                        className='flex flex-col group bg-white gap-x-3 gap-y-1 py-3 px-3 border rounded-md cursor-pointer shadow-md hover:shadow-lg hover:bg-gray-50 transition-all'
                        key={item._id}
                    >
                        <div
                            style={{
                                backgroundImage: `${
                                    item.userLoan?.image
                                        ? `url(${urlFor(item.userLoan?.image)})`
                                        : ' linear-gradient(to right, #1F1C2C, #928DAB)'
                                }`,
                            }}
                            className='flex-shrink-0 w-8 h-8 rounded-full bg-no-repeat bg-center bg-cover bg-gray-200'
                        />
                        <span className='truncate flex-1 max-w-[150px]'>{item.userLoan?.userName}</span>
                        <span title='Hạn trả' className={clsx('font-normal truncate', date.color)}>
                            {moment(item.payDate).format(DATE_TIME_FORMAT)} - {date.message}
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
