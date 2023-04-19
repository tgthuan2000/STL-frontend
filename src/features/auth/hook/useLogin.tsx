import { CredentialResponse } from '@react-oauth/google'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '~/@types/auth'
import { CODE } from '~/constant/code'
import { useLoading } from '~/context'
import useAxios from '~/hook/useAxios'
import { useAuth } from '~/store/auth'

const useLogin = () => {
    const axios = useAxios()
    const { setConfigLoading } = useLoading()
    const navigate = useNavigate()
    const { setToken } = useAuth()

    const signInWithGoogle = useCallback(
        async (res: CredentialResponse) => {
            try {
                setConfigLoading(true)
                const credential = res.credential
                if (credential) {
                    const { data, code } = await axios.post<{ accessToken: string; refreshToken: string }>(
                        '/auth/google/sign-in',
                        { credential }
                    )

                    if (code) {
                        if (code === CODE.INACTIVE_ACCOUNT) {
                            return
                        }

                        if (code === CODE.CHECK_2FA) {
                            navigate('/auth/2fa', { state: { credential } })
                            return
                        }
                    }
                    if (data) {
                        setToken({ accessToken: data.accessToken, refreshToken: data.refreshToken })
                    }
                }
            } catch (error) {
                console.error(error)
            } finally {
                setConfigLoading(false)
            }
        },
        [axios]
    )

    const signInWithEmailPassword = useCallback(
        async ({ data, password }: LoginForm) => {
            try {
                setConfigLoading(true)
                const document = {
                    _id: data._id,
                    password,
                }
                const { data: _data, code } = await axios.post<{
                    accessToken: string
                    refreshToken: string
                    code: CODE
                }>('/auth/sign-in', document)

                if (code) {
                    if (code === CODE.INACTIVE_ACCOUNT) {
                        return
                    }

                    if (code === CODE.CHECK_2FA) {
                        navigate('/auth/2fa', { state: { _id: document._id } })
                        return
                    }
                }
                if (_data) {
                    setToken({ accessToken: _data.accessToken, refreshToken: _data.refreshToken })
                }
            } catch (error) {
                console.error({ error })
            } finally {
                setConfigLoading(false)
            }
        },
        [axios]
    )

    return {
        signInWithGoogle,
        signInWithEmailPassword,
    }
}

export default useLogin
