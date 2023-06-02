import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const SettingFeature = lazy(() => import('./pages/Setting'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ChangePassword = lazy(() => import('./pages/ChangePassword'))
const Device = lazy(() => import('./pages/Device'))

const Setting = () => {
    return (
        <Routes>
            <Route path='/' element={<SettingFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='change-password' element={<ChangePassword />} />
                <Route path='device' element={<Device />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    )
}

export default Setting
