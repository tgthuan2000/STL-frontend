import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingText from '~/components/Loading/LoadingText'

const Auth = () => {
    return (
        <Suspense fallback={<LoadingText />}>
            <Outlet />
        </Suspense>
    )
}

export default Auth
