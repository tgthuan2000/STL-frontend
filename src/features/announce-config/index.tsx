import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Detail = React.lazy(() => import('./pages/Detail'))

const Auth = () => {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route path='create' element={<Detail />} />
            <Route path=':id' element={<Detail />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Auth
