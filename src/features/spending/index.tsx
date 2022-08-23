import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GETALL_RECENT_SPENDING, GET_RECENT_SPENDING } from '~/schema/query/spending'

const SpendingFeature = React.lazy(() => import('./pages/Spending'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Method = React.lazy(() => import('./pages/Method'))
const MethodDetail = React.lazy(() => import('./pages/MethodDetail'))
const Transaction = React.lazy(() => import('./pages/Transaction'))
const TransactionDetail = React.lazy(() => import('./pages/TransactionDetail'))
const TransactionTabTable = React.lazy(() => import('./pages/TransactionTabTable'))

const Loan = () => {
    return (
        <Routes>
            <Route path='/' element={<SpendingFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction' element={<Transaction />}>
                    <Route index element={<Navigate to='tab-all' />} />
                    <Route
                        path='tab-all'
                        element={<TransactionTabTable query={{ recent: GETALL_RECENT_SPENDING }} />}
                    />
                    <Route
                        path='tab-day'
                        element={
                            <TransactionTabTable query={{ recent: GET_RECENT_SPENDING }} params={{ from: 0, to: 5 }} />
                        }
                    />
                    <Route
                        path='tab-week'
                        element={
                            <TransactionTabTable query={{ recent: GET_RECENT_SPENDING }} params={{ from: 5, to: 10 }} />
                        }
                    />
                    <Route
                        path='tab-month'
                        element={
                            <TransactionTabTable
                                query={{ recent: GET_RECENT_SPENDING }}
                                params={{ from: 10, to: 15 }}
                            />
                        }
                    />
                    <Route
                        path='tab-year'
                        element={
                            <TransactionTabTable
                                query={{ recent: GET_RECENT_SPENDING }}
                                params={{ from: 15, to: 20 }}
                            />
                        }
                    />
                </Route>
                <Route path='transaction/:id' element={<TransactionDetail />} />
                <Route path='method' element={<Method />} />
                <Route path='method/:id' element={<MethodDetail />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Loan
