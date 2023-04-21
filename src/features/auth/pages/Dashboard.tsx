import { GoogleLogin } from '@react-oauth/google'
import { get } from 'lodash'
import React, { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation } from 'react-router-dom'
import { Button } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { useAuth } from '~/store/auth'
import useLogin from '../hook/useLogin'

const LoginByEmailPasswordForm = React.lazy(() => import('../components/LoginByEmailPasswordForm'))

const Dashboard = () => {
    const { t } = useTranslation()
    const { accessToken } = useAuth()
    const { state } = useLocation()
    const { signInWithGoogle, signInWithEmailPassword } = useLogin()
    const [showFormLogin, setShowFormLogin] = useState(false)

    if (accessToken) return <Navigate to={get(state, 'url', '/')} />

    if (showFormLogin) {
        return <LoginByEmailPasswordForm onSubmit={signInWithEmailPassword} onBack={() => setShowFormLogin(false)} />
    }

    return (
        <Fragment>
            <GoogleLogin onSuccess={signInWithGoogle} onError={() => {}} />
            <span className='text-xs text-gray-900 dark:text-white'>{t(LANGUAGE.OR)}</span>
            <Button
                className='!w-auto animate-bg-animate border-transparent bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] bg-400% !text-xs text-white sm:!py-3 sm:!px-6 sm:!text-sm'
                type='button'
                color='custom'
                onClick={() => setShowFormLogin(true)}
            >
                {t(LANGUAGE.LOGIN_WITH_EMAIL_PASSWORD)}
            </Button>
        </Fragment>
    )
}

export default Dashboard
