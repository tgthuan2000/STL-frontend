import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Transaction } from '~/components'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Create = React.lazy(() => import('./pages/Create'))
const Detail = React.lazy(() => import('./pages/Detail'))

const AnnounceConfig = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <Transaction title='Quản lý thông báo' hasBack={false}>
                        <Dashboard />
                    </Transaction>
                }
            />
            <Route
                path='create'
                element={
                    <Transaction title='Tạo thông báo'>
                        <Create />
                    </Transaction>
                }
            />
            <Route
                path=':id'
                element={
                    <Transaction title='Chỉnh sửa thông báo'>
                        <Detail />
                    </Transaction>
                }
            />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AnnounceConfig
