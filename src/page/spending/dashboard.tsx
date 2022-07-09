import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { getEnvironmentData } from 'worker_threads'
import { MethodData, RecentData } from '~/@types/spending'
import { Divider } from '~/components'
import { menuMobile } from '~/constant/components'
import { useConfig, useCache } from '~/context'
import { useWindowSize } from '~/hook'
import { F_GET_METHOD_SPENDING, GET_RECENT_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { sum } from '~/util'
import { ButtonMenu, Method, Recent, Transaction } from './components'

interface DataMethodSanity {
    _id: string
    name: string
    cost: number[]
    receive: number[]
    'transfer-from': number[]
    'transfer-to': number[]
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
    const { fetchApi, deleteCache } = useCache()

    const getData = useCallback(async () => {
        setLoading(true)

        try {
            if (_.isEmpty(kindSpending)) return

            const params = { userId: userProfile?._id }
            const res = await fetchApi<{ recent: RecentData[]; method: DataMethodSanity[] }>(
                { recent: GET_RECENT_SPENDING, method: F_GET_METHOD_SPENDING(kindSpending) },
                params
            )

            setData({
                recent: res.recent,
                method: _.isEmpty(res.method)
                    ? []
                    : res.method.map(
                          ({ cost, receive, 'transfer-from': transferFrom, 'transfer-to': transferTo, ...data }) => ({
                              ...data,
                              cost: sum([...cost, ...transferFrom]),
                              receive: sum([...receive, ...transferTo]),
                          })
                      ),
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [kindSpending])

    useEffect(() => {
        getData()
    }, [getData])

    const handleReloadRecent = async () => {
        const result = await deleteCache([
            {
                recent: GET_RECENT_SPENDING,
                params: { userId: userProfile?._id },
            },
        ])
        console.log(result)
        // --------------------------------------------------
        setLoading(true)
        try {
            const params = { userId: userProfile?._id }
            const res = await fetchApi<{ recent: RecentData[] }>({ recent: GET_RECENT_SPENDING }, params)

            setData((prev) => ({
                ...prev,
                recent: res.recent,
            }))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleReloadMethod = async () => {
        const result = await deleteCache([
            {
                method: F_GET_METHOD_SPENDING(kindSpending),
                params: { userId: userProfile?._id },
            },
        ])
        console.log(result)
        // --------------------------------------------------
        setLoading(true)
        try {
            const params = { userId: userProfile?._id }
            const res = await fetchApi<{ method: DataMethodSanity[] }>(
                { method: F_GET_METHOD_SPENDING(kindSpending) },
                params
            )

            setData((prev) => ({
                ...prev,
                method: _.isEmpty(res.method)
                    ? []
                    : res.method.map(
                          ({ cost, receive, 'transfer-from': transferFrom, 'transfer-to': transferTo, ...data }) => ({
                              ...data,
                              cost: sum([...cost, ...transferFrom]),
                              receive: sum([...receive, ...transferTo]),
                          })
                      ),
            }))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
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
                    <Transaction.Box
                        title='Giao dịch gần đây'
                        to='transaction'
                        onReload={handleReloadRecent}
                        loading={loading}
                    >
                        <Recent data={data.recent} loading={loading} />
                    </Transaction.Box>
                </div>
                <div className='xl:space-y-6 space-y-4'>
                    <Transaction.Box
                        title='Phương thức thanh toán'
                        to='method'
                        onReload={handleReloadMethod}
                        loading={loading}
                    >
                        <Method data={data.method} loading={loading} />
                    </Transaction.Box>
                </div>
            </Transaction>
        </>
    )
}

export default Dashboard
