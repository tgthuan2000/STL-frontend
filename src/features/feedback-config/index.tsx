import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const FeedbackConfigFeature = React.lazy(() => import('./pages/FeedbackConfig'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))

const FeedbackConfig = () => {
    return (
        <Routes>
            <Route path='/' element={<FeedbackConfigFeature />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default FeedbackConfig
