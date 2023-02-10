import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import LANGUAGE from '~/i18n/language/key'

const Setting = () => {
    const { t } = useTranslation()
    return (
        <Suspense fallback={<div className='text-gray-900 dark:text-white'>{t(LANGUAGE.LOADING)}</div>}>
            <Outlet />
        </Suspense>
    )
}

export default Setting
