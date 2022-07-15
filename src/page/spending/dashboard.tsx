import _ from 'lodash'
import { useEffect, useMemo } from 'react'
import { RecentData } from '~/@types/spending'
import { Divider } from '~/components'
import { menuMobile } from '~/constant/components'
import { useConfig, useLoading } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import { F_GET_METHOD_SPENDING, GET_RECENT_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { sum } from '~/util'
import { ButtonMenu, Method, Recent, Transaction } from './components'

export interface DataMethodSanity {
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
    const { loading } = useLoading()
    const [{ method, recent }, fetchData, deleteCache, reload] = useQuery<{
        recent: RecentData[]
        method: DataMethodSanity[]
    }>(
        {
            recent: GET_RECENT_SPENDING,
            method: F_GET_METHOD_SPENDING(kindSpending),
        },
        { userId: userProfile?._id as string, from: 0, to: 5 }
    )
    useEffect(() => {
        if (!_.isEmpty(kindSpending) && !loading.submit) {
            fetchData()
        }
    }, [kindSpending, loading])

    const dataMethod = useMemo(() => {
        if (!method.data) return

        const methodMap = method.data.map(
            ({ cost, receive, 'transfer-from': transferFrom, 'transfer-to': transferTo, ...data }) => ({
                ...data,
                cost: sum([...cost, ...transferFrom]),
                receive: sum([...receive, ...transferTo]),
            })
        )

        return methodMap.length > 8 ? methodMap.filter((i) => i.receive !== i.cost) : methodMap
    }, [method.data])

    const handleReloadRecent = () => {
        const res = deleteCache('recent')
        console.log(res)
        reload()
    }

    const handleReloadMethod = () => {
        const res = deleteCache('method')
        console.log(res)
        reload()
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
                        loading={recent.loading}
                    >
                        <Recent data={recent.data} loading={recent.loading} />
                    </Transaction.Box>
                </div>
                <div className='xl:space-y-6 space-y-4'>
                    <Transaction.Box
                        title='Phương thức thanh toán'
                        to='method'
                        onReload={handleReloadMethod}
                        loading={method.loading}
                    >
                        <Method data={dataMethod} loading={method.loading} />
                    </Transaction.Box>
                </div>
            </Transaction>
        </>
    )
}

export default Dashboard
