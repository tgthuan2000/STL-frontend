import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { useEffect, useState } from 'react'
import useAuth from '~/store/auth'
import { client } from '~/sanityConfig'
import clsx from 'clsx'
import { useConfig } from '~/context'
import _ from 'lodash'

interface Data {
    _id: string
    name: string
    cost: number
    receive: number
}
interface DataSanity {
    _id: string
    name: string
    cost: number[]
    receive: number[]
}

const Method = () => {
    const [data, setData] = useState<Data[]>([])
    const { kindSpending } = useConfig()
    const { userProfile } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)

            if (_.isEmpty(kindSpending)) return

            const temp = kindSpending.map(
                ({ _id, key }) =>
                    `"${key}": *[_type == "spending" && user._ref == $userId && method._ref == ^._id && kind._ref == "${_id}"].amount`
            )

            try {
                const query = `
                    *[_type == "methodSpending" && user._ref == $userId]
                        {
                            _id,
                            name,
                            ${temp.join(',')}
                        }
                `

                const res: DataSanity[] = await client.fetch(query, {
                    userId: userProfile?._id,
                })

                setData(
                    res.map(({ cost, receive, ...data }) => {
                        return {
                            ...data,
                            cost: _.isEmpty(cost) ? 0 : cost.reduce((a, b) => a + b, 0),
                            receive: _.isEmpty(receive) ? 0 : receive.reduce((a, b) => a + b, 0),
                        }
                    })
                )
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [kindSpending])

    if (loading) return <MethodSkeleton />

    if (!_.isEmpty(data)) {
        return (
            <ul role='list'>
                {data.map((item) => {
                    return (
                        <li key={item._id}>
                            <Link to={`method/${item._id}`} className='px-3 py-2 flex hover:bg-gray-100 cursor-pointer'>
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
                <div className='px-4 py-3 flex'>
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
