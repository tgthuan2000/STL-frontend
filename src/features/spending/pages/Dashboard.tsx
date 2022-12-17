import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { DashboardQueryData } from '~/@types/spending'
import { Box, ButtonMenu, Divider } from '~/components'
import { DATE_FORMAT } from '~/constant'
import { menuMobile } from '~/constant/components'
import { useConfig } from '~/context'
import { useScrollIntoView, useQuery, useWindowSize } from '~/hook'
import {
    GET_BUDGETS_BY_MONTH,
    GET_METHOD_SPENDING_DESC_SURPLUS,
    GET_RECENT_SPENDING,
    GET_STATISTIC_SPENDING,
} from '~/schema/query/spending'
import { getDateOfMonth } from '~/services'
import useAuth from '~/store/auth'
import { sum } from '~/services'
import { Budget, Method, Recent, Statistic } from '../components'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { width } = useWindowSize()
    const { userProfile } = useAuth()
    const navigate = useNavigate()
    const { kindSpending, budgetSpending, getKindSpendingId, getKindSpendingIds } = useConfig()
    const wrapRef = useScrollIntoView<HTMLDivElement>()
    const [{ method, recent, budget, statistic }, fetchData, deleteCache, reload] = useQuery<DashboardQueryData>(
        {
            recent: GET_RECENT_SPENDING,
            method: GET_METHOD_SPENDING_DESC_SURPLUS,
            budget: GET_BUDGETS_BY_MONTH,
            statistic: GET_STATISTIC_SPENDING,
        },
        {
            userId: userProfile?._id as string,
            kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
            from: 0,
            to: 5,
            startDate: getDateOfMonth('start'),
            endDate: getDateOfMonth('end'),
            budgetKind: getKindSpendingId('COST') as string,
            budgetId: budgetSpending._id as string,
        }
    )

    useEffect(() => {
        if (!isEmpty(kindSpending)) {
            fetchData()
        }
    }, [kindSpending])

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
            { cost: 0, receive: 0, loan: 0, 'get-loan': 0 }
        )
        const surplus = _.receive - _.cost
        return {
            dateRange: ['start', 'end'].map((value) => moment(getDateOfMonth(value as any)).format(DATE_FORMAT.D_DATE)),
            data: [
                {
                    _id: getKindSpendingId('RECEIVE') as string,
                    value: _.receive + _['get-loan'],
                    getLoan: _['get-loan'],
                    name: 'Thu nhập',
                    color: 'text-green-500',
                },
                {
                    _id: getKindSpendingId('COST') as string,
                    value: _.cost + _.loan,
                    name: 'Chi phí',
                    color: 'text-red-500',
                },
                {
                    _id: 'Surplus' as string,
                    value: surplus,
                    name: 'Số dư',
                    color: surplus >= 0 ? 'text-green-500' : 'text-red-500',
                },
            ],
        }
    }, [statistic.data])

    const handleReload = () => {
        const res = deleteCache('statistic', 'recent', 'method', 'budget')
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
                    className='xl:row-start-1 xl:col-start-1 xl:col-span-2 col-span-1'
                    title={dataStatistic?.dateRange.join(' - ') || ' '}
                    onReload={handleReload}
                    loading={statistic.loading}
                    seeMore={false}
                    fullWidth
                >
                    <Statistic data={dataStatistic?.data} loading={statistic.loading} />
                </Box.Content>

                <Box.Content
                    className='xl:row-start-2 xl:col-start-1 col-span-1'
                    title='Ngân sách'
                    to='budget'
                    onReload={handleReload}
                    loading={budget.loading}
                    fullWidth
                    seeMore={false}
                >
                    <Budget data={budget.data} loading={budget.loading} />
                </Box.Content>

                <Box.Content
                    className={clsx('xl:row-start-3 xl:col-start-1 col-span-1')}
                    title='Giao dịch gần đây'
                    to='transaction'
                    onReload={handleReload}
                    loading={recent.loading}
                    fullWidth
                >
                    <Recent data={recent.data} loading={recent.loading} />
                </Box.Content>

                <Box.Content
                    className='xl:row-start-2 xl:row-span-6 xl:col-start-2 col-span-1'
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
