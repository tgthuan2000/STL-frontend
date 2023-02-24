import { useRef } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from '~/axiosConfig'
import { TwoFactorForm } from '~/components'
import { useLoading } from '~/context'
import { useAuth, useProfile } from '~/store/auth'

const TwoFactor = () => {
    const { state } = useLocation()
    const { loading, setSubmitLoading } = useLoading()
    const navigate = useNavigate()
    const { setToken } = useAuth()
    const { addUserProfile } = useProfile()
    const ref = useRef<{ clear: () => void }>(null)

    const handleSubmit = async (code: string) => {
        try {
            setSubmitLoading(true)
            const body: { [x: string]: string } = {
                code,
            }
            if (state?._id) {
                body._id = state._id
            }
            if (state?.credential) {
                body.credential = state.credential
            }
            const data = (await axios.post('/auth/2fa', body)) as {
                accessToken: string
                refreshToken: string
                data: any
            }
            setToken({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            })
            addUserProfile(data.data)
            navigate('/')
        } catch (error) {
            console.log(error)
            ref.current?.clear()
        } finally {
            setSubmitLoading(false)
        }
    }

    if (!state?._id && !state?.credential) {
        return <Navigate to='/auth' />
    }

    return (
        <div className='flex h-screen items-center justify-center overflow-hidden'>
            <TwoFactorForm onSubmit={handleSubmit} disabled={loading.submit} ref={ref} />
        </div>
    )
}

export default TwoFactor
