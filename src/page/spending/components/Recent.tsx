import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { client } from '~/sanityConfig'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import useAuth from '~/store/auth'
import clsx from 'clsx'
import { useConfig } from '~/context'
import _ from 'lodash'

interface Data {
    _id: string
    _createdAt: string
    name: string
    category: {
        _id: string
        name: string
    }
    method: {
        _id: string
        name: string
    }
    kind: {
        _id: string
        name: string
        key: string
    }
    description: string
    amount: number
    date: string
}

const Recent = () => {
    const [data, setData] = useState<Data[]>([])
    const { userProfile } = useAuth()
    const { kindSpending } = useConfig()

    useEffect(() => {
        const getData = async () => {
            try {
                const res =
                    await client.fetch(`*[_type == "spending" && user._ref == '${userProfile?._id}'] | order(_createdAt desc)[0...5]
                {
                    _id,
                    _createdAt,
                    name,
                    category-> {
                        _id,
                        name
                    },
                    method-> {
                        _id,
                        name
                    },
                    kind-> {
                        _id,
                        name,
                        key
                    },
                    description,
                    amount,
                    date
                }`)

                setData(res)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    if (!_.isEmpty(data)) {
        return (
            <ul role='list' className='divide-y divide-gray-300'>
                {data.map((item) => (
                    <li key={item._id}>
                        <Link
                            to={`transaction/${item._id}`}
                            className='px-3 py-2 flex hover:bg-gray-100 cursor-pointer'
                        >
                            <div className='w-2/3 truncate'>
                                <span>{moment(item.date).format('DD/MM/YYYY - HH:mm:ss')}</span>
                                <h3 className='font-medium'>{item.method.name}</h3>
                                {item.description && (
                                    <span className='truncate' title={item.description}>
                                        {item.description}
                                    </span>
                                )}
                            </div>
                            <div className='w-1/3 truncate text-right'>
                                <h4 className={clsx('font-medium')}>{item.kind.name}</h4>
                                <NumberFormat
                                    className={clsx(
                                        { 'text-red-500': item.kind.key === 'cost' },
                                        { 'text-green-500': item.kind.key === 'receive' },
                                        'font-medium'
                                    )}
                                    value={item.amount}
                                    displayType='text'
                                    thousandSeparator
                                />
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }
    return <RecentSkeleton />
}

export default Recent

const RecentSkeleton = () => (
    <ul role='list' className='divide-y divide-gray-300 select-none pointer-events-none'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='px-4 py-3 flex'>
                    <div className='w-2/3 space-y-1'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-2/3' />
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-1/2' />
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-1/3' />
                    </div>
                    <div className='w-1/3 space-y-1 flex flex-col items-end'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-1/2' />
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-full' />
                    </div>
                </div>
            </li>
        ))}
    </ul>
)
