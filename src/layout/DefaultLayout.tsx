import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '~/store/auth'
import SideBar from './components/SideBar'

const DefaultLayout = () => {
    const { userProfile } = useAuth()
    if (!userProfile) return <Navigate to='/auth' />

    return (
        <SideBar>
            <Outlet />
        </SideBar>
    )
}

export default DefaultLayout
