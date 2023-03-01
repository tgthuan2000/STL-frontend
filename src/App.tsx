import { GoogleOAuthProvider } from '@react-oauth/google'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DefaultLayout } from '~/layout'
import { ErrorFallback, FilePreview, Loading, PermissionCheck, ReloadPrompt } from './components'
import LoadingText from './components/Loading/LoadingText'
import { PERMISSION } from './constant/permission'
import {
    CacheProvider,
    CheckingProvider,
    ConfigProvider,
    FilePreviewProvider,
    LoadingProvider,
    NotifyProvider,
} from './context'

const AuthFeature = React.lazy(() => import('./features/auth'))
const SpendingFeature = React.lazy(() => import('./features/spending'))
const LoanFeature = React.lazy(() => import('./features/loan'))
const TimeKeepingFeature = React.lazy(() => import('./features/time-keeping'))
const ProfileFeature = React.lazy(() => import('./features/profile'))
const AnnounceConfigFeature = React.lazy(() => import('./features/announce-config'))
const AccountFeature = React.lazy(() => import('./features/account'))
const NotifyFeature = React.lazy(() => import('./features/notify'))
const SettingFeature = React.lazy(() => import('./features/setting'))
const FeedbackFeature = React.lazy(() => import('./features/feedback'))

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
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
                        <CheckingProvider>
                            <FilePreviewProvider>
                                <FilePreview />
                                <Suspense fallback={<LoadingText />}>
                                    <Routes>
                                        <Route
                                            path='/'
                                            element={
                                                <ConfigProvider>
                                                    <CacheProvider>
                                                        <NotifyProvider>
                                                            <DefaultLayout />
                                                            <ReloadPrompt />
                                                        </NotifyProvider>
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
                                                        permissions={[
                                                            PERMISSION.PROFILE_READ,
                                                            PERMISSION.ANNOUNCE_CONFIG,
                                                        ]}
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
                                                    <PermissionCheck permissions={[PERMISSION.PROFILE_READ]}>
                                                        <FeedbackFeature />
                                                    </PermissionCheck>
                                                }
                                            />
                                            <Route path='*' element={<Navigate to='/' />} />
                                        </Route>
                                        <Route path='/auth/*' element={<AuthFeature />} />
                                    </Routes>
                                </Suspense>
                            </FilePreviewProvider>
                        </CheckingProvider>
                    </LoadingProvider>
                </ErrorBoundary>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App
