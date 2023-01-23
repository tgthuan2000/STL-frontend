import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))

const Announce = () => {
    return (
        <Routes>
            <Route index element={<Dashboard />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Announce
