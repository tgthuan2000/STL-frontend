import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'
import LANGUAGE from '~/i18n/language/key'

const SpendingFeature = React.lazy(() => import('./pages/Spending'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Method = React.lazy(() => import('./pages/Method'))
const MethodDetail = React.lazy(() => import('./pages/MethodDetail'))
const Transaction = React.lazy(() => import('../../components/Transaction'))
const TransactionDetail = React.lazy(() => import('./pages/TransactionDetail'))
const TransactionRecent = React.lazy(() => import('./pages/TransactionRecent'))
const OthersFeature = React.lazy(() => import('./pages/Others'))

const Spending = () => {
    const { t } = useTranslation()
    return (
        <Routes>
            <Route path='/' element={<SpendingFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='transaction' element={<Transaction title={t(LANGUAGE.TRANSACTION)} />}>
                    <Route index element={<TransactionRecent />} />
                </Route>
                <Route path='transaction/:id' element={<TransactionDetail />} />
                <Route path='method' element={<Transaction title={t(LANGUAGE.METHOD_SPENDING)} />}>
                    <Route index element={<Method />} />
                    <Route path=':id' element={<MethodDetail />} />
                </Route>
                <Route path='others' element={<OthersFeature />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Spending
