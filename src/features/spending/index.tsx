import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const SpendingFeature = React.lazy(() => import('./pages/Spending'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Method = React.lazy(() => import('./pages/Method'))
const MethodDetail = React.lazy(() => import('./pages/MethodDetail'))
const Category = React.lazy(() => import('./pages/Category'))
const CategoryDetail = React.lazy(() => import('./pages/CategoryDetail'))
const Transaction = React.lazy(() => import('./pages/Transaction'))
const TransactionDetail = React.lazy(() => import('./pages/TransactionDetail'))
const TransactionTab = React.lazy(() => import('./pages/TransactionTab'))

const Loan = () => {
    return (
        <Routes>
            <Route path='/' element={<SpendingFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction' element={<Transaction />}>
                    <Route index element={<Navigate to='tab-all' />} />
                    <Route path='tab-all' element={<TransactionTab by='ALL' />} />
                    <Route path='tab-day' element={<TransactionTab by='DAY' />} />
                    <Route path='tab-week' element={<TransactionTab by='WEEK' />} />
                    <Route path='tab-month' element={<TransactionTab by='MONTH' />} />
                    <Route path='tab-year' element={<TransactionTab by='YEAR' />} />
                </Route>
                <Route path='transaction/:id' element={<TransactionDetail />} />
                <Route path='method' element={<Method />} />
                <Route path='method/:id' element={<MethodDetail />} />
                <Route path='category' element={<Category />} />
                <Route path='category/:id' element={<CategoryDetail />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Loan
