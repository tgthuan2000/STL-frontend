import {
    CalendarDaysIcon,
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
import { DataChart, Series } from '~/@types/components'
import { DATE_FORMAT } from '~/constant'
import { colors } from '~/constant/template'
import LANGUAGE from '~/i18n/language/key'
import { getBudgetProgressColorRevert } from '~/utils'
import { LongBudgetDetail, LongBudgetDetailItem } from './useLongBudgetDetail'

const { text, bg } = colors

interface Note {
    id: string
    methodName: string
    bgColor: string
    percent: number
    amount: number
}

const useLongBudgetChart = (data: LongBudgetDetail | undefined) => {
    const { t } = useTranslation()

    const { percent, amounts, progress, notes, group } = useMemo(() => {
        if (!data?.items || !Array.isArray(data.items)) {
            return { percent: 0, amounts: 0, progress: [] }
        }

        const amounts = sumBy(data.items, ({ amount }) => amount)
        const percent = (amounts * 100) / data.amount
        const group = groupBy(structuredClone(data.items), (item) => item.method._id)

        const { notes, items } = Object.keys(group).reduce<{ items: LongBudgetDetailItem[]; notes: Note[] }>(
            (result, key, index) => {
                const bgColor = bg[index % bg.length]
                const _group = group[key]

                const { items, note } = _group.reduce<{
                    items: Array<LongBudgetDetailItem & { percent: number; bgColor: string }>
                    note: { percent: number; amount: number }
                }>(
                    (result, item) => {
                        const percent = (item.amount * 100) / data.amount

                        result.items.push({ ...item, percent, bgColor })
                        result.note.percent += percent
                        result.note.amount += item.amount

                        return result
                    },
                    { items: [], note: { percent: 0, amount: 0 } }
                )

                result.items.push(...items)
                result.notes.push({ id: key, methodName: _group[0].method.name, bgColor, ...note })
                return result
            },
            { items: [], notes: [] }
        )

        return {
            group,
            percent,
            amounts,
            notes,
            progress: [{ ...data, items, color: 'text-pink-500', bgColor: 'rgb(236, 72, 153)', percent }],
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
        if (!data?.items || !group) {
            const defaultFnc = () => []
            return { daily: defaultFnc, total: defaultFnc }
        }

        const daily = Object.keys(group).reduce<Series[]>((result, key, index) => {
            const color = bg[index % bg.length]
            const methods = group[key]
            const dataDaily = methods.reduce<DataChart[]>((result, method) => {
                const { _createdAt, amount } = method
                const x = moment(_createdAt).format(DATE_FORMAT.D_DATE)

                result.push({ x, y: amount })

                return result
            }, [])

            result.push({ data: dataDaily, name: methods[0].method.name, color })

            return result
        }, [])
        console.log(daily)
        return {
            daily,
            total: [],
        }
    }, [data?.items, group])

    return { progress, amounts, statistic, charts, notes }
}

export default useLongBudgetChart
