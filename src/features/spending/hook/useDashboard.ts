import { isEmpty, isNil, sum } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Data, DataStatistic } from '~/@types/hook'
import { DashboardQueryData } from '~/@types/spending'
import { DATE_FORMAT, TAGS } from '~/constant'
import { useCheck, useConfig } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import {
    GET_BUDGET_BY_MONTH,
    GET_METHOD_SPENDING_DESC_SURPLUS,
    GET_RECENT_SPENDING,
    GET_STATISTIC_SPENDING,
} from '~/schema/query/spending'
import { service } from '~/services'
import { useProfile } from '~/store/auth'

const useDashboard = (): [Data<DashboardQueryData>, () => void, DataStatistic | undefined] => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const { kindSpending, budgetSpending, getKindSpendingId, getKindSpendingIds } = useConfig()
    const budgetId = budgetSpending?._id

    const [data, fetchData, deleteCache, reload] = useQuery<DashboardQueryData>(
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
            startDate: service.getDateOfMonth('start'),
            endDate: service.getDateOfMonth('end'),
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
        const _data = data.statistic.data
        if (!Array.isArray(_data) || isNil(_data) || isEmpty(_data)) return
        const _ = _data.reduce(
            (result, value) => {
                return {
                    ...result,
                    [value.key]: sum(value.data),
                }
            },
            { cost: 0, receive: 0, loan: 0, 'get-loan': 0 }
        )
        const surplus = _.receive + _['get-loan'] - _.cost - _.loan

        return {
            dateRange: ['start', 'end'].map((value) =>
                moment(service.getDateOfMonth(value as any)).format(DATE_FORMAT.D_DATE)
            ),
            data: [
                {
                    _id: getKindSpendingId('RECEIVE') as string,
                    value: _.receive,
                    name: t(LANGUAGE.RECEIVE),
                    color: 'text-green-500',
                },
                {
                    _id: getKindSpendingId('COST') as string,
                    value: _.cost,
                    name: t(LANGUAGE.COST),
                    color: 'text-red-500',
                },
                {
                    _id: getKindSpendingId('GET_LOAN') as string,
                    value: _['get-loan'],
                    name: t(LANGUAGE.GET_LOAN),
                    color: 'text-orange-500',
                },
                {
                    _id: getKindSpendingId('LOAN') as string,
                    value: _.loan,
                    name: t(LANGUAGE.LOAN),
                    color: 'text-indigo-500',
                },
                {
                    _id: 'Surplus' as string,
                    value: surplus,
                    name: t(LANGUAGE.SURPLUS),
                    color: surplus >= 0 ? 'text-green-500' : 'text-red-500',
                },
            ],
        }
    }, [data.statistic.data, t])

    const handleReload = () => {
        const res = deleteCache('statistic', 'recent', 'method', 'budget')
        console.log(res)
        reload()
    }

    return [data, handleReload, dataStatistic]
}

export default useDashboard
