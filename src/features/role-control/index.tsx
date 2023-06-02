import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const RoleControlFeature = lazy(() => import('./pages/RoleControl'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const RoleControl = () => {
    return (
        <Routes>
            <Route path='/' element={<RoleControlFeature />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default RoleControl
