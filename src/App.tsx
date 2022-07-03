import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Auth, Loan, Spending, TimeKeeping } from '~/page'
import { DefaultLayout } from '~/layout'
import { Loading } from './components'
import { LoadingProvider } from './context'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <LoadingProvider>
                    <Loading />
                    <Routes>
                        <Route path='/' element={<DefaultLayout />}>
                            <Route index element={<Navigate to='spending' />} />
                            <Route path='spending' element={<Spending />} />
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
