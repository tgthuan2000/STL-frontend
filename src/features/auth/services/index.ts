import jwtDecode from 'jwt-decode'
import { GoogleData, IFetchGoogleResponse, ILoginByEmailPassword } from '~/@types/auth'
import { client } from '~/sanityConfig'
import { LOGIN_BY_EMAIL_PASSWORD } from '~/schema/query/login'
import bcrypt from 'bcryptjs'
import { SanityDocument } from '@sanity/client'
import { IUserProfile } from '~/@types/auth'
import { toast } from 'react-toastify'

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

interface RespondLoginByEmailPassword {
    _id: string
    _type: string
    userName: string
    email: string
    image: string
}

export const loginByEmailPassword: ILoginByEmailPassword = async (data, addUser, setLoading) => {
    try {
        setLoading(true)
        const { email, password } = data
        const document = {
            userName: email,
        }

        const d = await client.fetch<SanityDocument<IUserProfile> & { password: string }>(
            LOGIN_BY_EMAIL_PASSWORD,
            document
        )
        const isMatch = bcrypt.compareSync(password, d.password)
        if (!isMatch) {
            toast.error('Email hoặc mật khẩu không đúng')
            return
        }
        const { password: _, ...rest } = d
        addUser(rest)
    } catch (error) {
        console.error(error)
        toast.error('Đã có lỗi xảy ra')
    } finally {
        setLoading(false)
    }
}
