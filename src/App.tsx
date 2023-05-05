import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { DefaultLayout } from '~/layout'
import Dashboard from './Dashboard'
import { AppProviders, LayoutProviders } from './Providers'
import { ErrorFallback, PermissionCheck } from './components'
import { PERMISSION } from './constant/permission'

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
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
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

export default App
