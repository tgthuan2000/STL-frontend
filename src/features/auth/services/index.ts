import { SanityDocument } from '@sanity/client'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
import { GoogleData, IFetchGoogleResponse, ILoginByEmailPassword, IUserProfile } from '~/@types/auth'
import axios from '~/axiosConfig'
import { CODE } from '~/constant/code'
import { ROLE } from '~/constant/role'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_DATA_BY_EMAIL, GET_DATA_USER_BY_ID } from '~/schema/query/login'

export const fetchGoogleResponse: IFetchGoogleResponse = async (res, addUser, setLoading) => {
    try {
        setLoading(true)
        const credential = res.credential
        if (credential) {
            const data: GoogleData = jwtDecode(credential)
            if (data) {
                const { sub, picture, name, email } = data
                const document = {
                    _type: 'user',
                    _id: sub,
                    image: picture,
                    userName: name,
                    email,
                    google: JSON.stringify(data),
                    allowSendMail: true,
                    role: {
                        _type: 'reference',
                        _ref: ROLE.CLIENT,
                    },
                }
                const d = await client.createIfNotExists(document)
                const _data = await client.fetch(GET_DATA_USER_BY_ID, { _id: d._id })
                addUser(_data)
            }
        }
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

const { t } = i18n

export const loginByEmailPassword: ILoginByEmailPassword = async ({ data, password }, addUser, setLoading) => {
    try {
        setLoading(true)
        const document = {
            _id: data._id,
            password,
        }
        const d = (await axios.post('/auth/sign-in', document)) as any
        switch (d.code) {
            case CODE.SUCCESS:
                addUser(data)
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
