import { SanityDocument } from '@sanity/client'
import { toast } from 'react-toastify'
import { IFetchGoogleResponse, ILoginByEmailPassword, IUserProfile } from '~/@types/auth'
import axios from '~/axiosConfig'
import { CODE } from '~/constant/code'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_DATA_BY_EMAIL } from '~/schema/query/login'

const { t } = i18n

export const fetchGoogleResponse: IFetchGoogleResponse = async (res, addUserToken, setLoading, navigate) => {
    try {
        setLoading(true)
        const credential = res.credential
        if (credential) {
            const d = (await axios.post('/auth/google/sign-in', {
                credential,
            })) as { accessToken: string; refreshToken: string; code: CODE }

            if (d.code === CODE.CHECK_2FA) {
                navigate('/auth/2fa', { state: { credential } })
                return
            }

            addUserToken({
                accessToken: d.accessToken,
                refreshToken: d.refreshToken,
            })
        }
    } catch (error) {
        console.error(error)
        toast.error(t(LANGUAGE.ERROR))
    } finally {
        setLoading(false)
    }
}

export const loginByEmailPassword: ILoginByEmailPassword = async (
    { data, password },
    addUserToken,
    setLoading,
    navigate
) => {
    try {
        setLoading(true)
        const document = {
            _id: data._id,
            password,
        }
        const d = (await axios.post('/auth/sign-in', document)) as {
            accessToken: string
            refreshToken: string
            code: CODE
        }

        if (d.code === CODE.CHECK_2FA) {
            navigate('/auth/2fa', { state: { _id: document._id } })
            return
        }

        addUserToken({
            accessToken: d.accessToken,
            refreshToken: d.refreshToken,
        })
    } catch (error) {
        console.error({ error })
    } finally {
        setLoading(false)
    }
}

export const getDataByEmail = async (email: string) => {
    try {
        const document = {
            email,
        }
        return await client.fetch<Array<SanityDocument<IUserProfile> & { isHasPassword: boolean }>>(
            GET_DATA_BY_EMAIL,
            document
        )
    } catch (error) {
        throw error
    }
}
