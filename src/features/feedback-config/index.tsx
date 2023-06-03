import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const FeedbackConfigFeature = lazy(() => import('./pages/FeedbackConfig'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

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
