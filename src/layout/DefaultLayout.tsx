import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingText from '~/components/Loading/LoadingText'
import SideBar from './components/SideBar'

const DefaultLayout = () => {
    return (
        <SideBar>
            <Suspense fallback={<LoadingText />}>
                <Outlet />
            </Suspense>
        </SideBar>
    )
}

export default DefaultLayout
