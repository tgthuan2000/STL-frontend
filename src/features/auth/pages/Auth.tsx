import { useAutoAnimate } from '@formkit/auto-animate/react'
import { GoogleLogin } from '@react-oauth/google'
import { get } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation } from 'react-router-dom'
import { Button } from '~/components'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { useAuth, useProfile } from '~/store/auth'
import { fetchGoogleResponse, loginByEmailPassword } from '../services'

const LoginByEmailPasswordForm = React.lazy(() => import('../components/LoginByEmailPasswordForm'))

const Auth = () => {
    const { t } = useTranslation()
    const { addUserProfile } = useProfile()
    const { accessToken, setToken } = useAuth()
    const { setConfigLoading } = useLoading()
    const { state } = useLocation()

    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [showFormLogin, setShowFormLogin] = useState(false)

    if (accessToken) return <Navigate to={get(state, 'url', '/')} />

    return (
        <div className='h-screen flex flex-col gap-2 items-center justify-center overflow-hidden' ref={parent}>
            {!showFormLogin ? (
                <>
                    <GoogleLogin
                        onSuccess={async (res) =>
                            await fetchGoogleResponse(res, setToken, addUserProfile, setConfigLoading)
                        }
                        onError={() => {}}
                    />
                    <span className='text-xs text-gray-900 dark:text-white'>{t(LANGUAGE.OR)}</span>
                    <Button
                        className='sm:!text-sm border-transparent !text-xs sm:!py-3 sm:!px-6 !w-auto bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] animate-bg-animate bg-400% text-white'
                        type='button'
                        color='custom'
                        onClick={() => setShowFormLogin(true)}
                    >
                        {t(LANGUAGE.LOGIN_WITH_EMAIL_PASSWORD)}
                    </Button>
                </>
            ) : (
                <LoginByEmailPasswordForm
                    onSubmit={async (data) => loginByEmailPassword(data, setToken, addUserProfile, setConfigLoading)}
                    onBack={() => setShowFormLogin(false)}
                />
            )}
        </div>
    )
}

export default Auth
