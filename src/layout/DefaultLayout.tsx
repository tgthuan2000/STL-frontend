import { Suspense, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { checkDarkTheme } from '~/utils'
import SideBar from './components/SideBar'

const DefaultLayout = () => {
    const { t } = useTranslation()
    const [theme] = useLocalStorage<string>(LOCAL_STORAGE_KEY.STL_THEME)

    useLayoutEffect(() => {
        checkDarkTheme(theme)
            ? document.documentElement.classList.add('dark')
            : document.documentElement.classList.remove('dark')
    }, [])

    return (
        <SideBar>
            <Suspense fallback={<div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.LOADING)}</div>}>
                <Outlet />
            </Suspense>
        </SideBar>
    )
}

export default DefaultLayout
