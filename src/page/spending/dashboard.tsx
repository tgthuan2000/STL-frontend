import _ from 'lodash'
import { useEffect, useMemo } from 'react'
import { SpendingData, StatisticData } from '~/@types/spending'
import { Divider } from '~/components'
import { menuMobile } from '~/constant/components'
import { useConfig } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import { F_GET_METHOD_SPENDING, GET_RECENT_SPENDING, GET_STATISTIC_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { sum } from '~/util'
import { ButtonMenu, Method, Recent, Statistic, Transaction } from './components'

export interface DataMethodSanity {
    _id: string
    name: string
    cost: number[]
    receive: number[]
    'transfer-from': number[]
    'transfer-to': number[]
}

const getDate = (type: 'start' | 'end' = 'start') => {
    const date = new Date()
    if (type === 'start') {
        return new Date(date.getFullYear(), date.getMonth(), 1).toISOString()
    }
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString()
}

const Dashboard = () => {
    const { width } = useWindowSize()
    const { userProfile } = useAuth()
    const { kindSpending } = useConfig()
    const [{ method, recent, statistic }, fetchData, deleteCache, reload] = useQuery<{
        recent: SpendingData[]
        method: DataMethodSanity[]
        statistic: StatisticData[]
    }>(
        {
            recent: GET_RECENT_SPENDING,
            method: F_GET_METHOD_SPENDING(kindSpending),
            statistic: GET_STATISTIC_SPENDING,
        },
        {
            userId: userProfile?._id as string,
            from: 0,
            to: 5,
            startDate: getDate('start'),
            endDate: getDate('end'),
        }
    )
    useEffect(() => {
        if (!_.isEmpty(kindSpending)) {
            fetchData()
        }
    }, [kindSpending])

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
                <Transaction.Box
                    className='col-span-2 xl:block hidden'
                    title='01 thg 7 2022 - 31 thg 7 2022'
                    onReload={() => {}}
                    loading={recent.loading}
                    seeMore={false}
                    fullWidth
                >
                    <Statistic data={statistic.data} loading={statistic.loading} />
                </Transaction.Box>
                <Transaction.Box
                    title='Giao dịch gần đây'
                    to='transaction'
                    onReload={handleReloadRecent}
                    loading={recent.loading}
                    fullWidth
                >
                    <Recent data={recent.data} loading={recent.loading} />
                </Transaction.Box>
                <Transaction.Box
                    title='Phương thức thanh toán'
                    to='method'
                    onReload={handleReloadMethod}
                    loading={method.loading}
                    fullWidth
                >
                    <Method data={dataMethod} loading={method.loading} />
                </Transaction.Box>
            </Transaction>
        </>
    )
}

export default Dashboard
