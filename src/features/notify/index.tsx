import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const NotifyFeature = React.lazy(() => import('./pages/Notify'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Detail = React.lazy(() => import('./pages/Detail'))

const Notify = () => {
    return (
        <Routes>
            <Route path='/' element={<NotifyFeature />}>
                <Route index element={<Dashboard />} />
                <Route path=':id' element={<Detail />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    )
}

export default Notify
