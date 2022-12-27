import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ISpendingData, RecentQueryData } from '~/@types/spending'
import { TimeFilter } from '~/components'
import LoadingButton from '~/components/Loading/LoadingButton'
import { TimeFilterPayload } from '~/components/TimeFilter'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { E_FILTER_DATE, TEMPLATE } from '~/constant/template'
import { useConfig } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery } from '~/hook/useQuery'
import { GETALL_RECENT_SPENDING, GETALL_RECENT_SPENDING_FILTER_DATE_RANGE } from '~/schema/query/spending'
import { getDate } from '~/services'
import useAuth from '~/store/auth'
import { getLinkSpending } from '~/utils'

const TransactionRecentTable = () => {
    const { userProfile } = useAuth()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const { width } = useWindowSize()
    const { getKindSpendingIds } = useConfig()
    const [searchParams] = useSearchParams()

    const getAll = useMemo(() => {
        return {
            query: { recent: GETALL_RECENT_SPENDING },
            params: {
                userId: userProfile?._id as string,
                kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
            },
        }
    }, [])

    const defaultValues = useMemo(() => {
        try {
            let query = GETALL_RECENT_SPENDING,
                params = {}

            const d = Object.fromEntries([...searchParams])
            if (!isEmpty(d)) {
                query = GETALL_RECENT_SPENDING_FILTER_DATE_RANGE
                let { type, data } = d
                data = JSON.parse(data)

                switch (Number(type)) {
                    case E_FILTER_DATE.DATE: {
                        params = {
                            startDate: getDate(moment(data).toDate(), 'start'),
                            endDate: getDate(moment(data).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.DATE_RANGE: {
                        const [startDate, endDate] = data
                        params = {
                            startDate: getDate(moment(startDate).toDate(), 'start'),
                            endDate: getDate(moment(endDate).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.MONTH: {
                        params = {
                            startDate: getDate(moment(data).toDate(), 'start', 'month'),
                            endDate: getDate(moment(data).toDate(), 'end', 'month'),
                        }
                        break
                    }
                    case E_FILTER_DATE.YEAR: {
                        params = {
                            startDate: getDate(moment(data).toDate(), 'start', 'year'),
                            endDate: getDate(moment(data).toDate(), 'end', 'year'),
                        }
                        break
                    }
                }
            }
            return {
                query: { recent: query },
                params: {
                    userId: userProfile?._id as string,
                    kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
                    ...params,
                },
            }
        } catch (error) {
            console.log(error)
            return getAll
        }
    }, [])

    const [{ query, params }, setQuery] = useState<{
        query: QueryTypeUseQuery<RecentQueryData>
        params: ParamsTypeUseQuery
    }>(defaultValues)

    const [{ recent }, fetchData, deleteCacheData, reload, error] = useQuery<RecentQueryData>(query, params)

    useEffect(() => {
        fetchData()
    }, [])

    const onReload = () => {
        const res = deleteCacheData('recent')
        console.log(res)
        reload()
    }

    const handleFilterSubmit = (data: TimeFilterPayload) => {
        switch (data.id) {
            case E_FILTER_DATE.ALL:
                setQuery(getAll)
                break
            case E_FILTER_DATE.DATE:
                const date = data.data as Date
                setQuery({
                    query: { recent: GETALL_RECENT_SPENDING_FILTER_DATE_RANGE },
                    params: {
                        ...defaultValues.params,
                        startDate: getDate(date, 'start'),
                        endDate: getDate(date, 'end'),
                    },
                })
                break
            case E_FILTER_DATE.DATE_RANGE:
                const [startDate, endDate] = data.data as Date[]
                setQuery({
                    query: { recent: GETALL_RECENT_SPENDING_FILTER_DATE_RANGE },
                    params: {
                        ...defaultValues.params,
                        startDate: getDate(startDate, 'start'),
                        endDate: getDate(endDate, 'end'),
                    },
                })
                break
            case E_FILTER_DATE.MONTH:
                const month = data.data as Date
                setQuery({
                    query: { recent: GETALL_RECENT_SPENDING_FILTER_DATE_RANGE },
                    params: {
                        ...defaultValues.params,
                        startDate: getDate(month, 'start', 'month'),
                        endDate: getDate(month, 'end', 'month'),
                    },
                })
                break
            case E_FILTER_DATE.YEAR:
                const year = data.data as Date
                setQuery({
                    query: { recent: GETALL_RECENT_SPENDING_FILTER_DATE_RANGE },
                    params: {
                        ...defaultValues.params,
                        startDate: getDate(year, 'start', 'year'),
                        endDate: getDate(year, 'end', 'year'),
                    },
                })
                break
        }
        reload()
    }

    return (
        <>
            <div className='sm:px-6 lg:px-8'>
                <div className='mt-4 flex flex-col'>
                    <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                        <div className='flex justify-between items-center'>
                            <TimeFilter onSubmit={handleFilterSubmit} />
                            {/* {width > 768 && ( */}
                            <div className='mr-3'>
                                <LoadingButton onReload={onReload} disabled={recent.loading} />
                            </div>
                            {/* )} */}
                        </div>
                        {error ? (
                            <p className='m-5 text-radical-red-500 font-medium'>{TEMPLATE.ERROR}</p>
                        ) : (
                            <div className='inline-block w-full py-2 align-middle'>
                                <div className='shadow-sm ring-1 ring-black ring-opacity-5'>
                                    <table
                                        className='table-fixed w-full overflow-hidden border-separate'
                                        style={{ borderSpacing: 0 }}
                                    >
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
                                            {recent.loading ? (
                                                <SkeletonTransactionTable />
                                            ) : !recent.data || isEmpty(recent.data) ? (
                                                <EmptyTransactionTable />
                                            ) : (
                                                <MainTable data={recent.data} />
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default TransactionRecentTable

interface MainTableProps {
    data: ISpendingData[]
}
const MainTable = ({ data }: MainTableProps) => {
    const navigate = useNavigate()
    const { width } = useWindowSize()

    return (
        <>
            {data.map(
                (
                    { _id, date, description, methodSpending, kindSpending, categorySpending, amount, realPaid, paid },
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
                                    {[KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO].includes(kindSpending.key) && (
                                        <span className={clsx('text-green-500', 'font-medium')}>
                                            {numeral(amount).format()}
                                        </span>
                                    )}
                                </td>
                                <td className={clsx('whitespace-nowrap pl-1 pr-2 lg:pt-4 pt-0 text-sm text-center')}>
                                    {[KIND_SPENDING.COST, KIND_SPENDING.TRANSFER_FROM].includes(kindSpending.key) && (
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
                                        data && index !== data.length - 1 ? 'border-b border-gray-200' : '',
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
        </>
    )
}

const SkeletonTransactionTable = () => {
    return (
        <>
            {Array.from(Array(10)).map((item, index, data) => (
                <Fragment key={index}>
                    <tr className=' animate-pulse'>
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

const EmptyTransactionTable = () => {
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
