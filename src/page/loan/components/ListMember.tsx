import clsx from 'clsx'
import { isEmpty } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { Link } from 'react-router-dom'
import { ListMemberProps } from '~/@types/loan'
import { urlFor } from '~/sanityConfig'

const ListMember: React.FC<ListMemberProps> = ({ label, data, loading }) => {
    if (isEmpty(data)) return <></>
    return (
        <div>
            <h4 className='mb-2 text-gray-900 font-normal text-lg'>{label}</h4>
            <div className='flex lg:flex-wrap gap-4 w-full overflow-auto pb-6'>
                {data?.map((item) => {
                    return (
                        <Link
                            to={`member/${item._id}`}
                            className='flex group items-center bg-white gap-x-3 py-3 px-3 lg:px-6 border rounded-md cursor-pointer shadow-md transition-all'
                            key={item._id}
                        >
                            <div
                                style={{
                                    backgroundImage: `${
                                        item.image
                                            ? `url(${urlFor(item.image)})`
                                            : ' linear-gradient(to right, #1F1C2C, #928DAB)'
                                    }`,
                                }}
                                className='flex-shrink-0 lg:w-14 w-12 lg:h-14 h-12 lg:group-hover:h-14 lg:group-hover:w-14 transition-all rounded-full bg-no-repeat bg-center bg-cover bg-gray-400'
                            />
                            <div className='flex flex-col'>
                                <span className='lg:group-hover:text-lg transition-all truncate max-w-[150px]'>
                                    {item.userName}
                                </span>
                                <span
                                    className={clsx(
                                        'lg:group-hover:text-lg transition-all font-normal',
                                        label === 'Đang vay' || (Math.random() > 0.5 && label !== 'Đang cho vay')
                                            ? 'text-red-500'
                                            : 'text-green-500'
                                    )}
                                >
                                    {numeral(Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000).format()}
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ListMember
