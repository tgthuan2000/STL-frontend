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
                <Outlet />
            </div>
        </div>
    )
}

export default Transaction
