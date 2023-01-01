import clsx from 'clsx'
import { isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { TableColumn } from '~/components/Table'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { TEMPLATE } from '~/constant/template'

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

export const columns: (width: number) => Array<TableColumn> = (width) => [
    {
        key: 'date',
        title: 'Ngày',
        label: 'string',
        renderRow: ({ date, methodSpending, estimatePaidDate }) => (
            <td className='whitespace-nowrap pt-3 pl-2 pr-3 sm:pl-3 sm:text-sm text-xs'>
                {moment(date).format(DATE_FORMAT.TIME_DATE) !== 'Invalid date' && (
                    <span className='block mt-1'>{getDate(date as string, 'Ngày tạo', width)}</span>
                )}
                {estimatePaidDate ? getDate(estimatePaidDate, 'Hạn trả', width) : <span>{TEMPLATE.EMPTY_DATE}</span>}
                <h3 className='mt-1 font-medium'>{methodSpending?.name || TEMPLATE.EMPTY_METHOD_SPENDING_SHORT}</h3>
            </td>
        ),
    },
    {
        key: 'kind',
        title: 'Thể loại',
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
                    <p className='text-sm font-medium text-gray-900 truncate'>
                        {categorySpending?.name ?? kindSpending.name}
                    </p>
                </div>
            </td>
        ),
    },
    {
        key: 'receive',
        title: <p className='text-green-500'>Thu nhập</p>,
        label: 'string',
        renderRow: ({ kindSpending, amount, realPaid }) => {
            const isGetLoan = KIND_SPENDING.GET_LOAN === kindSpending.key
            const receive = isGetLoan ? amount : realPaid
            return (
                <td className='whitespace-nowrap px-1 text-sm text-center'>
                    {!isNil(receive) && <span className='text-green-500 font-medium'>{numeral(receive).format()}</span>}
                </td>
            )
        },
    },
    {
        key: 'cost',
        title: <p className='text-red-500'>Chi phí</p>,
        label: 'string',
        renderRow: ({ kindSpending, amount, realPaid }) => {
            const isGetLoan = KIND_SPENDING.GET_LOAN === kindSpending.key
            const cost = isGetLoan ? realPaid : amount
            return (
                <td className='whitespace-nowrap px-1 text-sm text-center'>
                    {!isNil(cost) && <span className='text-red-500 font-medium'>{numeral(cost).format()}</span>}
                </td>
            )
        },
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
            'whitespace-nowrap pb-3 px-2 sm:pl-3 sm:text-sm text-xs'
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
    { kindSpending, amount, date, estimatePaidDate, paid, methodSpending, categorySpending, description },
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
                <div className='flex items-center justify-center gap-x-2 text-center'>
                    <span
                        className={clsx(
                            'inline-block h-1.5 w-1.5 rounded-full',
                            paid ? 'bg-green-500' : 'bg-radical-red-500'
                        )}
                    />
                    <p className='text-sm font-medium text-gray-900 truncate'>
                        {categorySpending?.name ?? kindSpending.name}
                    </p>
                </div>
                <p
                    className={clsx(
                        { 'text-green-500': [KIND_SPENDING.GET_LOAN].includes(kindSpending.key) },
                        { 'text-red-500': [KIND_SPENDING.LOAN].includes(kindSpending.key) },
                        'font-normal lg:text-base text-sm'
                    )}
                >
                    {numeral(amount).format()}
                </p>
            </div>
            <div className='flex justify-between items-start'>
                <div className='sm:text-sm text-xs mt-1'>
                    {moment(date).format(DATE_FORMAT.TIME_DATE) !== 'Invalid date' && (
                        <span className='block'>Ngày tạo: {moment(date).format(DATE_FORMAT.TIME_DATE)}</span>
                    )}
                    <span>
                        Hạn trả:{' '}
                        {estimatePaidDate
                            ? moment(estimatePaidDate).format(DATE_FORMAT.TIME_DATE)
                            : TEMPLATE.EMPTY_DATE}
                    </span>
                </div>
                <h3 className='truncate font-normal sm:text-sm text-xs'>
                    {methodSpending?.name || TEMPLATE.EMPTY_METHOD_SPENDING_SHORT}
                </h3>
            </div>
            <p className='whitespace-pre-wrap text-xs lg:text-sm mt-1'>{description}</p>
        </div>
    </div>
)

export const renderTitle = (data: any) => (
    <h4 className='font-normal lg:font-light lg:text-lg text-base text-gray-900 bg-cyan-200 p-2'>{data}</h4>
)

export const groupBy = (id: any) => (data: any) => moment(data.date).format(id)
