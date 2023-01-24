import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Transaction } from '~/components'

const NotifyFeature = React.lazy(() => import('./pages/Notify'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Detail = React.lazy(() => import('~/components/NotifyDetail'))

const Notify = () => {
    return (
        <Routes>
            <Route path='/' element={<NotifyFeature />}>
                <Route index element={<Dashboard />} />
                <Route
                    path=':id'
                    element={
                        <Transaction title='Chi tiết thông báo'>
                            <Detail />
                        </Transaction>
                    }
                />
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    )
}

export default Notify
