import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PermissionCheck } from '~/components'
import { PERMISSION } from '~/constant/permission'

const ProfileFeature = lazy(() => import('./pages/Profile'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Edit = lazy(() => import('./pages/Edit'))

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
