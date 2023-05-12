import clsx from 'clsx'
import { isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TableColumn } from '~/@types/components'
import { ISpendingData } from '~/@types/spending'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const getDate = (date: string, title: string, width: number) => {
    return width <= 900 ? (
        <>
            <span>{moment(date).format(DATE_FORMAT.D_DATE)}</span>
            <br />
            <span>{moment(date).format(DATE_FORMAT.TIME)}</span>
        </>
    ) : (
        <span>
            {title}: {moment(date).format(DATE_FORMAT.D_DATE_TIME)}
        </span>
    )
}

export const useColumns = (): Array<TableColumn<ISpendingData>> => {
    const { t } = useTranslation()
    const { width } = useWindowSize()

    const columns: Array<TableColumn<ISpendingData>> = useMemo(() => {
        return [
            {
                key: 'date',
                title: t(LANGUAGE.DATE),
                label: 'string',
                renderRow: ({ date, methodSpending, estimatePaidDate }) => (
                    <td className='whitespace-nowrap pt-3 pl-2 pr-3 text-xs sm:pl-3 sm:text-sm'>
                        {moment(date).format(DATE_FORMAT.TIME_DATE) !== 'Invalid date' && (
                            <span className='mt-1 block'>
                                {getDate(date as string, t(LANGUAGE.CREATE_DATE), width)}
                            </span>
                        )}
                        {estimatePaidDate ? (
                            getDate(estimatePaidDate, t(LANGUAGE.ESTIMATE_PAID_DATE), width)
                        ) : (
                            <span>{t(LANGUAGE.UNLIMITED_TIME)}</span>
                        )}
                        <h3 className='mt-1 font-medium'>{methodSpending?.name || t(LANGUAGE.EMPTY_METHOD)}</h3>
                    </td>
                ),
            },
            {
                key: 'kind',
                title: t(LANGUAGE.CATEGORY),
                label: 'string',
                renderRow: ({ categorySpending, kindSpending, paid }) => (
                    <td className='px-1'>
                        <div className='flex items-center justify-center gap-x-2 text-center'>
                            <span
                                className={clsx(
                                    'inline-block h-1.5 w-1.5 rounded-full',
                                    paid ? 'bg-green-500' : 'bg-radical-red-500'
                                )}
                            />
                            <p className='truncate text-sm font-medium'>
                                {categorySpending?.name ?? kindSpending.name}
                            </p>
                        </div>
                    </td>
                ),
            },
            {
                key: 'receive',
                title: <p className='text-green-500'>{t(LANGUAGE.RECEIVE)}</p>,
                label: 'string',
                renderRow: ({ kindSpending, amount, realPaid }) => {
                    const isGetLoan = KIND_SPENDING.CREDIT === kindSpending.key
                    const receive = isGetLoan ? amount : realPaid
                    return (
                        <td className='whitespace-nowrap px-1 text-center text-sm'>
                            {!isNil(receive) && (
                                <span className='font-medium text-green-500'>{numeral(receive).format()}</span>
                            )}
                        </td>
                    )
                },
            },
            {
                key: 'cost',
                title: <p className='text-red-500'>{t(LANGUAGE.COST)}</p>,
                label: 'string',
                renderRow: ({ kindSpending, amount, realPaid }) => {
                    const isGetLoan = KIND_SPENDING.CREDIT === kindSpending.key
                    const cost = isGetLoan ? realPaid : amount
                    return (
                        <td className='whitespace-nowrap px-1 text-center text-sm'>
                            {!isNil(cost) && <span className='font-medium text-red-500'>{numeral(cost).format()}</span>}
                        </td>
                    )
                },
            },
        ]
    }, [t, width])
    return columns
}

export const useRenderList = () => {
    const { t } = useTranslation()
    const callback = useCallback(
        (
            { kindSpending, amount, date, estimatePaidDate, paid, methodSpending, categorySpending, description }: any,
            index: number
        ) => (
            <div
                className={clsx(
                    'flex cursor-pointer items-center p-2 hover:bg-gray-200 dark:hover:bg-slate-500',
                    index % 2 ? 'bg-white dark:bg-slate-700' : 'bg-gray-50 dark:bg-slate-600'
                )}
            >
                <div className='flex flex-1 flex-col text-gray-900 dark:text-slate-200'>
                    <div className='flex items-center justify-between'>
                        <div
                            className={clsx(
                                'flex items-center justify-center gap-x-2 text-center',
                                paid ? 'text-green-500' : 'text-radical-red-500'
                            )}
                        >
                            <span
                                className={clsx(
                                    'inline-block h-1.5 w-1.5 rounded-full',
                                    paid ? 'bg-green-500' : 'bg-radical-red-500'
                                )}
                            />
                            <p className='truncate text-sm font-medium'>
                                {categorySpending?.name ?? kindSpending.name}
                            </p>
                        </div>
                        <p
                            className={clsx(
                                { 'text-green-500': [KIND_SPENDING.CREDIT].includes(kindSpending.key) },
                                { 'text-red-500': [KIND_SPENDING.LOAN].includes(kindSpending.key) },
                                'text-sm font-normal lg:text-base'
                            )}
                        >
                            {numeral(amount).format()}
                        </p>
                    </div>
                    <div className='flex items-start justify-between'>
                        <div className='mt-1 text-xs sm:text-sm'>
                            {moment(date).format(DATE_FORMAT.TIME_DATE) !== 'Invalid date' && (
                                <span className='block'>
                                    {t(LANGUAGE.CREATE_DATE)}: {moment(date).format(DATE_FORMAT.TIME_DATE)}
                                </span>
                            )}
                            <span>
                                {t(LANGUAGE.ESTIMATE_PAID_DATE)}:{' '}
                                {estimatePaidDate
                                    ? moment(estimatePaidDate).format(DATE_FORMAT.TIME_DATE)
                                    : t(LANGUAGE.UNLIMITED_TIME)}
                            </span>
                        </div>
                        <h3 className='truncate text-xs font-normal sm:text-sm'>
                            {methodSpending?.name || t(LANGUAGE.EMPTY_METHOD)}
                        </h3>
                    </div>
                    <p className='mt-1 whitespace-pre-wrap text-xs lg:text-sm'>{description}</p>
                </div>
            </div>
        ),
        [t]
    )

    return callback
}
