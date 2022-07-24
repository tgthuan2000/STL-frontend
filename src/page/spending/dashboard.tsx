import _, { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { SpendingData, StatisticData } from '~/@types/spending'
import { Divider } from '~/components'
import { menuMobile } from '~/constant/components'
import { KIND_SPENDING } from '~/constant/spending'
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

interface IData {
    recent: SpendingData[]
    method: DataMethodSanity[]
    statistic: StatisticData[]
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
    const { kindSpending, getKindSpendingId } = useConfig()
    const [{ method, recent, statistic }, fetchData, deleteCache, reload] = useQuery<IData>(
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

    const dataStatistic = useMemo(() => {
        const data = statistic.data
        if (!data || isEmpty(data)) return
        const _ = data.reduce(
            (result, value) => {
                return {
                    ...result,
                    [value.key]: sum(value.data),
                }
            },
            { 'transfer-to': 0, 'transfer-from': 0, cost: 0, receive: 0 }
        )
        const surplus = _.receive + _['transfer-to'] - _.cost - _['transfer-from']
        return {
            dateRange: ['start', 'end'].map((value) => moment(getDate(value as any)).format('DD/MM/YYYY')),
            data: [
                {
                    _id: getKindSpendingId('RECEIVE') as string,
                    value: _.receive + _['transfer-to'],
                    name: 'Thu nhập',
                    color: 'text-green-500',
                },
                {
                    _id: getKindSpendingId('COST') as string,
                    value: _.cost + _['transfer-from'],
                    name: 'Chi phí',
                    color: 'text-red-500',
                },
                {
                    _id: getKindSpendingId('TRANSFER_FROM') as string,
                    value: surplus,
                    name: 'Số dư',
                    color: surplus >= 0 ? 'text-green-500' : 'text-red-500',
                },
            ],
        }
    }, [statistic.data])

    const handleReload = (key: keyof IData) => {
        const res = deleteCache(key)
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
                    className='xl:col-span-2 col-span-1'
                    title={dataStatistic?.dateRange.join(' - ') || ' '}
                    onReload={() => handleReload('statistic')}
                    loading={statistic.loading}
                    seeMore={false}
                    fullWidth
                >
                    <Statistic data={dataStatistic?.data} loading={statistic.loading} />
                </Transaction.Box>
                <Transaction.Box
                    title='Giao dịch gần đây'
                    to='transaction'
                    onReload={() => handleReload('recent')}
                    loading={recent.loading}
                    fullWidth
                >
                    <Recent data={recent.data} loading={recent.loading} />
                </Transaction.Box>
                <Transaction.Box
                    title='Phương thức thanh toán'
                    to='method'
                    onReload={() => handleReload('method')}
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
