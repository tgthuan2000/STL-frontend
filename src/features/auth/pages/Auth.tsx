import { GoogleLogin } from '@react-oauth/google'
import { Navigate } from 'react-router-dom'
import { useLoading } from '~/context'
import useAuth from '~/store/auth'
import { fetchGoogleResponse } from '../services'

const Auth = () => {
    const { addUserProfile, userProfile } = useAuth()
    const { setConfigLoading } = useLoading()
    if (userProfile) return <Navigate to='/' />

    return (
        <div className='h-screen flex items-center justify-center overflow-hidden'>
            <GoogleLogin
                onSuccess={(res) => {
                    fetchGoogleResponse(res, addUserProfile, setConfigLoading)
                }}
                onError={() => {}}
            />
        </div>
    )
}

export default Auth