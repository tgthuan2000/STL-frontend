import { Link } from 'react-router-dom'
import { methodItems } from '~/constant/spending'
import NumberFormat from 'react-number-format'
import { useEffect, useState } from 'react'
import useAuth from '~/store/auth'
import { client } from '~/sanityConfig'
import clsx from 'clsx'

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
    const { userProfile } = useAuth()

    useEffect(() => {
        const getData = async () => {
            try {
                const res: DataSanity[] = await client.fetch(
                    `
                    *[_type == "methodSpending" && user._ref == '${userProfile?._id}']
                    {
                        _id,
                        name,
                        "cost":  *[_type == "spending" && user._ref == '${userProfile?._id}' && method._ref == ^._id && kind._ref == "960d7f6f-8e80-48e2-a895-ff226b46e1bb"].amount,
                        "receive":  *[_type == "spending" && user._ref == '${userProfile?._id}' && method._ref == ^._id && kind._ref == "6dd1d83c-34fa-401a-a569-ac4502b3d192"].amount
                    }
                `
                )

                setData(
                    res.map(({ cost, receive, ...data }) => {
                        return {
                            ...data,
                            cost: cost.reduce((a, b) => a + b, 0),
                            receive: receive.reduce((a, b) => a + b, 0),
                        }
                    })
                )
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
                        <Link to={`method/${item._id}`} className='px-4 py-4 flex hover:bg-gray-100 cursor-pointer'>
                            <div className='w-2/3 truncate'>
                                {item.name && <h4 className='font-medium'>{item.name}</h4>}
                            </div>
                            <div className='w-1/3 truncate text-right'>
                                {(item.cost || item.receive) && (
                                    <h4>
                                        <NumberFormat
                                            value={item.receive - item.cost}
                                            displayType='text'
                                            thousandSeparator
                                            className={clsx(
                                                item.receive - item.cost < 0 ? 'text-red-500' : 'text-green-500',
                                                'font-bold'
                                            )}
                                        />
                                    </h4>
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        )
    }
    return null
}

export default Method
