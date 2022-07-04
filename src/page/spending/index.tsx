import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ButtonMenu } from '~/components'
import { menuPC } from '~/constant/components'
import { useLoading } from '~/context'
import { useWindowSize } from '~/hook'
import Dashboard from './dashboard'
import Method from './method'
import MethodDetail from './method-detail'
import Transaction from './transaction'
import TransactionDetail from './transaction-detail'

const Spending = () => {
    const { setLoading } = useLoading()
    useEffect(() => {
        setLoading(true)
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 1500)

        return () => timeout && clearTimeout(timeout)
    }, [])

    const { width } = useWindowSize()

    return (
        <>
            <div className='lg:grid lg:grid-cols-12 xl:gap-6 gap-4'>
                <main className='lg:col-span-12 xl:col-span-11'>
                    <Outlet />
                </main>
                {width >= 1280 && (
                    <aside className='hidden xl:block xl:col-span-1'>
                        <div className='sticky top-4 space-y-4'>
                            <ButtonMenu data={menuPC} />
                        </div>
                    </aside>
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
