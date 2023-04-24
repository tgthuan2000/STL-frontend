import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const TimePage = React.lazy(() => import('./pages/Time'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))

const Time = () => {
    return (
        <Routes>
            <Route path='/' element={<TimePage />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Time
