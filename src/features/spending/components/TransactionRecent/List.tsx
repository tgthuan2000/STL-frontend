import { useAutoAnimate } from '@formkit/auto-animate/react'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { Fragment, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { TEMPLATE } from '~/constant/template'
import { useWindowSize } from '~/hook'
import { TransactionRecentDataProps, TransactionRecentSkeletonProps } from '../../pages/TransactionRecent'
import { getLinkSpending } from '~/utils'
import { ISpendingData } from '~/@types/spending'

const List: React.FC<TransactionRecentDataProps> = ({ data, ...props }) => {
    const { loading } = props
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()

    const refactorData = useMemo(() => {
        return data?.data.reduce((acc: { [x: string]: ISpendingData[] }, cur) => {
            const date = moment(cur.date).format(DATE_FORMAT.D_DATE)
            if (acc[date]) {
                acc[date].push(cur)
            } else {
                Object.assign(acc, { [date]: [cur] })
            }
            return acc
        }, {})
    }, [data])

    return (
        <div className='inline-block w-full py-2' ref={parentRef}>
            {!loading && (!data?.data || isEmpty(data.data)) ? (
                <EmptyList />
            ) : (
                <ListData {...props} data={refactorData} hasNextPage={data?.hasNextPage} />
            )}
        </div>
    )
}
type ListDataProps = Omit<TransactionRecentDataProps, 'data'> & {
    data: { [x: string]: ISpendingData[] } | undefined
    hasNextPage?: boolean
}

const ListData: React.FC<ListDataProps> = ({ data, onGetMore, loading, hasNextPage }) => {
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
        <div className='sm:rounded-lg overflow-hidden'>
            {(!loading || wpLoading.current) &&
                data &&
                Object.keys(data).map((date, index) => (
                    <div key={date}>
                        <h4
                            className={clsx(
                                'font-normal lg:font-light lg:text-lg text-base text-gray-900 bg-cyan-200 p-2'
                            )}
                        >
                            {date}
                        </h4>
                        <ul className='divide-y'>
                            {data[date].map(
                                (
                                    { _id, date, description, methodSpending, kindSpending, categorySpending, amount },
                                    index,
                                    data
                                ) => {
                                    const to = getLinkSpending(kindSpending.key, _id)
                                    return (
                                        <li key={_id}>
                                            <div
                                                className={clsx(
                                                    'flex items-center p-2 hover:bg-gray-200 cursor-pointer',
                                                    index % 2 ? 'bg-white' : 'bg-gray-50'
                                                )}
                                                onClick={() => navigate(to)}
                                            >
                                                <div className='flex flex-1 flex-col'>
                                                    <div className='flex justify-between items-center'>
                                                        <h5 className='lg:text-base text-sm font-normal truncate'>
                                                            {categorySpending?.name || kindSpending.name}
                                                        </h5>
                                                        <p
                                                            className={clsx(
                                                                {
                                                                    'text-green-500': [
                                                                        KIND_SPENDING.RECEIVE,
                                                                        KIND_SPENDING.TRANSFER_TO,
                                                                    ].includes(kindSpending.key),
                                                                },
                                                                {
                                                                    'text-red-500': [
                                                                        KIND_SPENDING.COST,
                                                                        KIND_SPENDING.TRANSFER_FROM,
                                                                    ].includes(kindSpending.key),
                                                                },
                                                                'font-normal lg:text-base text-sm'
                                                            )}
                                                        >
                                                            {numeral(amount).format()}
                                                        </p>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <p className='inline-block text-xs lg:text-sm my-0.5'>
                                                            {moment(date).format(DATE_FORMAT.TIME_DATE)}
                                                        </p>
                                                        <span className='font-normal truncate text-xs lg:text-sm'>
                                                            {methodSpending.name}
                                                        </span>
                                                    </div>
                                                    <p className='whitespace-pre-wrap text-xs lg:text-sm'>
                                                        {description}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </div>
                ))}

            {loading ? (
                <SkeletonList elNumber={wpLoading.current ? 2 : 3} />
            ) : (
                hasNextPage && <Waypoint onEnter={handleGetMoreData} bottomOffset='-20%' />
            )}
        </div>
    )
}
const SkeletonList: React.FC<TransactionRecentSkeletonProps> = ({ elNumber = 2 }) => {
    return (
        <div className='border-t animate-pulse'>
            {Array.from(Array(elNumber)).map((item, index, data) => (
                <div key={index}>
                    <div className='bg-cyan-200 p-2'>
                        <span className='block bg-cyan-300 h-6 w-1/4 rounded-full' />
                    </div>
                    <ul className='divide-y'>
                        {Array.from(Array(Math.ceil(Math.random() * 5))).map((item, index, data) => (
                            <li key={index}>
                                <div className='flex items-center p-2 bg-gray-50'>
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <div className='flex justify-between items-center'>
                                            <span className='block bg-gray-200 h-4 w-1/4 rounded-full' />
                                            <span className='block bg-gray-200 h-4 w-1/2 rounded-full' />
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='block bg-gray-200 h-4 w-1/3 rounded-full' />
                                            <span className='block bg-gray-200 h-4 w-1/4 rounded-full' />
                                        </div>
                                        <span className='block bg-gray-200 h-4 w-3/4 rounded-full' />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

const EmptyList = () => {
    return (
        <span className='block truncate w-full text-center text-md text-gray-700 bg-gray-200 p-3 sm:rounded-lg font-base'>
            {TEMPLATE.EMPTY_DATA}
        </span>
    )
}

export default List
