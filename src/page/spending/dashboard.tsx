import _ from 'lodash'
import { useEffect, useState } from 'react'
import { MethodData, RecentData } from '~/@types/spending'
import { Divider } from '~/components'
import { menuMobile } from '~/constant/components'
import { useConfig } from '~/context'
import { useWindowSize } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_METHOD_SPENDING, GET_RECENT_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { ButtonMenu, Method, Recent, Transaction } from './components'

interface DataMethodSanity {
    _id: string
    name: string
    cost: number[]
    receive: number[]
}

const Dashboard = () => {
    const { width } = useWindowSize()
    const { userProfile } = useAuth()
    const { kindSpending } = useConfig()
    const [data, setData] = useState<{ recent: RecentData[]; method: MethodData[] }>({
        recent: [],
        method: [],
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                if (_.isEmpty(kindSpending)) return

                const res: { recent: RecentData[]; method: DataMethodSanity[] } = await client.fetch(
                    `
                        {
                            "recent": ${GET_RECENT_SPENDING},
                            "method": ${GET_METHOD_SPENDING(kindSpending)}
                        }
                    `,
                    { userId: userProfile?._id }
                )

                setData({
                    recent: res.recent,
                    method: res.method.map(({ cost, receive, ...data }) => ({
                        ...data,
                        cost: _.isEmpty(cost) ? 0 : cost.reduce((a, b) => a + b, 0),
                        receive: _.isEmpty(receive) ? 0 : receive.reduce((a, b) => a + b, 0),
                    })),
                })
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])

    return (
        <>
            {width < 1280 && (
                <div className='xl:hidden block'>
                    <ButtonMenu data={menuMobile} />
                </div>
            )}

            <Divider className='xl:hidden py-6' />

            <Transaction>
                <div className='xl:space-y-6 space-y-4'>
                    <Transaction.Box title='Giao dịch gần đây' to='transaction'>
                        <Recent data={data.recent} loading={loading} />
                    </Transaction.Box>
                </div>
                <div className='xl:space-y-6 space-y-4'>
                    <Transaction.Box title='Phương thức thanh toán' to='method'>
                        <Method data={data.method} loading={loading} />
                    </Transaction.Box>
                </div>
            </Transaction>
        </>
    )
}

export default Dashboard
