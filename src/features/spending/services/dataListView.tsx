import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'

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
            index % 2 ? 'bg-white dark:bg-slate-700' : 'bg-white dark:bg-slate-600'
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
