import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const SettingFeature = React.lazy(() => import('./pages/Setting'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const ChangePassword = React.lazy(() => import('./pages/ChangePassword'))

const Setting = () => {
    return (
        <Routes>
            <Route path='/' element={<SettingFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='change-password' element={<ChangePassword />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    )
}

export default Setting
