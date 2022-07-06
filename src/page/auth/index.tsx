import { GoogleLogin } from '@react-oauth/google'
import { Navigate } from 'react-router-dom'
import { useLoading } from '~/context'
import useAuth from '~/store/auth'
import { fetchGoogleResponse } from '~/util/auth'

const Auth = () => {
    const { addUserProfile, userProfile } = useAuth()
    const { setLoading } = useLoading()
    if (userProfile) return <Navigate to='/' />

    return (
        <div className='h-screen flex items-center justify-center overflow-hidden'>
            <GoogleLogin
                onSuccess={(res) => {
                    fetchGoogleResponse(res, addUserProfile, setLoading)
                }}
                onError={() => {}}
            />
        </div>
    )
}

export default Auth
