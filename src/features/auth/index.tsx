import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const AuthPage = React.lazy(() => import('./pages/Auth'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const TwoFactor = React.lazy(() => import('./pages/TwoFactor'))

const Auth = () => {
    return (
        <Routes>
            <Route path='/' element={<AuthPage />}>
                <Route index element={<Dashboard />} />
                <Route path='2fa' element={<TwoFactor />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Auth
