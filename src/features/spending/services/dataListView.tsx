import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import { TableColumn } from '~/@types/components'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n

const getDate = (date: string, width: number) => {
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

export const columns: (width: number) => Array<TableColumn> = (width) => [
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

export const subRow: (
    { description, loading }: { description: string; loading: boolean },
    index: number,
    data: any[]
) => JSX.Element = ({ description, loading }, index, data) => (
    <td
        colSpan={4}
        className={clsx(
            { 'border-b border-gray-200 dark:border-slate-700': (data && index !== data.length - 1) || loading },
            'whitespace-nowrap px-2 pb-3 text-xs sm:pl-3 sm:text-sm'
        )}
    >
        {description && (
            <div
                title={description}
                className='mt-2 max-w-[450px] cursor-default sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px]'
            >
                {description.split('\n').map((line, index) => (
                    <span key={index} className='block truncate'>
                        {line}
                    </span>
                ))}
            </div>
        )}
    </td>
)

export const renderList: (data: any, index: number) => React.ReactNode = (
    { categorySpending, kindSpending, amount, date, methodSpending, description },
    index
) => (
    <div
        className={clsx(
            'flex cursor-pointer items-center p-2 hover:bg-gray-200 dark:hover:bg-slate-500',
            index % 2 ? 'bg-white dark:bg-slate-700' : 'bg-gray-50 dark:bg-slate-600'
        )}
    >
        <div className='flex flex-1 flex-col text-gray-900 dark:text-slate-200'>
            <div className='flex items-center justify-between'>
                <h5 className='truncate text-sm font-normal text-gray-900 dark:text-slate-200 lg:text-base'>
                    {categorySpending?.name || kindSpending.name}
                </h5>
                <p
                    className={clsx(
                        {
                            'text-green-500 dark:text-teal-400': [
                                KIND_SPENDING.RECEIVE,
                                KIND_SPENDING.TRANSFER_TO,
                            ].includes(kindSpending.key),
                        },
                        {
                            'text-red-500': [KIND_SPENDING.COST, KIND_SPENDING.TRANSFER_FROM].includes(
                                kindSpending.key
                            ),
                        },
                        'text-sm font-normal lg:text-base'
                    )}
                >
                    {numeral(amount).format()}
                </p>
            </div>
            <div className='flex items-center justify-between'>
                <p className='my-0.5 inline-block text-xs lg:text-sm'>{moment(date).format(DATE_FORMAT.TIME_DATE)}</p>
                <span className='truncate text-xs font-normal lg:text-sm'>{methodSpending.name}</span>
            </div>
            <p className='mt-1 whitespace-pre-wrap text-xs lg:text-sm'>{description}</p>
        </div>
    </div>
)

export const renderTitle = (data: any) => (
    <h4 className='bg-cyan-200 p-2 text-base font-normal text-gray-900 dark:bg-slate-800 dark:text-sky-400 lg:text-lg lg:font-light'>
        {data}
    </h4>
)

export const groupBy = (id: any) => (data: any) => moment(data.date).format(id)
