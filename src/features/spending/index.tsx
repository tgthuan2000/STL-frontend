import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const SpendingFeature = React.lazy(() => import('./pages/Spending'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Method = React.lazy(() => import('./pages/Method'))
const MethodDetail = React.lazy(() => import('./pages/MethodDetail'))
const Transaction = React.lazy(() => import('../../components/Transaction'))
const TransactionDetail = React.lazy(() => import('./pages/TransactionDetail'))
const TransactionTabTable = React.lazy(() => import('./pages/TransactionTabTable'))

const Spending = () => {
    return (
        <Routes>
            <Route path='/' element={<SpendingFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction' element={<Transaction title='Giao dịch' />}>
                    <Route index element={<TransactionTabTable />} />
                </Route>
                <Route path='transaction/:id' element={<TransactionDetail />} />
                <Route path='method' element={<Transaction title='Phương thức thanh toán' />}>
                    <Route index element={<Method />} />
                </Route>
                <Route path='method/:id' element={<MethodDetail />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Spending
