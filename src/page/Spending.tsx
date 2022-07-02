import { ArrowSmRightIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { ButtonMenu } from '~/components'

const Spending = () => {
    return (
        <>
            <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
                <main className='lg:col-span-12 xl:col-span-10'>
                    <div className='xl:hidden block'>
                        <ButtonMenu />
                    </div>

                    <Divider className='xl:hidden' />

                    <Transaction>
                        <div className='xl:space-y-6 space-y-4'>
                            {/* <Transaction.Divider /> */}
                            <Transaction.Box title='Giao dịch gần đây'>
                                <RecentTransactionList />
                            </Transaction.Box>
                            {/* <Transaction.Divider /> */}
                            <Transaction.Box title='Phương thức thanh toán'>
                                <MethodTransactionList />
                            </Transaction.Box>
                        </div>
                        <div className='xl:space-y-6 space-y-4'>
                            <Transaction.Box title='Phương thức thanh toán'>
                                <MethodTransactionList />
                            </Transaction.Box>
                            <Transaction.Box title='Giao dịch gần đây'>
                                <RecentTransactionList />
                            </Transaction.Box>
                        </div>
                    </Transaction>
                </main>
                <aside className='hidden xl:block xl:col-span-2'>
                    <div className='sticky top-4 space-y-4'>
                        <ButtonMenu />
                    </div>
                </aside>
            </div>
        </>
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

const Transaction = ({ children }: { children?: React.ReactNode }) => (
    <div className='grid xl:grid-cols-2 grid-cols-1 xl:gap-6 gap-4'>{children}</div>
)

interface BoxProps {
    title?: string
    seeMore?: boolean
    children: React.ReactNode
}

const Box = ({ title, seeMore = true, children }: BoxProps) => {
    return (
        <div className='max-w-lg w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none'>
            <TransactionTitle title={title} />
            {children}
            <TransactionSeeMore seeMore={seeMore} />
        </div>
    )
}

const Divider = ({ className }: { className?: string }) => (
    <div className={clsx('py-6 flex items-center max-w-lg mx-auto', className)} aria-hidden='true'>
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
