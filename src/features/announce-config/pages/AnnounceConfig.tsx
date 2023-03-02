import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingText from '~/components/Loading/LoadingText'

const AnnounceConfig = () => {
    return (
        <Suspense fallback={<LoadingText />}>
            <Outlet />
        </Suspense>
    )
}

export default AnnounceConfig
