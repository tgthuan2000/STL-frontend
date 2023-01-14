import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DefaultLayout } from '~/layout'
import { Loading, PermissionCheck } from './components'
import { PERMISSION } from './constant/permission'
import { ConfigProvider, LoadingProvider } from './context'
import { CacheProvider } from './context/CacheContext'

const AuthFeature = React.lazy(() => import('./features/auth'))
const SpendingFeature = React.lazy(() => import('./features/spending'))
const LoanFeature = React.lazy(() => import('./features/loan'))
const TimeKeepingFeature = React.lazy(() => import('./features/time-keeping'))
const ProfileFeature = React.lazy(() => import('./features/profile'))
const AnnounceConfigFeature = React.lazy(() => import('./features/announce-config'))
const AccountFeature = React.lazy(() => import('./features/account'))
const NotifyFeature = React.lazy(() => import('./features/notify'))

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <ToastContainer
                    position='bottom-left'
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='colored'
                />
                <LoadingProvider>
                    <Loading />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <ConfigProvider>
                                        <CacheProvider>
                                            <DefaultLayout />
                                        </CacheProvider>
                                    </ConfigProvider>
                                }
                            >
                                <Route index element={<Navigate to='spending' />} />
                                <Route
                                    path='spending/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.SPENDING_READ]}>
                                            <SpendingFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='timekeeping/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.TIMEKEEPING_READ]}>
                                            <TimeKeepingFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='loan/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.LOAN_READ]}>
                                            <LoanFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='announce-config/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.ANNOUNCE_CONFIG]}>
                                            <AnnounceConfigFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='account/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.ACCOUNT_READ]}>
                                            <AccountFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='profile/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.PROFILE_READ]}>
                                            <ProfileFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='notify/*'
                                    element={
                                        <PermissionCheck
                                            permissions={[PERMISSION.PROFILE_READ, PERMISSION.ANNOUNCE_CONFIG]}
                                        >
                                            <NotifyFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route path='*' element={<Navigate to='/' />} />
                            </Route>
                            <Route path='/auth' element={<AuthFeature />} />
                        </Routes>
                    </Suspense>
                </LoadingProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App
