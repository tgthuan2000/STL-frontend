import moment from 'moment'
import numeral from 'numeral'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TableColumn } from '~/@types/components'
import { ISpendingData } from '~/@types/spending'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const getDate = (date: string | undefined, width: number) => {
    return width <= 900 ? (
        <>
            <span>{moment(date).format(DATE_FORMAT.D_DATE)}</span>
            <br />
            <span>{moment(date).format(DATE_FORMAT.TIME)}</span>
        </>
    ) : (
        <span>{moment(date).format(DATE_FORMAT.D_DATE_TIME)}</span>
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
                renderRow: ({ date, methodSpending }) => (
                    <td className='whitespace-nowrap pt-3 pl-2 pr-3 text-xs sm:pl-3 sm:text-sm'>
                        {moment(date).format(DATE_FORMAT.D_DATE_TIME) !== 'Invalid date' ? (
                            getDate(date, width)
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
                renderRow: ({ categorySpending, kindSpending }) => (
                    <td className='px-1'>
                        <div className='text-center'>
                            <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
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
                renderRow: ({ kindSpending, amount }) => (
                    <td className='whitespace-nowrap px-1 text-center text-sm'>
                        {[KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO].includes(kindSpending.key) && (
                            <span className='font-medium text-green-500'>{numeral(amount).format()}</span>
                        )}
                    </td>
                ),
            },
            {
                key: 'cost',
                title: <p className='text-red-500'>{t(LANGUAGE.COST)}</p>,
                label: 'string',
                renderRow: ({ kindSpending, amount }) => (
                    <td className='whitespace-nowrap px-1 text-center text-sm'>
                        {[KIND_SPENDING.COST, KIND_SPENDING.TRANSFER_FROM].includes(kindSpending.key) && (
                            <span className='font-medium text-red-500'>{numeral(amount).format()}</span>
                        )}
                    </td>
                ),
            },
        ]
    }, [t, width])

    return columns
}
