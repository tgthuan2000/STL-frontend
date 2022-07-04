import { ArrowSmRightIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

const SeeMore = ({ seeMore, to = '/' }: { seeMore?: boolean; to?: string }) => {
    if (!seeMore) return null
    return (
        <div className='text-right border-t border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium'>
            <Link to={to} className='cursor-pointer inline-flex items-center gap-x-1 text-blue-500 hover:opacity-70'>
                Xem thêm
                <ArrowSmRightIcon className='h-6 w-6' />
            </Link>
        </div>
    )
}

export default SeeMore
