import { ChartPieIcon, CurrencyDollarIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { get, sumBy } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Paper, ProgressLine, Transaction } from '~/components'
import Title from '~/components/Box/Title'
import Atom from '~/components/_atomic/Atom'
import Template from '~/components/_atomic/Template'
import LANGUAGE from '~/i18n/language/key'
import { getLinkSpending } from '~/utils'
import useBudgetDetailCategory, { BudgetCategoryDetail } from '../hook/useBudgetDetailCategory'

const BudgetDetailCategory = () => {
    const { t } = useTranslation()
    const {
        data: { budget },
        refetch,
    } = useBudgetDetailCategory()

    return (
        <Transaction hasBack title={t(LANGUAGE.BUDGET_BY_CATEGORY)}>
            <Content data={budget.data} loading={budget.loading} reload={refetch} />
        </Transaction>
    )
}

interface Props {
    data: BudgetCategoryDetail | undefined
    loading: boolean
    reload: () => void
}

const Content: React.FC<Props> = (props) => {
    const { data, loading, reload } = props
    const { t } = useTranslation()

    // if (loading) return <LoadingText />

    if (!data) return <></>

    return (
        <div className='mt-5 flex flex-col gap-8 text-gray-900 dark:text-slate-200 sm:gap-4 lg:flex-row'>
            <div className='flex-1'>
                <div className='sticky top-20'>
                    <Title title={t(LANGUAGE.PROGRESS)} onReload={reload} loading={loading} />
                    <Paper>
                        <Progress data={data} />
                    </Paper>
                </div>
            </div>
            <div className='flex-1'>
                <Title title={t(LANGUAGE.TRANSACTION)} onReload={reload} loading={loading} />
                <Paper disabledPadding>
                    <Template.RecentList
                        data={data.spending}
                        // fallback={<Empty icon={ArchiveBoxXMarkIcon} text={t(LANGUAGE.EMPTY_DATA)} />}
                        getItemKey={(item) => get(item, '_id')}
                        getItemLink={(item) => getLinkSpending(get(item, 'kindSpending.key'), get(item, '_id'))}
                        renderDate={(item) => <Atom.Date date={get(item, 'date')} fallback={<></>} />}
                        renderMethod={(item) => (
                            <Atom.Title title={get(item, 'methodSpending.name')} fallback={<></>} />
                        )}
                        renderAmount={(item) => <Atom.Amount amount={get(item, 'amount')} className='text-red-500' />}
                        renderCategory={(item) => <Atom.Title title={get(item, 'categorySpending.name')} />}
                        renderDescription={(item) => <Atom.Description data={get(item, 'description')} />}
                    />
                </Paper>
            </div>
        </div>
    )
}

interface ProgressProps {
    data: BudgetCategoryDetail
}

const Progress: React.FC<ProgressProps> = (props) => {
    const { data } = props
    const { t } = useTranslation()

    const { percent, bgColor, color, amounts } = useMemo(() => {
        let bgColor = 'rgb(16, 185, 129)',
            color = 'text-green-500'

        if (!data || !data.spending) {
            return { percent: 0, bgColor, color }
        }

        const amounts = sumBy(data.spending, ({ amount }) => amount)

        const percent = Array.isArray(data.spending) ? (amounts * 100) / data.amount : 0

        if (percent > 30) {
            bgColor = 'rgb(245, 158, 11)'
            color = 'text-yellow-500'
        }

        if (percent > 50) {
            bgColor = 'rgb(249, 115, 22)'
            color = 'text-orange-500'
        }

        if (percent > 75) {
            bgColor = 'red'
            color = 'text-red-500'
        }

        if (percent >= 100) {
            bgColor = 'rgb(168, 85, 247)'
            color = 'text-purple-500'
        }

        return { percent, bgColor, color, amounts }
    }, [data])

    return (
        <Fragment>
            <div className='flex items-end justify-between'>
                <h4 className='text-sm font-medium sm:text-base'>{data.categorySpending.name}</h4>
                <span className={clsx('text-sm font-normal transition sm:text-base', color)}>
                    {numeral(data.amount).format()}
                </span>
            </div>
            <ProgressLine data={[{ color: bgColor, percent }]} background={bgColor} className='my-1' />

            <div className='mt-10 grid select-none grid-cols-2 gap-4 sm:mt-8 sm:grid-cols-3'>
                <div
                    title={t(LANGUAGE.USAGE_PERCENT) as string}
                    className={clsx(
                        'flex flex-col items-center gap-1 rounded-md border border-gray-200 p-4 shadow-sm dark:border-current dark:shadow-current',
                        color
                    )}
                >
                    <ReceiptPercentIcon className='h-9 w-9' />
                    <p className='text-base sm:text-lg'>{numeral(percent).format()}%</p>
                </div>
                <div
                    title={t(LANGUAGE.TOTAL_COST) as string}
                    className='flex flex-col items-center gap-1 rounded-md border border-gray-200 p-4 text-radical-red-500 shadow-sm dark:border-radical-red-500 dark:shadow-radical-red-500'
                >
                    <CurrencyDollarIcon className='h-9 w-9' />
                    <p className='text-base sm:text-lg'>{numeral(amounts).format()}</p>
                </div>
                <div
                    title={t(LANGUAGE.AVERAGE_AMOUNT_REMAINING_FOR_MONTH) as string}
                    className='flex flex-col items-center gap-1 rounded-md border border-gray-200 p-4 text-yellow-500 shadow-sm dark:border-yellow-500 dark:shadow-yellow-500'
                >
                    <ChartPieIcon className='h-9 w-9' />
                    <p className='text-base sm:text-lg'>
                        {numeral(
                            (data.amount - (amounts ?? 0)) / moment().endOf('month').diff(moment(), 'days')
                        ).format()}
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default BudgetDetailCategory
