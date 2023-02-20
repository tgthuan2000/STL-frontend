import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardQueryData } from '~/@types/spending'
import { Box, ButtonMenuDesktop, Divider, Transaction } from '~/components'
import { DATE_FORMAT, TAGS } from '~/constant'
import { menuMobile } from '~/constant/components'
import { useCheck, useConfig } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import {
    GET_BUDGET_BY_MONTH,
    GET_METHOD_SPENDING_DESC_SURPLUS,
    GET_RECENT_SPENDING,
    GET_STATISTIC_SPENDING,
} from '~/schema/query/spending'
import { getDateOfMonth, sum } from '~/services'
import { useProfile } from '~/store/auth'
import { BudgetCategory, BudgetMethod, Method, Recent, Statistic } from '../components'

const Dashboard = () => {
    const { width } = useWindowSize()
    const { userProfile } = useProfile()
    const { kindSpending, budgetSpending, getKindSpendingId, getKindSpendingIds } = useConfig()
    const budgetId = budgetSpending?._id
    const { t } = useTranslation()

    const [{ method, recent, budget, statistic }, fetchData, deleteCache, reload] = useQuery<DashboardQueryData>(
        {
            recent: GET_RECENT_SPENDING,
            method: GET_METHOD_SPENDING_DESC_SURPLUS,
            statistic: GET_STATISTIC_SPENDING,
            ...(budgetId && { budget: GET_BUDGET_BY_MONTH }),
        },
        {
            userId: userProfile?._id as string,
            kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
            from: 0,
            to: 5,
            startDate: getDateOfMonth('start'),
            endDate: getDateOfMonth('end'),
            budgetKind: getKindSpendingId('COST') as string,
            ...(budgetId && { budgetId }),
        },
        {
            recent: TAGS.ALTERNATE,
            method: TAGS.ALTERNATE,
            statistic: TAGS.ALTERNATE,
            ...(budgetId && { budget: TAGS.ALTERNATE }),
        }
    )

    useCheck(reload)

    useEffect(() => {
        if (!isEmpty(kindSpending)) {
            fetchData()
        }
    }, [kindSpending])

    const dataStatistic = useMemo(() => {
        const data = statistic.data
        if (!Array.isArray(data) || isNil(data) || isEmpty(data)) return
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
                    name: t(LANGUAGE.RECEIVE),
                    color: 'text-green-500',
                },
                {
                    _id: getKindSpendingId('COST') as string,
                    value: _.cost + _.loan,
                    name: t(LANGUAGE.COST),
                    color: 'text-red-500',
                },
                {
                    _id: 'Surplus' as string,
                    value: surplus,
                    name: t(LANGUAGE.SURPLUS),
                    color: surplus >= 0 ? 'text-green-500' : 'text-red-500',
                },
            ],
        }
    }, [statistic.data, t])

    const handleReload = () => {
        const res = deleteCache('statistic', 'recent', 'method', 'budget')
        console.log(res)
        reload()
    }

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.SPENDING)}>
            {width < 1280 && (
                <div className='block xl:hidden'>
                    <ButtonMenuDesktop data={menuMobile} />
                </div>
            )}

            <Divider className='py-6 xl:hidden' dashed />

            {/* Show analytics */}
            <Box>
                <Box.Content
                    className='col-span-1 xl:col-span-2 xl:col-start-1 xl:row-start-1'
                    title={dataStatistic?.dateRange.join(' - ') || ' '}
                    onReload={handleReload}
                    loading={statistic.loading}
                    seeMore={false}
                    fullWidth
                >
                    <Statistic data={dataStatistic?.data} loading={statistic.loading} />
                </Box.Content>

                <div className='col-span-1 flex flex-col gap-4 xl:col-start-1 xl:row-start-2 xl:gap-6'>
                    <Box.Content
                        title={t(LANGUAGE.BUDGET_BY_CATEGORY)}
                        onReload={handleReload}
                        loading={budget?.loading}
                        fullWidth
                        seeMore={false}
                    >
                        <BudgetCategory data={budget?.data} loading={Boolean(budget?.loading)} />
                    </Box.Content>

                    <Box.Content
                        title={t(LANGUAGE.BUDGET_BY_METHOD)}
                        onReload={handleReload}
                        loading={budget?.loading}
                        fullWidth
                        seeMore={false}
                    >
                        <BudgetMethod data={budget?.data} loading={Boolean(budget?.loading)} />
                    </Box.Content>
                </div>

                <div className='col-span-1 flex flex-col gap-4 xl:col-start-2 xl:row-start-2 xl:gap-6'>
                    <Box.Content
                        title={t(LANGUAGE.TRANSACTION_RECENT)}
                        to='transaction'
                        onReload={handleReload}
                        loading={recent.loading}
                        fullWidth
                    >
                        <Recent data={recent.data} loading={recent.loading} />
                    </Box.Content>

                    <Box.Content
                        title={t(LANGUAGE.METHOD_SPENDING)}
                        to='method'
                        onReload={handleReload}
                        loading={method.loading}
                        fullWidth
                    >
                        <Method data={method.data} loading={method.loading} />
                    </Box.Content>
                </div>
            </Box>
        </Transaction>
    )
}

export default Dashboard
