import clsx from 'clsx'
import { isEmpty } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { Link } from 'react-router-dom'
import { ContentUserLoanBox2Props } from '~/@types/components'

const AvatarUser = React.lazy(() => import('~/components').then(({ AvatarUser }) => ({ default: AvatarUser })))

const Content: React.FC<ContentUserLoanBox2Props> = ({ data, loading }) => {
    if (loading) return <Skeleton />
    if (isEmpty(data))
        return <div className='text-center text-gray-500 py-4 px-8 rounded-xl bg-white'>Không có dữ liệu</div>
    return (
        <>
            {data?.map((item) => {
                return (
                    <Link
                        to={`member/${item._id}`}
                        className='flex group items-center bg-white gap-x-3 py-3 px-3 lg:px-6 border rounded-md cursor-pointer shadow-md hover:shadow-lg hover:bg-gray-50 transition-all'
                        key={item._id}
                    >
                        <AvatarUser size='large' image={item?.image} />

                        <div className='flex flex-col'>
                            <span className='truncate max-w-[150px]'>{item.userName}</span>
                            <span
                                className={clsx(
                                    'font-normal',
                                    { 'text-green-500': item.surplus > 0 },
                                    { 'text-red-500': item.surplus < 0 },
                                    { 'text-gray-500': item.surplus === 0 }
                                )}
                            >
                                {numeral(item.surplus).format()}
                            </span>
                        </div>
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
                        className='flex animate-pulse group items-center bg-white gap-x-3 py-3 px-3 lg:px-6 border rounded-md shadow-md'
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
        </>
    )
}
