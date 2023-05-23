import { ChartPieIcon, CurrencyDollarIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { get, groupBy, sortBy, sumBy } from 'lodash'
import moment from 'moment'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimateWrap, Paper, ProgressLine } from '~/components'
import Title from '~/components/Box/Title'
import Atom from '~/components/_atomic/Atom'
import Template from '~/components/_atomic/Template'
import LANGUAGE from '~/i18n/language/key'
import { getLinkSpending } from '~/utils'
import { BudgetCategoryDetail } from '../hook/useBudgetDetailCategory'

const getColor = (percent: number) => {
    if (percent >= 100) {
        return { color: 'text-purple-500', bgColor: 'rgb(168, 85, 247)' }
    }
    if (percent > 75) {
        return { color: 'text-red-500', bgColor: 'red' }
    }
    if (percent > 50) {
        return { color: 'text-orange-500', bgColor: 'rgb(249, 115, 22)' }
    }
    if (percent > 30) {
        return { color: 'text-yellow-500', bgColor: 'rgb(245, 158, 11)' }
    }
    return { color: 'text-green-500', bgColor: 'rgb(16, 185, 129)' }
}

interface Props {
    data: BudgetCategoryDetail | undefined
    loading: boolean
    reload: () => void
}

const BudgetDetailCategoryContent: React.FC<Props> = (props) => {
    const { data, loading, reload } = props
    const { t } = useTranslation()

    const { percent, amounts, progress } = useMemo(() => {
        if (!data?.spending) {
            return { percent: 0, amounts: 0 }
        }

        const amounts = sumBy(data.spending, ({ amount }) => amount)
        const percent = Array.isArray(data.spending) ? (amounts * 100) / data.amount : 0

        return { percent, amounts, progress: [{ ...data, ...getColor(percent), percent }] }
    }, [data?.spending])

    const statistic = useMemo(() => {
        if (!data?.spending) {
            return []
        }

        return [
            {
                id: 'USAGE_PERCENT',
                title: t(LANGUAGE.USAGE_PERCENT),
                className: clsx('dark:border-current dark:shadow-current', getColor(percent).color),
                amount: percent,
                suffix: '%',
                Icon: ReceiptPercentIcon,
            },
            {
                id: 'TOTAL_COST',
                title: t(LANGUAGE.TOTAL_COST),
                className: 'text-radical-red-500 dark:border-radical-red-500 dark:shadow-radical-red-500',
                amount: amounts,
                suffix: undefined,
                Icon: CurrencyDollarIcon,
            },
            {
                id: 'AVERAGE_AMOUNT_REMAINING_FOR_MONTH',
                title: t(LANGUAGE.AVERAGE_AMOUNT_REMAINING_FOR_MONTH),
                className: 'text-yellow-500 dark:border-yellow-500 dark:shadow-yellow-500',
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
        const result = Object.keys(grouped).map((key) => ({
            x: key,
            y: grouped[key].reduce((acc, item) => acc + item.amount, 0),
        }))

        return sortBy(result, (item) => item.x)
    }, [data])

    return (
        <div className='mt-5 flex flex-col gap-8 sm:gap-4 lg:flex-row'>
            <div className='flex-[1.25]'>
                <div className='sticky top-20'>
                    <Title title={t(LANGUAGE.PROGRESS)} onReload={reload} loading={loading} />
                    <Paper className='space-y-8 sm:space-y-5'>
                        <AnimateWrap className='-mx-2'>
                            <Template.BudgetList
                                data={progress}
                                loading={loading}
                                loadingFallback={<Atom.BudgetListSkeleton elNumber={1} />}
                                getItemKey={(item) => get(item, '_id')}
                                renderAmount={(item) => (
                                    <Atom.Amount amount={get(item, 'amount')} className={get(item, 'color')} />
                                )}
                                renderProgress={(item) => (
                                    <ProgressLine
                                        data={[{ color: get(item, 'bgColor'), percent: get(item, 'percent') }]}
                                        background={get(item, 'bgColor')}
                                    />
                                )}
                                renderTitle={(item) => <Atom.Title title={get(item, 'categorySpending.name')} />}
                            />
                        </AnimateWrap>

                        <AnimateWrap>
                            <Template.SmallStatisticList
                                data={statistic}
                                loading={loading}
                                loadingFallback={<Atom.SmallStatisticListSkeleton elNumber={6} />}
                                getItemKey={(item) => get(item, 'id')}
                                getClassName={(item) => get(item, 'className')}
                                getIcon={(item) => get(item, 'Icon')}
                                renderAmount={(item) => (
                                    <Atom.Amount
                                        amount={get(item, 'amount')}
                                        suffix={get(item, 'suffix')}
                                        className='text-base sm:text-lg'
                                    />
                                )}
                                renderTitle={(item) => get(item, 'title')}
                            />
                        </AnimateWrap>

                        <Template.TransactionChart data={charts} />
                    </Paper>
                </div>
            </div>
            <div className='flex-1'>
                <Title title={t(LANGUAGE.TRANSACTION)} onReload={reload} loading={loading} />
                <Paper disabledPadding>
                    <AnimateWrap>
                        <Template.RecentList
                            data={data?.spending}
                            loading={loading}
                            fallback={<Atom.EmptyList />}
                            loadingFallback={<Atom.RecentListSkeleton elNumber={7} />}
                            getItemKey={(item) => get(item, '_id')}
                            getItemLink={(item) => getLinkSpending(get(item, 'kindSpending.key'), get(item, '_id'))}
                            renderDate={(item) => <Atom.Date date={get(item, 'date')} fallback={<></>} />}
                            renderMethod={(item) => (
                                <Atom.Title title={get(item, 'methodSpending.name')} fallback={<></>} />
                            )}
                            renderAmount={(item) => (
                                <Atom.Amount amount={get(item, 'amount')} className='text-red-500' />
                            )}
                            renderCategory={(item) => <Atom.Title title={get(item, 'categorySpending.name')} />}
                            renderDescription={(item) => <Atom.Description data={get(item, 'description')} />}
                        />
                    </AnimateWrap>
                </Paper>
            </div>
        </div>
    )
}

export default memo(BudgetDetailCategoryContent)
