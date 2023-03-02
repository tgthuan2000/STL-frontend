import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingText from '~/components/Loading/LoadingText'

const Account = () => {
    return (
        <Suspense fallback={<LoadingText />}>
            <Outlet />
        </Suspense>
    )
}

export default Account
