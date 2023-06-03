import { CalendarDaysIcon, ChartPieIcon, CurrencyDollarIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { groupBy, merge, sumBy } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'
import { getBudgetProgressColor, getMonths } from '~/utils'
import { BudgetCategoryDetail, BudgetMethodDetail } from './useBudgetDetail'
import { DATE_FORMAT } from '~/constant'
import { DataChart, Series } from '~/@types/components'
import { getSeriesOption } from '~/components/_atomic/Template/Chart'

interface Chart {
    daily: DataChart[]
    total: DataChart[]
}

type generateDataType = (data: DataChart[]) => (options?: getSeriesOption) => Series[]

const generateData: generateDataType = (data) => {
    const dark = 'rgb(34, 211, 238)' //text-cyan-400
    const light = 'rgb(99, 102, 241)' // text-indigo-500

    return (options) => {
        if (!options) {
            options = {
                darkTheme: false,
            }
        }

        const { darkTheme } = options

        return [{ data, color: darkTheme ? dark : light }]
    }
}

const useBudgetChart = (data: BudgetCategoryDetail | BudgetMethodDetail | undefined) => {
    const { t } = useTranslation()

    const { percent, amounts, progress } = useMemo(() => {
        if (!data?.spending) {
            return { percent: 0, amounts: 0, progress: [] }
        }

        const amounts = sumBy(data.spending, ({ amount }) => amount)
        const percent = Array.isArray(data.spending) ? (amounts * 100) / data.amount : 0

        return {
            percent,
            amounts,
            progress: [{ ...data, ...getBudgetProgressColor(percent), percent }],
        }
    }, [data?.spending])

    const annotations = useMemo(() => {
        if (!data?.amount) {
            return { avg: {}, total: {} }
        }

        const avgAmount = Math.round(data.amount / moment().daysInMonth())

        const avgAnnotations: ApexAnnotations = {
            yaxis: [
                {
                    y: avgAmount,
                    borderColor: 'rgb(249, 115, 22)',
                    borderWidth: 2,
                    strokeDashArray: 0,
                    label: {
                        borderColor: 'transparent',
                        style: {
                            background: 'rgb(249, 115, 22)',
                            color: '#fff',
                            cssClass: 'font-normal text-xs',
                        },
                        text: numeral(avgAmount).format(),
                        position: 'left',
                        textAnchor: 'start',
                    },
                },
            ],
        }

        const totalAnnotations: ApexAnnotations = {
            yaxis: [
                {
                    y: data.amount,
                    borderColor: 'rgb(255, 51, 85)',
                    borderWidth: 2,
                    strokeDashArray: 0,
                    label: {
                        borderColor: 'transparent',
                        style: {
                            background: 'transparent',
                            color: 'rgb(255, 51, 85)',
                            cssClass: 'font-normal text-xs',
                        },
                        text: numeral(data.amount).format(),
                        position: 'left',
                        textAnchor: 'start',
                    },
                },
            ],
        }

        return { avg: avgAnnotations, total: totalAnnotations }
    }, [data?.amount])

    const statistic = useMemo(() => {
        if (!data?.spending) {
            return []
        }

        const remainingDays = moment().endOf('month').diff(moment(), 'days')

        return [
            {
                id: 'USAGE_PERCENT',
                title: t(LANGUAGE.USAGE_PERCENT),
                className: clsx('dark:border-current', getBudgetProgressColor(percent).color),
                amount: percent,
                suffix: '%',
                Icon: ReceiptPercentIcon,
            },
            {
                id: 'TOTAL_COST',
                title: t(LANGUAGE.TOTAL_COST),
                className: 'text-radical-red-500 dark:border-radical-red-500',
                amount: amounts,
                suffix: undefined,
                Icon: CurrencyDollarIcon,
            },
            {
                id: 'AVERAGE_AMOUNT_REMAINING',
                title: t(LANGUAGE.AVERAGE_AMOUNT_REMAINING),
                className: 'text-yellow-500 dark:border-yellow-500',
                amount: ((data.amount ?? 0) - (amounts ?? 0)) / (remainingDays || 1),
                suffix: '/' + t(LANGUAGE.L_DAYS),
                Icon: ChartPieIcon,
            },
            {
                id: 'REMAINING',
                title: t(LANGUAGE.REMAINING),
                className: 'text-gray-500 dark:text-slate-300 dark:border-slate-300',
                amount: remainingDays,
                suffix: ' ' + t(LANGUAGE.L_DAYS),
                Icon: CalendarDaysIcon,
            },
        ]
    }, [data?.spending, t])

    const charts = useMemo(() => {
        if (!data?.spending) {
            const defaultFnc = () => []
            return { daily: defaultFnc, total: defaultFnc }
        }

        const group = groupBy(structuredClone(data.spending), (item) => moment(item.date).format(DATE_FORMAT.D_DATE))
        const { daily, total } = Object.keys(merge(getMonths(), group)).reduce<Chart>(
            (result, key, index) => {
                const amount = group[key]?.reduce((acc, item) => acc + item.amount, 0) ?? 0

                result.daily.push({ x: key, y: amount })
                result.total.push({ x: key, y: (result.total[index - 1]?.y ?? 0) + amount })

                return result
            },
            { daily: [], total: [] }
        )

        return { daily: generateData(daily), total: generateData(total) }
    }, [data?.spending])

    return { amounts, progress, annotations, charts, statistic }
}

export default useBudgetChart
