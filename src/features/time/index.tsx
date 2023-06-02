import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const TimePage = lazy(() => import('./pages/Time'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Edit = lazy(() => import('./pages/Edit'))

const Time = () => {
    return (
        <Routes>
            <Route path='/' element={<TimePage />}>
                <Route index element={<Dashboard />} />
                <Route path=':id/edit' element={<Edit />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Time
