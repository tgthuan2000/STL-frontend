import { useAutoAnimate } from '@formkit/auto-animate/react'
import { GoogleLogin } from '@react-oauth/google'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '~/components'
import { useLoading } from '~/context'
import useAuth from '~/store/auth'
import { fetchGoogleResponse, loginByEmailPassword } from '../services'

const LoginByEmailPasswordForm = React.lazy(() => import('../components/LoginByEmailPasswordForm'))

const Auth = () => {
    const { addUserProfile, userProfile } = useAuth()
    const { setConfigLoading } = useLoading()

    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [showFormLogin, setShowFormLogin] = useState(false)

    if (userProfile) return <Navigate to='/' />

    return (
        <div className='h-screen flex flex-col gap-2 items-center justify-center overflow-hidden' ref={parent}>
            {!showFormLogin ? (
                <>
                    <GoogleLogin
                        onSuccess={async (res) => await fetchGoogleResponse(res, addUserProfile, setConfigLoading)}
                        onError={() => {}}
                    />
                    <span className='text-xs'>Hoặc</span>
                    <Button
                        className='sm:!text-sm border-transparent !text-xs sm:!py-3 sm:!px-6 !w-auto bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59] animate-bg-animate bg-400% text-white'
                        type='button'
                        color='custom'
                        onClick={() => setShowFormLogin(true)}
                    >
                        Đăng nhập bằng email & mật khẩu
                    </Button>
                </>
            ) : (
                <LoginByEmailPasswordForm
                    onSubmit={async (data) => loginByEmailPassword(data, addUserProfile, setConfigLoading)}
                    onBack={() => setShowFormLogin(false)}
                />
            )}
        </div>
    )
}

export default Auth
