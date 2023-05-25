import { ChartPieIcon, CurrencyDollarIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { groupBy, merge, sumBy } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'
import { getBudgetProgressColor, getMonths } from '~/utils'
import { BudgetCategoryDetail } from './useBudgetDetail'
import { BudgetMethodDetail } from './budget-detail/useBudgetDetailMethod'

interface Charts {
    daily: { x: string; y: number }[]
    total: { x: string; y: number }[]
}

const useChart = (data: BudgetCategoryDetail | BudgetMethodDetail | undefined) => {
    const { t } = useTranslation()

    const { percent, amounts, progress, annotations } = useMemo(() => {
        if (!data?.spending) {
            return { percent: 0, amounts: 0 }
        }

        const amounts = sumBy(data.spending, ({ amount }) => amount)
        const percent = Array.isArray(data.spending) ? (amounts * 100) / data.amount : 0
        const annotations: ApexAnnotations = {
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
                        position: 'start',
                        textAnchor: 'start',
                    },
                },
            ],
        }

        return { percent, amounts, progress: [{ ...data, ...getBudgetProgressColor(percent), percent }], annotations }
    }, [data?.spending])

    const statistic = useMemo(() => {
        if (!data?.spending) {
            return []
        }

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
                id: 'AVERAGE_AMOUNT_REMAINING_FOR_MONTH',
                title: t(LANGUAGE.AVERAGE_AMOUNT_REMAINING_FOR_MONTH),
                className: 'text-yellow-500 dark:border-yellow-500',
                amount: ((data.amount ?? 0) - (amounts ?? 0)) / moment().endOf('month').diff(moment(), 'days'),
                suffix: undefined,
                Icon: ChartPieIcon,
            },
        ]
    }, [data?.spending, t])

    const charts = useMemo(() => {
        if (!data?.spending) {
            return
        }

        const grouped = groupBy(structuredClone(data.spending), (item) => item.date.split('T')[0])
        const result = Object.keys(merge(getMonths(), grouped)).reduce<Charts>(
            (result, key, index) => {
                const amount = grouped[key]?.reduce((acc, item) => acc + item.amount, 0) ?? 0

                result.daily.push({ x: key, y: amount })
                result.total.push({ x: key, y: (result.total[index - 1]?.y ?? 0) + amount })

                return result
            },
            { daily: [], total: [] }
        )

        return result
    }, [data?.spending])

    return { amounts, progress, annotations, charts, statistic }
}

export default useChart
