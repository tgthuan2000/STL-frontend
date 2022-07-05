import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '~/store/auth'
import SideBar from './components/SideBar'

const privateHOC = (Component: () => JSX.Element) => () => {
    const { userProfile } = useAuth()

    if (!userProfile) return <Navigate to='/auth' />
    return <Component />
}

const DefaultLayout = () => {
    return (
        <SideBar>
            <Outlet />
        </SideBar>
    )
}

export default privateHOC(DefaultLayout)
