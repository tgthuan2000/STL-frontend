import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const AnnounceConfigFeature = lazy(() => import('./pages/AnnounceConfig'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Create = lazy(() => import('./pages/Create'))
const Detail = lazy(() => import('./pages/Detail'))
const Edit = lazy(() => import('./pages/Edit'))

const AnnounceConfig = () => {
    return (
        <Routes>
            <Route path='/' element={<AnnounceConfigFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='create' element={<Create />} />
                <Route path=':id' element={<Detail />} />
                <Route path=':id/edit' element={<Edit />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AnnounceConfig
