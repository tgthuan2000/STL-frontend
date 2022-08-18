import clsx from 'clsx'
import numeral from 'numeral'
import { Link } from 'react-router-dom'
import { ContentUserLoanBox2Props } from '~/@types/components'
import AvatarUser from '~/components/AvatarUser'
import UserSvg from '~/components/UserSvg'
import { urlFor } from '~/sanityConfig'

const Content = ({ data, loading }: ContentUserLoanBox2Props) => {
    if (loading) return <Skeleton />
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
                            <span className={clsx('font-normal', item.surplus > 0 ? 'text-green-500' : 'text-red-500')}>
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
