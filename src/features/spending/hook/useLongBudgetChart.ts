import {
    CalendarDaysIcon,
    CalendarIcon,
    ChartPieIcon,
    CurrencyDollarIcon,
    PowerIcon,
    ReceiptPercentIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { groupBy, sumBy } from 'lodash'
import moment from 'moment'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '~/constant/template'
import LANGUAGE from '~/i18n/language/key'
import { getBudgetProgressColorRevert } from '~/utils'
import { LongBudgetDetail, LongBudgetDetailItem } from './useLongBudgetDetail'

const { text, bg } = colors

interface Note {
    id: string
    methodName: string
    bgColor: string
}

const useLongBudgetChart = (data: LongBudgetDetail | undefined) => {
    const { t } = useTranslation()

    const { percent, amounts, progress, notes } = useMemo(() => {
        if (!data?.items || !Array.isArray(data.items)) {
            return { percent: 0, amounts: 0, progress: [] }
        }

        const amounts = sumBy(data.items, ({ amount }) => amount)
        const percent = (amounts * 100) / data.amount
        const group = groupBy(data.items, (item) => item.method._id)

        const { notes, items } = Object.keys(group).reduce<{ items: LongBudgetDetailItem[]; notes: Note[] }>(
            (result, key, index) => {
                const bgColor = bg[index % bg.length]
                const _group = group[key]

                result.items.push(
                    ..._group.map((item) => ({ ...item, percent: (item.amount * 100) / data.amount, bgColor }))
                )
                result.notes.push({ id: key, methodName: _group[0].method.name, bgColor })
                return result
            },
            { items: [], notes: [] }
        )

        return {
            percent,
            amounts,
            notes,
            progress: [{ ...data, items, color: 'text-purple-500', bgColor: 'rgb(168, 85, 247)', percent }],
        }
    }, [data?.items])

    const statistic = useMemo(() => {
        if (!data?.items) {
            return []
        }

        const remainingDays = moment(data.duration).diff(moment(), 'days')
        const remainingMonths = moment(data.duration).diff(moment(), 'months')

        let avgAmountPerMonth = ((data.amount ?? 0) - (amounts ?? 0)) / (remainingMonths || 1)
        avgAmountPerMonth = avgAmountPerMonth <= 0 ? 0 : avgAmountPerMonth

        let avgAmountPerDay = ((data.amount ?? 0) - (amounts ?? 0)) / (remainingDays || 1)
        avgAmountPerDay = avgAmountPerDay <= 0 ? 0 : avgAmountPerDay

        return [
            {
                id: 'PERCENTAGE',
                type: 'number',
                title: t(LANGUAGE.PERCENTAGE),
                className: clsx('dark:border-current', getBudgetProgressColorRevert(percent).color),
                value: percent,
                suffix: '%',
                Icon: ReceiptPercentIcon,
            },
            {
                id: 'TOTAL_RECEIVE',
                type: 'number',
                title: t(LANGUAGE.TOTAL_RECEIVE),
                className: 'text-green-500 dark:border-green-500',
                value: amounts,
                suffix: undefined,
                Icon: CurrencyDollarIcon,
            },
            {
                id: 'AVERAGE_AMOUNT_REMAINING_PER_MONTH',
                type: 'number',
                title: t(LANGUAGE.AVERAGE_AMOUNT_REMAINING),
                className: 'text-yellow-500 dark:border-yellow-500',
                value: avgAmountPerMonth,
                suffix: '/' + t(LANGUAGE.L_MONTHS),
                Icon: ChartPieIcon,
            },
            {
                id: 'AVERAGE_AMOUNT_REMAINING_PER_DAY',
                type: 'number',
                title: t(LANGUAGE.AVERAGE_AMOUNT_REMAINING),
                className: 'text-orange-500 dark:border-orange-500',
                value: avgAmountPerDay,
                suffix: '/' + t(LANGUAGE.L_DAYS),
                Icon: ChartPieIcon,
            },
            {
                id: 'REMAINING',
                type: 'number',
                title: t(LANGUAGE.REMAINING),
                className: 'text-gray-500 dark:text-slate-300 dark:border-slate-300',
                value: remainingDays,
                suffix: ` ${t(LANGUAGE.L_DAYS)}`,
                Icon: CalendarDaysIcon,
            },
            {
                id: 'DURATION',
                type: 'date',
                title: t(LANGUAGE.DURATION),
                className: 'text-radical-red-500 dark:border-radical-red-500',
                value: data.duration,
                suffix: undefined,
                Icon: PowerIcon,
            },
        ]
    }, [data?.items, t])

    const charts = useMemo(() => {
        if (!data?.items) {
            return { daily: [], total: [] }
        }

        const group = groupBy(structuredClone(data.items), (item) => item._createdAt.split('T')[0])

        console.log(group)

        return { daily: [], total: [] }
    }, [data?.items])

    return { progress, amounts, statistic, charts, notes }
}

export default useLongBudgetChart
