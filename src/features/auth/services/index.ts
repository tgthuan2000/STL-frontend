import jwtDecode from 'jwt-decode'
import { GoogleData, IFetchGoogleResponse } from '~/@types/auth'
import { client } from '~/sanityConfig'

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
