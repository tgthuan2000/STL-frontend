import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const FeedbackFeature = React.lazy(() => import('./pages/Feedback'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))

const Feedback = () => {
    return (
        <Routes>
            <Route path='/' element={<FeedbackFeature />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Feedback
