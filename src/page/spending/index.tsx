import { Outlet } from 'react-router-dom'
import { menuPages, menuPC } from '~/constant/components'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import { ButtonMenu, ButtonMenuMobile } from './components'
import Dashboard from './dashboard'
import Method from './method'
import MethodDetail from './method-detail'
import Transaction from './transaction'
import TransactionDetail from './transaction-detail'

const Spending = () => {
    const { width } = useWindowSize()
    const { loading } = useLoading()

    return (
        <>
            <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
                <main className='lg:col-span-12 xl:col-span-11'>{loading ? null : <Outlet />}</main>
                {width >= 1280 ? (
                    <aside className='hidden xl:block xl:col-span-1'>
                        <div className='sticky z-20 top-6 space-y-4'>
                            <ButtonMenu data={menuPC} />
                        </div>
                    </aside>
                ) : (
                    <>
                        <div className='h-20' />
                        <aside className='block xl:hidden fixed bottom-0 bg-white border-t-2 border-gray-300 left-0 right-0 h-20'>
                            <ButtonMenuMobile data={menuPages} />
                        </aside>
                    </>
                )}
            </div>
        </>
    )
}

Spending.Dashboard = Dashboard
Spending.Transaction = Transaction
Spending.TransactionDetail = TransactionDetail
Spending.Method = Method
Spending.MethodDetail = MethodDetail

export default Spending
