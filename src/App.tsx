import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Auth, Loan, Spending, TimeKeeping } from '~/page'
import { DefaultLayout } from '~/layout'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<DefaultLayout />}>
                    <Route index element={<Navigate to='spending' />} />
                    <Route path='spending' element={<Spending />} />
                    <Route path='timekeeping' element={<TimeKeeping />} />
                    <Route path='loan' element={<Loan />} />
                </Route>
                <Route path='/auth' element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
