import { Suspense, useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingText from '~/components/Loading/LoadingText'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import { checkDarkTheme } from '~/utils'
import SideBar from './components/SideBar'

const DefaultLayout = () => {
    const [theme] = useLocalStorage<string>(LOCAL_STORAGE_KEY.STL_THEME)

    useLayoutEffect(() => {
        checkDarkTheme(theme)
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark')
    }, [])

    return (
        <SideBar>
            <Suspense fallback={<LoadingText />}>
                <Outlet />
            </Suspense>
        </SideBar>
    )
}

export default DefaultLayout
