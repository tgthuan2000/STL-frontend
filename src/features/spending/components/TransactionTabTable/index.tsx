import { useAutoAnimate } from '@formkit/auto-animate/react'
import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { ISpendingData } from '~/@types/spending'
import { useQuery, useWindowSize } from '~/hook'
import useAuth from '~/store/auth'

const EmptyTransactionTable = React.lazy(() => import('./EmptyTransactionTable'))
const MainTable = React.lazy(() => import('./MainTable'))
const SkeletonTransactionTable = React.lazy(() => import('./SkeletonTransactionTable'))
const LoadingButton = React.lazy(() => import('~/components/Loading/LoadingButton'))

interface TransactionTabTableProps {
    query: { recent: string }
    params?: { [x: string]: string | number }
}

const TransactionTabTable = ({ query, params = {} }: TransactionTabTableProps) => {
    const { userProfile } = useAuth()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const { width } = useWindowSize()

    const [{ recent }, fetchData, deleteCacheData, reload] = useQuery<{
        recent: ISpendingData[]
    }>(query, { userId: userProfile?._id as string, ...params })

    useEffect(() => {
        fetchData()
    }, [])

    const onReload = () => {
        const res = deleteCacheData('recent')
        console.log(res)
        reload()
    }

    return (
        <>
            <div className='sm:px-6 lg:px-8'>
                <div className='mt-8 flex flex-col'>
                    <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                        {width > 768 && (
                            <div className='text-right mr-3'>
                                <LoadingButton onReload={onReload} disabled={recent.loading} />
                            </div>
                        )}
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
                    </div>
                </div>
            </div>
        </>
    )
}
export default TransactionTabTable
