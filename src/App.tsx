import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { useLayoutEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DefaultLayout } from '~/layout'
import { AppProviders, LayoutProviders } from './Providers'
import { ErrorFallback, PermissionCheck } from './components'
import { LOCAL_STORAGE_KEY } from './constant/localStorage'
import { PERMISSION } from './constant/permission'
import { useLocalStorage, useWindowSize } from './hook'
import { checkDarkTheme } from './utils'
import Dashboard from './Dashboard'

const AuthFeature = React.lazy(() => import('./features/auth'))
const SpendingFeature = React.lazy(() => import('./features/spending'))
const LoanFeature = React.lazy(() => import('./features/loan'))
const TimeFeature = React.lazy(() => import('./features/time'))
const ProfileFeature = React.lazy(() => import('./features/profile'))
const AnnounceConfigFeature = React.lazy(() => import('./features/announce-config'))
const AccountFeature = React.lazy(() => import('./features/account'))
const NotifyFeature = React.lazy(() => import('./features/notify'))
const SettingFeature = React.lazy(() => import('./features/setting'))
const FeedbackFeature = React.lazy(() => import('./features/feedback'))
const FeedbackConfigFeature = React.lazy(() => import('./features/feedback-config'))
const RoleControlFeature = React.lazy(() => import('./features/role-control'))

function App() {
    const [theme] = useLocalStorage<string>(LOCAL_STORAGE_KEY.STL_THEME)

    useLayoutEffect(() => {
        checkDarkTheme(theme)
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark')
    }, [])

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <Toast />
                    <AppProviders>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <LayoutProviders>
                                        <DefaultLayout />
                                    </LayoutProviders>
                                }
                            >
                                <Route index element={<Dashboard />} />
                                <Route
                                    path='spending/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.SPENDING_READ]}>
                                            <SpendingFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='time/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.TIME_READ]}>
                                            <TimeFeature />
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
                                <Route
                                    path='setting/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.PROFILE_READ]}>
                                            <SettingFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='feedback/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.FEEDBACK]}>
                                            <FeedbackFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='feedback-config/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.FEEDBACK_CONFIG]}>
                                            <FeedbackConfigFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route
                                    path='role-control/*'
                                    element={
                                        <PermissionCheck permissions={[PERMISSION.ROLE_CONTROL]}>
                                            <RoleControlFeature />
                                        </PermissionCheck>
                                    }
                                />
                                <Route path='*' element={<Navigate to='/' />} />
                            </Route>
                            <Route path='/auth/*' element={<AuthFeature />} />
                        </Routes>
                    </AppProviders>
                </ErrorBoundary>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

const Toast = () => {
    const { width } = useWindowSize()

    return (
        <ToastContainer
            position={width > 768 ? 'top-center' : 'bottom-center'}
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
    )
}

export default App
