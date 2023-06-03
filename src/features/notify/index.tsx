import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const NotifyFeature = lazy(() => import('./pages/Notify'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Detail = lazy(() => import('./pages/Detail'))

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
