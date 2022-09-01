import { GoogleLogin } from '@react-oauth/google'
import { Navigate } from 'react-router-dom'
import { useLoading } from '~/context'
import useAuth from '~/store/auth'

const Auth = () => {
    const { addUserProfile, userProfile } = useAuth()
    const { setConfigLoading } = useLoading()
    if (userProfile) return <Navigate to='/' />

    return (
        <div className='h-screen flex items-center justify-center overflow-hidden'>
            <GoogleLogin
                onSuccess={async (res) => {
                    const { fetchGoogleResponse } = await import('../services')
                    fetchGoogleResponse(res, addUserProfile, setConfigLoading)
                }}
                onError={() => {}}
            />
        </div>
    )
}

export default Auth
