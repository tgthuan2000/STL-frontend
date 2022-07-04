import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { client } from '~/sanityConfig'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import useAuth from '~/store/auth'
import clsx from 'clsx'

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
        style: string
    }
    description: string
    amount: number
    date: string
}

const Recent = () => {
    const [data, setData] = useState<Data[]>([])
    const { userProfile } = useAuth()
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
                        style
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

    if (data && data.length) {
        return (
            <ul role='list' className='divide-y divide-gray-300'>
                {data.map((item) => (
                    <li key={item._id}>
                        <Link
                            to={`transaction/${item._id}`}
                            className='px-4 py-4 flex hover:bg-gray-100 cursor-pointer'
                        >
                            <div className='w-2/3 truncate'>
                                {item.date && <span>{moment(item.date).format('DD/MM/YYYY - HH:mm:ss')}</span>}
                                {item.method && <h3 className='font-medium'>{item.method.name}</h3>}
                                {item.description && (
                                    <span className='truncate' title={item.description}>
                                        {item.description}
                                    </span>
                                )}
                            </div>
                            <div className='w-1/3 truncate text-right'>
                                {item.kind && <h4 className={clsx('font-bold')}>{item.kind.name}</h4>}
                                {item.amount && (
                                    <h4>
                                        <NumberFormat value={item.amount} displayType='text' thousandSeparator />
                                    </h4>
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }
    return <div className='py-3 text-center text-md animate-pulse'>Loading...</div>
}

export default Recent
