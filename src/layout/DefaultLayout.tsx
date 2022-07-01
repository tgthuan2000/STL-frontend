import { Outlet } from 'react-router-dom'
import SideBar from './components/SideBar'

const DefaultLayout = () => {
    return (
        <SideBar>
            <Outlet />
        </SideBar>
    )
}

export default DefaultLayout
