import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { Fragment, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { TEMPLATE } from '~/constant/template'
import { useWindowSize } from '~/hook'
import { TransactionRecentDataProps, TransactionRecentSkeletonProps } from '../../pages/TransactionRecent'
import { getLinkSpending } from '~/utils'

const Table: React.FC<TransactionRecentDataProps> = (props) => {
    const { data, loading } = props
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()

    return (
        <div className='inline-block w-full py-2 align-middle'>
            <div className='shadow-sm ring-1 ring-black ring-opacity-5'>
                <table className='table-fixed w-full overflow-hidden border-separate' style={{ borderSpacing: 0 }}>
                    <thead className='bg-gray-50 select-none'>
                        <tr>
                            <th
                                scope='col'
                                className='text-center whitespace-nowrap border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'
                            >
                                Ngày
                            </th>
                            <th
                                scope='col'
                                className=' whitespace-nowrap text-center border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'
                            >
                                Thể loại
                            </th>
                            <th
                                scope='col'
                                className='text-green-500 whitespace-nowrap text-center border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-sm font-semibold backdrop-blur backdrop-filter'
                            >
                                Thu nhập
                            </th>
                            <th
                                scope='col'
                                className='text-red-500 whitespace-nowrap text-center border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-sm font-semibold backdrop-blur backdrop-filter'
                            >
                                Chi phí
                            </th>
                        </tr>
                    </thead>
                    <tbody ref={parentRef} className='bg-white'>
                        {!loading && (!data?.data || isEmpty(data.data)) ? <EmptyTable /> : <TableData {...props} />}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
const TableData: React.FC<TransactionRecentDataProps> = ({ data, onGetMore, loading }) => {
    const navigate = useNavigate()
    const { width } = useWindowSize()
    const wpLoading = useRef(false)

    const handleGetMoreData = () => {
        wpLoading.current = true
        onGetMore()
    }

    useEffect(() => {
        if (!loading && wpLoading.current) {
            wpLoading.current = false
        }
    }, [loading])

    return (
        <>
            {(!loading || wpLoading.current) &&
                data?.data.map(
                    (
                        {
                            _id,
                            date,
                            description,
                            methodSpending,
                            kindSpending,
                            categorySpending,
                            amount,
                            realPaid,
                            paid,
                        },
                        index,
                        data
                    ) => {
                        const to = getLinkSpending(kindSpending.key, _id)
                        return (
                            <Fragment key={_id}>
                                <tr onClick={() => navigate(to)}>
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
                                        <h3 className='mt-1 font-medium'>
                                            {methodSpending?.name || TEMPLATE.EMPTY_METHOD_SPENDING_SHORT}
                                        </h3>
                                    </td>
                                    <td className='px-1 lg:pt-4 pt-0'>
                                        <div className='text-center'>
                                            <p className='text-sm font-medium text-gray-900 truncate'>
                                                {categorySpending?.name ?? kindSpending.name}
                                            </p>
                                        </div>
                                    </td>
                                    <td className={clsx('whitespace-nowrap px-1 lg:pt-4 pt-0 text-sm text-center')}>
                                        {[KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO].includes(
                                            kindSpending.key
                                        ) && (
                                            <span className={clsx('text-green-500', 'font-medium')}>
                                                {numeral(amount).format()}
                                            </span>
                                        )}
                                    </td>
                                    <td
                                        className={clsx('whitespace-nowrap pl-1 pr-2 lg:pt-4 pt-0 text-sm text-center')}
                                    >
                                        {[KIND_SPENDING.COST, KIND_SPENDING.TRANSFER_FROM].includes(
                                            kindSpending.key
                                        ) && (
                                            <span className={clsx('text-red-500', 'font-medium')}>
                                                {numeral(amount).format()}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                                <tr onClick={() => navigate(to)}>
                                    <td
                                        colSpan={4}
                                        className={clsx(
                                            {
                                                'border-b border-gray-200':
                                                    (data && index !== data.length - 1) || loading,
                                            },
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
                                </tr>
                            </Fragment>
                        )
                    }
                )}
            {loading ? (
                <SkeletonTable elNumber={wpLoading.current ? 2 : 10} />
            ) : (
                data?.hasNextPage && (
                    <tr>
                        <td colSpan={4}>
                            <Waypoint onEnter={handleGetMoreData} bottomOffset='-20%' />
                        </td>
                    </tr>
                )
            )}
        </>
    )
}

const SkeletonTable: React.FC<TransactionRecentSkeletonProps> = ({ elNumber = 2 }) => {
    return (
        <>
            {Array.from(Array(elNumber)).map((item, index, data) => (
                <Fragment key={index}>
                    <tr className='animate-pulse'>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block bg-gray-200 h-4 w-3/4 rounded-full' />
                                <span className='block bg-gray-200 h-4 w-1/2 rounded-full' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block mx-auto bg-gray-200 h-4 w-1/2 rounded-full' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block mx-auto bg-gray-200 h-4 w-1/2 rounded-full' />
                            </span>
                        </td>
                        <td className='py-4 px-2'>
                            <span className='flex flex-col gap-2 w-full'>
                                <span className='block mx-auto bg-gray-200 h-4 w-1/2 rounded-full' />
                            </span>
                        </td>
                    </tr>
                    <tr className='animate-pulse'>
                        <td
                            colSpan={4}
                            className={clsx('pb-4 px-2', {
                                'border-b border-gray-200': data && index !== data.length - 1,
                            })}
                        >
                            <span className='block bg-gray-200 h-4 w-4/5 rounded-full' />
                        </td>
                    </tr>
                </Fragment>
            ))}
        </>
    )
}

const EmptyTable = () => {
    return (
        <tr>
            <td colSpan={4} className='whitespace-nowrap py-4 px-2'>
                <span className='block truncate w-full text-center text-md text-gray-700 font-base'>
                    {TEMPLATE.EMPTY_DATA}
                </span>
            </td>
        </tr>
    )
}

export default Table
