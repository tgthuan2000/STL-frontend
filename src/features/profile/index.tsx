import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const ProfileFeature = React.lazy(() => import('./pages/Profile'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))

const Profile = () => {
    return (
        <Routes>
            <Route path='/' element={<ProfileFeature />}>
                <Route index element={<Dashboard />} />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Profile
