import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import { TableColumn } from '~/components/Table'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { TEMPLATE } from '~/constant/template'

export const columns: (width: number) => Array<TableColumn> = (width) => [
    {
        key: 'date',
        title: 'Ngày',
        label: 'string',
        renderRow: ({ date, methodSpending }) => (
            <td className={clsx('whitespace-nowrap lg:pt-4 pt-3 pl-2 pr-3 sm:pl-6 lg:pl-8')}>
                {date ? (
                    width <= 900 ? (
                        <>
                            <span>{moment(date).format(DATE_FORMAT.D_DATE)}</span>
                            <br />
                            <span>{moment(date).format(DATE_FORMAT.TIME)}</span>
                        </>
                    ) : (
                        <span>{moment(date).format(DATE_FORMAT.D_DATE_TIME)}</span>
                    )
                ) : (
                    <span>{TEMPLATE.EMPTY_DATE}</span>
                )}
                <h3 className='mt-1 font-medium'>{methodSpending?.name || TEMPLATE.EMPTY_METHOD_SPENDING_SHORT}</h3>
            </td>
        ),
    },
    {
        key: 'kind',
        title: 'Thể loại',
        label: 'string',
        renderRow: ({ categorySpending, kindSpending }) => (
            <td className='px-1 lg:pt-4 pt-0'>
                <div className='text-center'>
                    <p className='text-sm font-medium text-gray-900 truncate'>
                        {categorySpending?.name ?? kindSpending.name}
                    </p>
                </div>
            </td>
        ),
    },
    {
        key: 'receive',
        title: 'Thu nhập',
        label: 'string',
        renderRow: ({ kindSpending, amount }) => (
            <td className={clsx('whitespace-nowrap px-1 lg:pt-4 pt-0 text-sm text-center')}>
                {[KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO].includes(kindSpending.key) && (
                    <span className={clsx('text-green-500', 'font-medium')}>{numeral(amount).format()}</span>
                )}
            </td>
        ),
    },
    {
        key: 'cost',
        title: 'Chi phí',
        label: 'string',
        renderRow: ({ kindSpending, amount }) => (
            <td className={clsx('whitespace-nowrap pl-1 pr-2 lg:pt-4 pt-0 text-sm text-center')}>
                {[KIND_SPENDING.COST, KIND_SPENDING.TRANSFER_FROM].includes(kindSpending.key) && (
                    <span className={clsx('text-red-500', 'font-medium')}>{numeral(amount).format()}</span>
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
            { 'border-b border-gray-200': (data && index !== data.length - 1) || loading },
            'whitespace-nowrap pb-4 pl-2 pr-2 sm:pl-6 lg:pl-8'
        )}
    >
        {description && (
            <div
                title={description}
                className='mt-2 max-w-[450px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] cursor-default'
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
            'flex items-center p-2 hover:bg-gray-200 cursor-pointer',
            index % 2 ? 'bg-white' : 'bg-gray-50'
        )}
    >
        <div className='flex flex-1 flex-col'>
            <div className='flex justify-between items-center'>
                <h5 className='lg:text-base text-sm font-normal truncate'>
                    {categorySpending?.name || kindSpending.name}
                </h5>
                <p
                    className={clsx(
                        {
                            'text-green-500': [KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO].includes(
                                kindSpending.key
                            ),
                        },
                        {
                            'text-red-500': [KIND_SPENDING.COST, KIND_SPENDING.TRANSFER_FROM].includes(
                                kindSpending.key
                            ),
                        },
                        'font-normal lg:text-base text-sm'
                    )}
                >
                    {numeral(amount).format()}
                </p>
            </div>
            <div className='flex justify-between items-center'>
                <p className='inline-block text-xs lg:text-sm my-0.5'>{moment(date).format(DATE_FORMAT.TIME_DATE)}</p>
                <span className='font-normal truncate text-xs lg:text-sm'>{methodSpending.name}</span>
            </div>
            <p className='whitespace-pre-wrap text-xs lg:text-sm'>{description}</p>
        </div>
    </div>
)

export const renderTitle = (data: any) => (
    <h4 className='font-normal lg:font-light lg:text-lg text-base text-gray-900 bg-cyan-200 p-2'>{data}</h4>
)

export const groupBy = (id: any) => (data: any) => moment(data.date).format(id)
