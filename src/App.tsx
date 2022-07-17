import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Auth, Loan, Spending, TimeKeeping } from '~/page'
import { DefaultLayout } from '~/layout'
import { Loading } from './components'
import { ConfigProvider, LoadingProvider } from './context'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { CacheProvider } from './context/CacheContext'
import { GETALL_RECENT_SPENDING, GET_RECENT_SPENDING } from './schema/query/spending'

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
                            <Route path='spending' element={<Spending />}>
                                <Route index element={<Spending.Dashboard />} />
                                <Route path='transaction' element={<Spending.Transaction />}>
                                    <Route index element={<Navigate to='tab-all' />} />
                                    <Route
                                        path='tab-all'
                                        element={
                                            <Spending.TransactionTabTable query={{ recent: GETALL_RECENT_SPENDING }} />
                                        }
                                    />
                                    <Route
                                        path='tab-day'
                                        element={
                                            <Spending.TransactionTabTable
                                                query={{ recent: GET_RECENT_SPENDING }}
                                                params={{ from: 0, to: 5 }}
                                            />
                                        }
                                    />
                                    <Route
                                        path='tab-week'
                                        element={
                                            <Spending.TransactionTabTable
                                                query={{ recent: GET_RECENT_SPENDING }}
                                                params={{ from: 5, to: 10 }}
                                            />
                                        }
                                    />
                                    <Route
                                        path='tab-month'
                                        element={
                                            <Spending.TransactionTabTable
                                                query={{ recent: GET_RECENT_SPENDING }}
                                                params={{ from: 10, to: 15 }}
                                            />
                                        }
                                    />
                                    <Route
                                        path='tab-year'
                                        element={
                                            <Spending.TransactionTabTable
                                                query={{ recent: GET_RECENT_SPENDING }}
                                                params={{ from: 15, to: 20 }}
                                            />
                                        }
                                    />
                                </Route>
                                <Route path='transaction/:id' element={<Spending.TransactionDetail />} />
                                <Route path='method' element={<Spending.Method />} />
                                <Route path='method/:id' element={<Spending.MethodDetail />} />
                            </Route>
                            <Route path='timekeeping' element={<TimeKeeping />} />
                            <Route path='loan' element={<Loan />} />
                        </Route>
                        <Route path='/auth' element={<Auth />} />
                    </Routes>
                </LoadingProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App
