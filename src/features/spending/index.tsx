import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const SpendingFeature = React.lazy(() => import('./pages/Spending'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Method = React.lazy(() => import('./pages/Method'))
const MethodDetail = React.lazy(() => import('./pages/MethodDetail'))
const TransactionDetail = React.lazy(() => import('./pages/TransactionDetail'))
const TransactionRecent = React.lazy(() => import('./pages/TransactionRecent'))
const Layout = React.lazy(() => import('./pages/Layout'))
const Others = React.lazy(() => import('./pages/Others'))
const BudgetDetailMethod = React.lazy(() => import('./pages/BudgetDetailMethod'))
const BudgetDetailCategory = React.lazy(() => import('./pages/BudgetDetailCategory'))
const LongBudgetDetail = React.lazy(() => import('./pages/LongBudgetDetail'))

const Spending = () => {
    return (
        <Routes>
            <Route path='/' element={<SpendingFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction' element={<TransactionRecent />} />
                <Route path='transaction/:id' element={<TransactionDetail />} />
                {/* <Route path='method' element={<Method />} /> */}
                <Route path='method/:id' element={<MethodDetail />} />
                <Route path='budget-method/:id' element={<BudgetDetailMethod />} />
                <Route path='budget-category/:id' element={<BudgetDetailCategory />} />
                <Route path='long-budget/:id' element={<LongBudgetDetail />} />
                <Route path='layout' element={<Layout />} />
                <Route path='others' element={<Others />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Spending
