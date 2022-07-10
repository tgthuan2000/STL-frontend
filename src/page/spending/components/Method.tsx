import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import clsx from 'clsx'
import _ from 'lodash'
import { MethodProps } from '~/@types/spending'
import { useMemo } from 'react'

const Method = ({ data, loading }: MethodProps) => {
    const tempData = useMemo(() => (data.length > 8 ? data.filter((i) => i.receive !== i.cost) : data), [data])
    if (loading) return <MethodSkeleton />

    if (!_.isEmpty(data)) {
        return (
            <ul role='list'>
                {tempData
                    .sort((a, b) => b.receive - b.cost - a.receive + a.cost)
                    .map((item) => {
                        return (
                            <li key={item._id}>
                                <Link
                                    to={`method/${item._id}`}
                                    className='px-3 py-3 flex hover:bg-gray-100 cursor-pointer'
                                >
                                    <div className='w-2/3 truncate'>
                                        <h4 className='font-medium'>{item.name}</h4>
                                    </div>
                                    <div className='w-1/3 truncate text-right'>
                                        <NumberFormat
                                            value={item.receive - item.cost}
                                            displayType='text'
                                            thousandSeparator
                                            className={clsx(
                                                'font-medium',
                                                { 'text-red-500': item.receive < item.cost },
                                                { 'text-green-500': item.receive > item.cost },
                                                { 'text-gray-500': item.receive === item.cost }
                                            )}
                                        />
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
            </ul>
        )
    }
    return <div className='py-2 text-center text-gray-700'>Không có dữ liệu</div>
}

export default Method

const MethodSkeleton = () => (
    <ul role='list' className='select-none pointer-events-none'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='px-4 py-4 flex'>
                    <div className='w-2/3 space-y-1'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-2/3' />
                    </div>
                    <div className='w-1/3 space-y-1 flex flex-col items-end'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-2/3' />
                    </div>
                </div>
            </li>
        ))}
    </ul>
)
