import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const SpendingFeature = lazy(() => import('./pages/Spending'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Method = lazy(() => import('./pages/Method'))
const MethodDetail = lazy(() => import('./pages/MethodDetail'))
const TransactionDetail = lazy(() => import('./pages/TransactionDetail'))
const TransactionRecent = lazy(() => import('./pages/TransactionRecent'))
const Layout = lazy(() => import('./pages/Layout'))
const Others = lazy(() => import('./pages/Others'))
const Budget = lazy(() => import('./pages/Budget'))
const BudgetDetailMethod = lazy(() => import('./pages/BudgetDetailMethod'))
const BudgetDetailCategory = lazy(() => import('./pages/BudgetDetailCategory'))
const LongBudgetDetail = lazy(() => import('./pages/LongBudgetDetail'))

const Spending = () => {
    return (
        <Routes>
            <Route path='/' element={<SpendingFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction' element={<TransactionRecent />} />
                <Route path='transaction/:id' element={<TransactionDetail />} />
                {/* <Route path='method' element={<Method />} /> */}
                <Route path='method/:id' element={<MethodDetail />} />
                <Route path='budget' element={<Budget />} />
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
