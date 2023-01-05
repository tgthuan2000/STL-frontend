import { GoogleLogin } from '@react-oauth/google'
import { Navigate } from 'react-router-dom'
import { useLoading } from '~/context'
import useAuth from '~/store/auth'
import { LoginByEmailPasswordForm } from '../components'
import { fetchGoogleResponse, loginByEmailPassword } from '../services'

const Auth = () => {
    const { addUserProfile, userProfile } = useAuth()
    const { setConfigLoading } = useLoading()

    if (userProfile) return <Navigate to='/' />

    return (
        <div className='h-screen flex flex-col gap-2 items-center justify-center overflow-hidden'>
            <GoogleLogin
                onSuccess={async (res) => await fetchGoogleResponse(res, addUserProfile, setConfigLoading)}
                onError={() => {}}
            />
            <span className='text-xs'>Hoặc</span>
            <LoginByEmailPasswordForm
                onSubmit={async (data) => loginByEmailPassword(data, addUserProfile, setConfigLoading)}
            />
        </div>
    )
}

export default Auth
