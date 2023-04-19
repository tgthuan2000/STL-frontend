import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const RoleControlFeature = React.lazy(() => import('./pages/RoleControl'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))

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
