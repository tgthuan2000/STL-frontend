import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { TwoFactorForm } from '~/components'
import { useLoading } from '~/context'
import { useAxios } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { useAuth } from '~/store/auth'

const TwoFactor = () => {
    const { t } = useTranslation()
    const { state } = useLocation()
    const { loading, setSubmitLoading } = useLoading()
    const navigate = useNavigate()
    const { setToken } = useAuth()
    const ref = useRef<{ clear: () => void }>(null)
    const axios = useAxios()

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
            const { data } = await axios.post<{ accessToken: string; refreshToken: string }>('/auth/2fa', body)

            if (data?.accessToken && data?.refreshToken) {
                setToken({ accessToken: data.accessToken, refreshToken: data.refreshToken })
                navigate('/')
            }
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
            <div className='flex flex-1 flex-col items-center justify-center gap-10'>
                <p className='max-w-[400px] text-center text-sm text-gray-900 dark:text-slate-200 sm:text-base'>
                    {t(LANGUAGE.TWO_FA_DESCRIPTION)}
                </p>
                <TwoFactorForm onSubmit={handleSubmit} disabled={loading.submit} ref={ref} />
            </div>
        </div>
    )
}

export default TwoFactor
