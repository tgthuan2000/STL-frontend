import { ArrowSmRightIcon } from '@heroicons/react/outline'
import React from 'react'
import { ButtonMenu } from '~/components'

const Spending = () => {
    return (
        <div>
            <ButtonMenu />
            <Transaction>
                <Transaction.Divider />
                <Transaction.Box title='Giao dịch gần đây'>
                    <RecentTransactionList />
                </Transaction.Box>
                <Transaction.Divider />
                <Transaction.Box title='Phương thức thanh toán'>
                    <MethodTransactionList />
                </Transaction.Box>
            </Transaction>
        </div>
    )
}

export default Spending

const recentItems = [
    { id: 1, date: '12:00 - 04 thg7 2022', type: 'Tiền mặt', amount: '1.000.000', note: 'Đổ xăng' },
    { id: 2, date: '12:00 - 05 thg7 2022', type: 'Thẻ Nam Á', amount: '1.000.000', note: 'Ăn sáng' },
    { id: 3, date: '12:00 - 06 thg7 2022', type: 'Momo', amount: '1.000.000', note: 'Ăn trưa' },
    { id: 4, date: '12:00 - 07 thg7 2022', type: 'Thẻ MSB', amount: '1.000.000', note: 'Chuyển tiền tháng 7' },
    {
        id: 5,
        date: '12:00 - 08 thg7 2022',
        type: '(Cho) vay',
        amount: '1.000.000',
        note: 'Cho Thơm mượn xiền nà hihi',
        kind: 'Chuyển tiền',
    },
]

const RecentTransactionList = () => {
    return (
        <ul role='list' className='divide-y divide-gray-300'>
            {recentItems.map((item) => (
                <li key={item.id} className='px-4 py-4 flex hover:bg-gray-100 cursor-pointer'>
                    <div className='w-2/3 truncate'>
                        {item.date && <span>{item.date}</span>}
                        {item.type && <h4 className='font-bold'>{item.type}</h4>}
                        {item.note && <span className='truncate'>{item.note}</span>}
                    </div>
                    <div className='w-1/3 truncate text-right'>
                        {item.kind && <span className='font-medium'>{item.kind}</span>}
                        {item.amount && <h4>{item.amount}</h4>}
                    </div>
                </li>
            ))}
        </ul>
    )
}

const methodItems = [
    { id: 1, type: 'Tiền mặt', amount: '1.000.000' },
    { id: 2, type: 'Thẻ Nam Á', amount: '1.000.000' },
    { id: 3, type: 'Momo', amount: '1.000.000' },
    { id: 4, type: 'Thẻ MSB', amount: '1.000.000' },
    {
        id: 5,
        type: '(Cho) vay',
        amount: '1.000.000',
    },
]

const MethodTransactionList = () => {
    return (
        <ul role='list' className='divide-y divide-gray-300'>
            {methodItems.map((item) => (
                <li key={item.id} className='px-4 py-4 flex hover:bg-gray-100 cursor-pointer'>
                    <div className='w-2/3 truncate'>{item.type && <h4 className='font-medium'>{item.type}</h4>}</div>
                    <div className='w-1/3 truncate text-right'>{item.amount && <h4>{item.amount}</h4>}</div>
                </li>
            ))}
        </ul>
    )
}

const Transaction = ({ children }: { children?: React.ReactNode }) => <div>{children}</div>

interface BoxProps {
    title?: string
    seeMore?: boolean
    children: React.ReactNode
}

const Box = ({ title, seeMore = true, children }: BoxProps) => {
    return (
        <div className='max-w-lg mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none'>
            <TransactionTitle title={title} />
            {children}
            <TransactionSeeMore seeMore={seeMore} />
        </div>
    )
}

const Divider = () => (
    <div className='py-6 flex items-center max-w-lg mx-auto' aria-hidden='true'>
        <div className='w-full border-t border-gray-300' />
    </div>
)

Transaction.Box = Box
Transaction.Divider = Divider

const TransactionTitle = ({ title }: { title?: string }) => {
    if (!title) return null
    return (
        <div className='border-b border-gray-200 bg-gray-50 px-4 py-2 text-base font-medium text-gray-500'>{title}</div>
    )
}

const TransactionSeeMore = ({ seeMore }: { seeMore?: boolean }) => {
    if (!seeMore) return null
    return (
        <div className='text-right border-t border-gray-200 bg-gray-50 px-6 py-2 text-sm font-medium'>
            <span className='cursor-pointer inline-flex items-center gap-x-1 text-blue-500 hover:opacity-70'>
                Xem thêm
                <ArrowSmRightIcon className='h-6 w-6' />
            </span>
        </div>
    )
}
