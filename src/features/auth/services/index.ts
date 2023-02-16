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

export const fetchGoogleResponse: IFetchGoogleResponse = async (res, addUser, setLoading) => {
    try {
        setLoading(true)
        const credential = res.credential
        if (credential) {
            const { data: d } = await axios.post<{ code: string; token: string; data: any }>(
                '/auth/google/sign-in',
                credential
            )
            switch (d.code) {
                case CODE.SUCCESS:
                    addUser(d.data)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${d.token}`
                    break
                default:
                    toast.error(t(LANGUAGE.ERROR))
                    break
            }
        }
    } catch (error) {
        console.error(error)
        toast.error(t(LANGUAGE.ERROR))
    } finally {
        setLoading(false)
    }
}

export const loginByEmailPassword: ILoginByEmailPassword = async ({ data, password }, addUser, setLoading) => {
    try {
        setLoading(true)
        const document = {
            _id: data._id,
            password,
        }
        const { data: d } = await axios.post<{ code: string; token: string }>('/auth/sign-in', document)
        switch (d.code) {
            case CODE.SUCCESS:
                addUser(data)
                axios.defaults.headers.common['Authorization'] = `Bearer ${d.token}`
                break
            case CODE.INVALID_PASSWORD:
                toast.error(t(LANGUAGE.PASSWORD_NOT_MATCH))
                break
            default:
                toast.error(t(LANGUAGE.ERROR))
                break
        }
    } catch (error) {
        console.error({ error })
        toast.error(t(LANGUAGE.ERROR))
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
