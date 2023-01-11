import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Transaction } from '~/components'

const NotifyPage = React.lazy(() => import('./pages/Notify'))
const Detail = React.lazy(() => import('~/components/NotifyDetail'))

const Notify = () => {
    return (
        <Routes>
            {/* <Route index element={<NotifyPage />} /> */}
            <Route
                path=':id'
                element={
                    <Transaction title='Chi tiết thông báo'>
                        <Detail />
                    </Transaction>
                }
            />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Notify
