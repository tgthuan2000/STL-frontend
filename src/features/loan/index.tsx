import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const LoanFeature = lazy(() => import('./pages/Loan'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const MemberDetail = lazy(() => import('./pages/MemberDetail'))
const TransactionDetail = lazy(() => import('./pages/TransactionDetail'))
const TransactionEdit = lazy(() => import('./pages/TransactionEdit'))
const TransactionRecent = lazy(() => import('./pages/TransactionRecent'))

const Loan = () => {
    return (
        <Routes>
            <Route path='/' element={<LoanFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction/:id/detail' element={<TransactionDetail />} />
                <Route path='transaction/:id/edit' element={<TransactionEdit />} />
                <Route path='member/:id' element={<MemberDetail />} />
                <Route path='transaction' element={<TransactionRecent />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Loan
