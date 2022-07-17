import clsx from 'clsx'
import _ from 'lodash'
import moment from 'moment'
import { Fragment, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { RecentData } from '~/@types/spending'
import { KIND_SPENDING } from '~/constant/spending'
import { useLoading } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import useAuth from '~/store/auth'

interface TransactionTabTableProps {
    query: { recent: string }
    params?: { [x: string]: string | number }
}

const TransactionTabTable = ({ query, params = {} }: TransactionTabTableProps) => {
    const { userProfile } = useAuth()
    const { loading } = useLoading()
    const { width } = useWindowSize()

    const [{ recent }, fetchData] = useQuery<{
        recent: RecentData[]
    }>(query, { userId: userProfile?._id as string, ...params })

    useEffect(() => {
        if (!loading.submit) {
            fetchData()
        }
    }, [loading])

    if (recent.loading) return null

    if (!recent.data || _.isEmpty(recent.data)) return null

    return (
        <>
            {recent.data.map(
                ({ _id, date, description, methodSpending, kindSpending, categorySpending, amount }, index, data) => (
                    <Fragment key={_id}>
                        <tr>
                            <td className={clsx('whitespace-nowrap pt-4 pl-2 pr-3 sm:pl-6 lg:pl-8')}>
                                {width <= 900 ? (
                                    <>
                                        <span>{moment(date).format('DD/MM/YYYY')}</span>
                                        <br />
                                        <span>{moment(date).format('HH:mm:ss')}</span>
                                    </>
                                ) : (
                                    <span>{moment(date).format('DD/MM/YYYY HH:mm:ss')}</span>
                                )}
                                <h3 className='mt-1 font-medium'>{methodSpending.name}</h3>
                            </td>
                            <td className={clsx('px-1 pt-4 text-sm font-medium text-gray-900 text-center truncate')}>
                                {categorySpending?.name ?? kindSpending.name}
                            </td>
                            <td className={clsx('whitespace-nowrap px-1 pt-4 text-sm text-center')}>
                                {[KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO].includes(kindSpending.key) && (
                                    <NumberFormat
                                        className={clsx('text-green-500', 'font-medium')}
                                        value={amount}
                                        displayType='text'
                                        thousandSeparator
                                    />
                                )}
                            </td>
                            <td className={clsx('whitespace-nowrap pl-1 pr-2 pt-4 text-sm text-center')}>
                                {[KIND_SPENDING.COST, KIND_SPENDING.TRANSFER_FROM].includes(kindSpending.key) && (
                                    <NumberFormat
                                        className={clsx('text-red-500', 'font-medium')}
                                        value={amount}
                                        displayType='text'
                                        thousandSeparator
                                    />
                                )}
                            </td>
                        </tr>
                        <tr>
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
                                            <span key={index} className='block truncate w-full'>
                                                {line}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </td>
                        </tr>
                    </Fragment>
                )
            )}
        </>
    )
}
export default TransactionTabTable
