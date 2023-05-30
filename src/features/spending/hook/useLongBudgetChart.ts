import { ChartPieIcon, CurrencyDollarIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline'
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
            progress: [{ ...data, items, ...getBudgetProgressColorRevert(percent), percent }],
        }
    }, [data?.items])

    const statistic = useMemo(() => {
        if (!data?.items) {
            return []
        }

        return [
            {
                id: 'PERCENTAGE',
                title: t(LANGUAGE.PERCENTAGE),
                className: clsx('dark:border-current', getBudgetProgressColorRevert(percent).color),
                amount: percent,
                suffix: '%',
                Icon: ReceiptPercentIcon,
            },
            {
                id: 'TOTAL_RECEIVE',
                title: t(LANGUAGE.TOTAL_RECEIVE),
                className: 'text-green-500 dark:border-green-500',
                amount: amounts,
                suffix: undefined,
                Icon: CurrencyDollarIcon,
            },
            {
                id: 'AVERAGE_AMOUNT_REMAINING',
                title: t(LANGUAGE.AVERAGE_AMOUNT_REMAINING),
                className: 'text-yellow-500 dark:border-yellow-500',
                amount: ((data.amount ?? 0) - (amounts ?? 0)) / moment(data.duration).diff(moment(), 'days'),
                suffix: undefined,
                Icon: ChartPieIcon,
            },
        ]
    }, [data?.items, t])

    const charts = useMemo(() => {
        if (!data?.items) {
            return { daily: [], total: [] }
        }

        return { daily: [], total: [] }
    }, [data?.items])

    return { progress, amounts, statistic, charts, notes }
}

export default useLongBudgetChart
