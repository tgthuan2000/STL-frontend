import jwtDecode from 'jwt-decode'
import { GoogleData, IFetchGoogleResponse, ILoginByEmailPassword } from '~/@types/auth'
import { client } from '~/sanityConfig'
import { GET_DATA_BY_EMAIL, GET_PASSWORD_BY_EMAIL } from '~/schema/query/login'
import bcrypt from 'bcryptjs'
import { SanityDocument } from '@sanity/client'
import { IUserProfile } from '~/@types/auth'
import { toast } from 'react-toastify'
import { isNil } from 'lodash'

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
                }
                const d = await client.createIfNotExists(document)
                addUser(d)
            }
        }
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

export const loginByEmailPassword: ILoginByEmailPassword = async ({ data, password }, addUser, setLoading) => {
    try {
        setLoading(true)
        const document = {
            email: data.email,
        }
        const d = await client.fetch<{ password: string }>(GET_PASSWORD_BY_EMAIL, document)

        if (isNil(d.password)) {
            toast.warn('Tài khoản chưa được cài đặt để đăng nhập bằng email & mật khẩu')
            return
        }

        const isMatch = bcrypt.compareSync(password, d.password)
        if (!isMatch) {
            toast.error('Email hoặc mật khẩu không đúng')
            return
        }
        addUser(data)
    } catch (error) {
        console.error(error)
        toast.error('Đã có lỗi xảy ra')
    } finally {
        setLoading(false)
    }
}

export const getDataByEmail = async (email: string) => {
    try {
        const document = {
            email,
        }
        return await client.fetch<SanityDocument<IUserProfile>>(GET_DATA_BY_EMAIL, document)
    } catch (error) {
        throw error
    }
}
