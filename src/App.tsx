import React, { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from '~/layout'
import { Loading } from './components'
import { ConfigProvider, LoadingProvider } from './context'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CacheProvider } from './context/CacheContext'

const AuthFeature = React.lazy(() => import('./features/auth'))
const SpendingFeature = React.lazy(() => import('./features/spending'))
const LoanFeature = React.lazy(() => import('./features/loan'))
const TimeKeepingFeature = React.lazy(() => import('./features/time-keeping'))

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <LoadingProvider>
                    <Loading />
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
                            <Route path='spending/*' element={<SpendingFeature />} />

                            <Route path='timekeeping/*' element={<TimeKeepingFeature />} />
                            <Route path='loan/*' element={<LoanFeature />} />
                            <Route path='*' element={<Navigate to='/' />} />
                        </Route>
                        <Route path='/auth' element={<AuthFeature />} />
                    </Routes>
                </LoadingProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App
