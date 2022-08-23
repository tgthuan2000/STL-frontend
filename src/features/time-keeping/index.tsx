import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const TimeKeepingPage = React.lazy(() => import('./pages/TimeKeeping'))

const TimeKeeping = () => {
    return (
        <Routes>
            <Route index element={<TimeKeepingPage />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default TimeKeeping
