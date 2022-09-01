import React, { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useConfig } from '~/context'
import useAuth from '~/store/auth'

const SideBar = React.lazy(() => import('./components/SideBar'))

const privateHOC = (Component: () => JSX.Element) => () => {
    const { userProfile } = useAuth()

    if (!userProfile) return <Navigate to='/auth' />
    return <Component />
}

const DefaultLayout = () => {
    const { ok } = useConfig()
    return (
        <Suspense fallback={<div className='text-radical-red-500 font-normal text-xl'>App Loading...</div>}>
            <SideBar>
                {ok && (
                    <Suspense fallback={<div>Content Loading...</div>}>
                        <Outlet />
                    </Suspense>
                )}
            </SideBar>
        </Suspense>
    )
}

export default privateHOC(DefaultLayout)
