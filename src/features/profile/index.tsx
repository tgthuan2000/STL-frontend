import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PermissionCheck } from '~/components'
import { PERMISSION } from '~/constant/permission'

const ProfileFeature = React.lazy(() => import('./pages/Profile'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Edit = React.lazy(() => import('./pages/Edit'))

const Profile = () => {
    return (
        <Routes>
            <Route path='/' element={<ProfileFeature />}>
                <Route index element={<Dashboard />} />
                <Route
                    path='edit'
                    element={
                        <PermissionCheck permissions={[PERMISSION.PROFILE_WRITE]}>
                            <Edit />
                        </PermissionCheck>
                    }
                />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default Profile
