import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ErrorText, Paper, ProgressLine, Transaction } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { DATE_FORMAT } from '~/constant'
import LANGUAGE from '~/i18n/language/key'
import { getLinkSpending } from '~/utils'
import useBudgetDetailCategory, { BudgetCategoryDetail } from '../hook/useBudgetDetailCategory'
import { sumBy } from 'lodash'
import Title from '~/components/Box/Title'
import { Fragment, useMemo } from 'react'
import { ChartPieIcon, ClockIcon, CurrencyDollarIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline'

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
                    <ul role='list' className='divide-y divide-gray-100 dark:divide-slate-700 sm:divide-gray-200'>
                        {Array.isArray(data.spending) &&
                            data.spending.map((item) => {
                                const {
                                    _id,
                                    amount,
                                    date,
                                    kindSpending,
                                    methodSpending,
                                    description,
                                    categorySpending,
                                } = item

                                return (
                                    <li key={_id}>
                                        <Link
                                            to={getLinkSpending(kindSpending.key, _id)}
                                            state={{ status: kindSpending._id }}
                                            className='flex cursor-pointer flex-col px-3 py-2 hover:opacity-70'
                                        >
                                            <div className='flex'>
                                                <div className='w-1/2 overflow-hidden xl:w-2/3'>
                                                    <span>{moment(date).format(DATE_FORMAT.D_DATE_TIME)}</span>
                                                    <h3 className='truncate font-medium'>{methodSpending.name}</h3>
                                                </div>
                                                <div className='w-1/2 overflow-hidden text-right xl:w-1/3'>
                                                    <span className='flex items-center justify-end gap-x-2'>
                                                        <h4 className={clsx('truncate font-medium')}>
                                                            {categorySpending.name}
                                                        </h4>
                                                    </span>

                                                    <span className='font-medium text-red-500'>
                                                        {numeral(amount).format()}
                                                    </span>
                                                </div>
                                            </div>
                                            {description && (
                                                <span title={description}>
                                                    {description.split('\n').map((line, index) => (
                                                        <span key={index} className='block w-full truncate'>
                                                            {line}
                                                        </span>
                                                    ))}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                )
                            })}
                    </ul>
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
