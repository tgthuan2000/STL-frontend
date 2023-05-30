import { googleLogout } from '@react-oauth/google'
import { useCallback } from 'react'
import axios from '~/axiosConfig'
import { useAuth, useProfile } from '~/store/auth'
import useAxios from './useAxios'

interface logoutOptions {
    withLogoutApi?: boolean
}

const useLogout = () => {
    const { removeToken, refreshToken } = useAuth()
    const { removeUserProfile } = useProfile()
    const _axios = useAxios()

    const logout = useCallback(async (options: logoutOptions = {}) => {
        const { withLogoutApi } = options
        removeToken()
        removeUserProfile()
        googleLogout()
        if (withLogoutApi) {
            await _axios.post('/auth/logout', { refreshToken })
        }
        axios.defaults.headers.common['Authorization'] = null
    }, [])

    return logout
}

export default useLogout
