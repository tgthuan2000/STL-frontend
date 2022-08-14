import clsx from 'clsx'
import { isEmpty } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { Link } from 'react-router-dom'
import { RecentLoanProps } from '~/@types/loan'
import { urlFor } from '~/sanityConfig'

const RecentLoan: React.FC<RecentLoanProps> = ({ label, data, loading }) => {
    if (loading) return <RecentLoanSkeleton />
    if (isEmpty(data)) return <></>
    return (
        <div>
            <h4 className='mb-2 text-gray-900 font-normal text-lg'>{label}</h4>
            <div className='flex lg:flex-wrap gap-4 w-full overflow-auto pb-6'>
                {data?.map((item) => {
                    return (
                        <Link
                            to={`member/${item._id}`}
                            className='flex group items-center bg-white gap-x-3 py-3 px-3 lg:px-6 border rounded-md cursor-pointer shadow-md hover:shadow-lg hover:bg-gray-50 transition-all'
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
                                className='flex-shrink-0 lg:w-14 w-12 lg:h-14 h-12 rounded-full bg-no-repeat bg-center bg-cover bg-gray-200'
                            />
                            <div className='flex flex-col'>
                                <span className='truncate max-w-[150px]'>{item.userLoan?.userName}</span>
                                <span
                                    className={clsx('font-normal', item.amount > 0 ? 'text-green-500' : 'text-red-500')}
                                >
                                    {numeral(item.amount).format()}
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default RecentLoan

const RecentLoanSkeleton = () => {
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
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
