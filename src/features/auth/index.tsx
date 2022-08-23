import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const AuthPage = React.lazy(() => import('./pages/Auth'))

const Auth = () => {
    return (
        <Routes>
            <Route index element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Auth
