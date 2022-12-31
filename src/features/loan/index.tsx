import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const LoanFeature = React.lazy(() => import('./pages/Loan'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const MemberDetail = React.lazy(() => import('./pages/MemberDetail'))
const Transaction = React.lazy(() => import('../../components/Transaction'))
const TransactionDetail = React.lazy(() => import('./pages/TransactionDetail'))
const TransactionEdit = React.lazy(() => import('./pages/TransactionEdit'))
const TransactionRecentTable = React.lazy(() => import('./pages/TransactionRecentTable'))

const Loan = () => {
    return (
        <Routes>
            <Route path='/' element={<LoanFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction/:id/detail' element={<TransactionDetail />} />
                <Route path='transaction/:id/edit' element={<TransactionEdit />} />
                <Route path='member/:id' element={<MemberDetail />} />
                <Route path='transaction' element={<Transaction title='Giao dịch' />}>
                    <Route index element={<TransactionRecentTable />} />
                </Route>
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Loan
