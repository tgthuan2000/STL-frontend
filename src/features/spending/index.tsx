import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const SpendingFeature = React.lazy(() => import('./pages/Spending'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Method = React.lazy(() => import('./pages/Method'))
const MethodDetail = React.lazy(() => import('./pages/MethodDetail'))
const TransactionDetail = React.lazy(() => import('./pages/TransactionDetail'))
const TransactionRecent = React.lazy(() => import('./pages/TransactionRecent'))
const OthersFeature = React.lazy(() => import('./pages/Others'))

const Spending = () => {
    return (
        <Routes>
            <Route path='/' element={<SpendingFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction' element={<TransactionRecent />} />
                <Route path='transaction/:id' element={<TransactionDetail />} />
                <Route path='method' element={<Method />} />
                <Route path='method/:id' element={<MethodDetail />} />
                <Route path='others' element={<OthersFeature />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Spending
