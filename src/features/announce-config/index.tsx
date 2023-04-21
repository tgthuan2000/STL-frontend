import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const AnnounceConfigFeature = React.lazy(() => import('./pages/AnnounceConfig'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Create = React.lazy(() => import('./pages/Create'))
const Detail = React.lazy(() => import('./pages/Detail'))
const Edit = React.lazy(() => import('./pages/Edit'))

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
