import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import { Outlet, useNavigate } from 'react-router-dom'
import { Tabs } from '~/components'

const TransactionTabs = [
    { name: 'Tất cả', href: 'tab-all' },
    { name: 'Hàng ngày', href: 'tab-day' },
    { name: 'Hàng tuần', href: 'tab-week' },
    { name: 'Hàng tháng', href: 'tab-month' },
    { name: 'Hàng năm', href: 'tab-year' },
]

const Transaction = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className='flex items-center text-gray-900 space-x-2 sm:mb-2 mb-4 select-none'>
                <ArrowSmLeftIcon
                    className='h-7 w-7 hover:opacity-50 cursor-pointer'
                    onClick={() => {
                        navigate(-1)
                    }}
                />
                <h4 className='xl:text-2xl text-xl font-semibold'>Giao dịch</h4>
            </div>
            <div>
                <Tabs data={TransactionTabs} />
            </div>
            <div>
                <div className='sm:px-6 lg:px-8'>
                    <div className='mt-8 flex flex-col'>
                        <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
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
                                        <tbody className='bg-white'>
                                            <Outlet />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction
