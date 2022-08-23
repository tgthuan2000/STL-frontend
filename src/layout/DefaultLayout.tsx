import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useConfig } from '~/context'
import useAuth from '~/store/auth'
import SideBar from './components/SideBar'

const privateHOC = (Component: () => JSX.Element) => () => {
    const { userProfile } = useAuth()

    if (!userProfile) return <Navigate to='/auth' />
    return <Component />
}

const DefaultLayout = () => {
    const { ok } = useConfig()
    return (
        <SideBar>
            {ok && (
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            )}
        </SideBar>
    )
}

export default privateHOC(DefaultLayout)
