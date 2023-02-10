import { Suspense, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useConfig } from '~/context'
import { useLocalStorage } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import useAuth from '~/store/auth'
import { checkDarkTheme } from '~/utils'
import SideBar from './components/SideBar'

const privateHOC = (Component: () => JSX.Element) => () => {
    const { userProfile } = useAuth()
    const { pathname } = useLocation()
    if (!userProfile) return <Navigate to='/auth' state={{ url: pathname }} />
    return <Component />
}

const DefaultLayout = () => {
    const { t } = useTranslation()
    const { ok } = useConfig()
    const [theme] = useLocalStorage<string>(LOCAL_STORAGE_KEY.STL_THEME)

    useLayoutEffect(() => {
        checkDarkTheme(theme)
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark')
    }, [])

    return (
        <SideBar>
            {ok && (
                <Suspense fallback={<div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.LOADING)}</div>}>
                    <Outlet />
                </Suspense>
            )}
        </SideBar>
    )
}

export default privateHOC(DefaultLayout)
