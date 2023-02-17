import { SanityDocument } from '@sanity/client'
import { toast } from 'react-toastify'
import { IFetchGoogleResponse, ILoginByEmailPassword, IUserProfile } from '~/@types/auth'
import axios from '~/axiosConfig'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_DATA_BY_EMAIL } from '~/schema/query/login'

const { t } = i18n

export const fetchGoogleResponse: IFetchGoogleResponse = async (res, addUserToken, addUserProfile, setLoading) => {
    try {
        setLoading(true)
        const credential = res.credential
        if (credential) {
            const d = (await axios.post('/auth/google/sign-in', {
                credential,
            })) as { accessToken: string; refreshToken: string; data: any }
            addUserToken({
                accessToken: d.accessToken,
                refreshToken: d.refreshToken,
            })
            addUserProfile(d.data)
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
    addUserProfile,
    setLoading
) => {
    try {
        setLoading(true)
        const document = {
            _id: data._id,
            password,
        }
        const d = (await axios.post('/auth/sign-in', document)) as { accessToken: string; refreshToken: string }

        addUserToken({
            accessToken: d.accessToken,
            refreshToken: d.refreshToken,
        })
        addUserProfile(data)
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
