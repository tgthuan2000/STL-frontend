import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const TimePage = React.lazy(() => import('./pages/Time'))

const Time = () => {
    return (
        <Routes>
            <Route index element={<TimePage />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Time
