import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { IMethodSpending, ISpendingData, IStatisticData } from '~/@types/spending'
import { Box, ButtonMenu, Divider } from '~/components'
import { DATE_FORMAT } from '~/constant'
import { menuMobile } from '~/constant/components'
import { useConfig } from '~/context'
import { useScrollIntoView, useQuery, useWindowSize } from '~/hook'
import { GET_METHOD_SPENDING_DESC_SURPLUS, GET_RECENT_SPENDING, GET_STATISTIC_SPENDING } from '~/schema/query/spending'
import { getDate } from '~/services'
import useAuth from '~/store/auth'
import { sum } from '~/services'
import { Method, Recent, Statistic } from '../components'

interface IData {
    recent: ISpendingData[]
    method: IMethodSpending[]
    statistic: IStatisticData[]
}

// const F_GET_METHOD_SPENDING = (kindSpending: any[]) => `
//     *[_type == "methodSpending"]
//     {
//         _id,
//         name,
//         user-> {
//             userName
//         },
//         ${kindSpending
//             .map(
//                 ({ _id, key }) =>
//                     `"${key}": *[_type == "spending" && methodSpending._ref == ^._id && kindSpending._ref == "${_id}"].amount`
//             )
//             .join(',')}
//     }
// `

const Dashboard = () => {
    const { width } = useWindowSize()
    const { userProfile } = useAuth()
    const { kindSpending, getKindSpendingId, getKindSpendingIds } = useConfig()
    const wrapRef = useScrollIntoView<HTMLDivElement>()
    const [{ method, recent, statistic }, fetchData, deleteCache, reload] = useQuery<IData>(
        {
            recent: GET_RECENT_SPENDING,
            method: GET_METHOD_SPENDING_DESC_SURPLUS,
            // method: F_GET_METHOD_SPENDING(kindSpending),
            statistic: GET_STATISTIC_SPENDING,
        },
        {
            userId: userProfile?._id as string,
            kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
            from: 0,
            to: 5,
            startDate: getDate('start'),
            endDate: getDate('end'),
        }
    )
    useEffect(() => {
        if (!isEmpty(kindSpending)) {
            fetchData()
        }
    }, [kindSpending])

    // const dataMethod = useMemo(() => {
    //     if (!method.data) return

    //     const methodMap = (method.data as any[]).map(
    //         ({ cost, receive, 'transfer-from': transferFrom, 'transfer-to': transferTo, ...data }) => ({
    //             ...data,
    //             cost: sum([...cost, ...transferFrom]),
    //             receive: sum([...receive, ...transferTo]),
    //         })
    //     )

    //     return methodMap
    // }, [method.data])

    // console.log(dataMethod?.map((d) => ({ data: d.receive - d.cost, name: d.name, userName: d.user.userName })))

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
            { cost: 0, receive: 0 }
        )
        const surplus = _.receive - _.cost
        return {
            dateRange: ['start', 'end'].map((value) => moment(getDate(value as any)).format(DATE_FORMAT.D_DATE)),
            data: [
                {
                    _id: getKindSpendingId('RECEIVE') as string,
                    value: _.receive,
                    name: 'Thu nhập',
                    color: 'text-green-500',
                },
                {
                    _id: getKindSpendingId('COST') as string,
                    value: _.cost,
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

    const handleReload = () => {
        const res = deleteCache('statistic', 'recent', 'method')
        console.log(res)
        reload()
    }

    return (
        <div ref={wrapRef}>
            {width < 1280 && (
                <div className='xl:hidden block'>
                    <ButtonMenu data={menuMobile} />
                </div>
            )}

            <Divider className='xl:hidden py-6' dashed />

            {/* Show analytics */}
            <Box>
                <Box.Content
                    className='xl:col-span-2 col-span-1'
                    title={dataStatistic?.dateRange.join(' - ') || ' '}
                    onReload={handleReload}
                    loading={statistic.loading}
                    seeMore={false}
                    fullWidth
                >
                    <Statistic data={dataStatistic?.data} loading={statistic.loading} />
                </Box.Content>
                <Box.Content
                    title='Giao dịch gần đây'
                    to='transaction'
                    onReload={handleReload}
                    loading={recent.loading}
                    fullWidth
                >
                    <Recent data={recent.data} loading={recent.loading} />
                </Box.Content>
                <Box.Content
                    title='Phương thức thanh toán'
                    to='method'
                    onReload={handleReload}
                    loading={method.loading}
                    fullWidth
                >
                    <Method data={method.data} loading={method.loading} />
                </Box.Content>
            </Box>
        </div>
    )
}

export default Dashboard
