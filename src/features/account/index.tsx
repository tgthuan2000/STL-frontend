import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const AccountFeature = lazy(() => import('./pages/Account'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Detail = lazy(() => import('./pages/Detail'))

const Account = () => {
    return (
        <Routes>
            <Route path='/' element={<AccountFeature />}>
                <Route index element={<Dashboard />} />
                <Route path='create' element={<Detail />} />
                <Route path=':id' element={<Detail />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Route>
        </Routes>
    )
}

export default Account
