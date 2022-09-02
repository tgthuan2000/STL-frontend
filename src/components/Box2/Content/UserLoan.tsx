import clsx from 'clsx'
import { isEmpty } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { Link } from 'react-router-dom'
import { ContentUserLoanBox2Props } from '~/@types/components'

const AvatarUser = React.lazy(() => import('~/components').then(({ AvatarUser }) => ({ default: AvatarUser })))

const Content: React.FC<ContentUserLoanBox2Props> = ({ data, loading, fallback }) => {
    if (loading) return <>{fallback}</>
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
