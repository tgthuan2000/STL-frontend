import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { Link } from 'react-router-dom'
import { PayDueLoanProps } from '~/@types/loan'
import { DATE_TIME_FORMAT } from '~/constant'
import { urlFor } from '~/sanityConfig'

const PayDueLoan: React.FC<PayDueLoanProps> = ({ label, data, loading }) => {
    if (loading) return <PayDueLoanSkeleton />
    if (isEmpty(data)) return <></>
    return (
        <div>
            <h4 className='mb-2 text-gray-900 font-normal text-lg'>{label}</h4>
            <div className='flex lg:flex-wrap gap-4 w-full overflow-auto pb-6'>
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
            </div>
        </div>
    )
}

export default PayDueLoan

const PayDueLoanSkeleton = () => {
    return (
        <div className='animate-pulse'>
            <h4 className='mb-4 w-60 h-8 rounded-md bg-gray-200' />
            <div className='flex lg:flex-wrap gap-4 w-full pb-6'>
                {Array.from(Array(10))?.map((item, index) => {
                    return (
                        <div
                            className='flex group items-center bg-white gap-x-3 py-3 px-3 lg:px-6 border rounded-md shadow-md'
                            key={index}
                        >
                            <div className='flex-shrink-0 lg:w-14 w-12 lg:h-14 h-12 rounded-full bg-gray-200' />
                            <div className='flex flex-col gap-2'>
                                <span className='w-20 h-5 bg-gray-100 rounded-full'></span>
                                <span className='w-14 h-5 bg-gray-100 rounded-full'></span>
                                <span className='w-14 h-5 bg-gray-100 rounded-full'></span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
