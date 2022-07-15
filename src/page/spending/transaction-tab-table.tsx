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
    }, [loading, query, params])

    if (recent.loading) return null

    if (!recent.data || _.isEmpty(recent.data)) return null

    return (
        <>
            {recent.data.map(
                ({ _id, date, description, methodSpending, kindSpending, categorySpending, amount }, index, data) => (
                    <tr key={_id}>
                        <td
                            className={clsx(
                                data && index !== data.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6 lg:pl-8'
                            )}
                        >
                            {width <= 900 ? (
                                <>
                                    <span>{moment(date).format('DD/MM/YYYY')}</span>
                                    <br />
                                    <span>{moment(date).format('HH:mm:ss')}</span>
                                </>
                            ) : (
                                <span>{moment(date).format('DD/MM/YYYY HH:mm:ss')}</span>
                            )}
                            <h3 className='font-medium truncate'>{methodSpending.name}</h3>
                            <span title={description}>
                                {description.split('\n').map((line, index) => (
                                    <Fragment key={index}>
                                        <span className='truncate'>{line}</span>
                                        <br />
                                    </Fragment>
                                ))}
                            </span>
                        </td>
                        <td
                            className={clsx(
                                index !== data.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'
                            )}
                        >
                            {categorySpending?.name ?? kindSpending.name}
                        </td>
                        <td
                            className={clsx(
                                index !== data.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                            )}
                        >
                            {[KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO].includes(kindSpending.key) && (
                                <NumberFormat
                                    className={clsx('text-green-500', 'font-medium')}
                                    value={amount}
                                    displayType='text'
                                    thousandSeparator
                                />
                            )}
                        </td>
                        <td
                            className={clsx(
                                index !== data.length - 1 ? 'border-b border-gray-200' : '',
                                'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                            )}
                        >
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
                )
            )}
        </>
    )
}
export default TransactionTabTable
