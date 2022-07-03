import jwtDecode from 'jwt-decode'
import { GoogleData, IFetchGoogleResponse, IUserProfile } from '~/@types/auth'
import { client } from '~/sanityConfig'

export const fetchGoogleResponse: IFetchGoogleResponse = async (res, addUser) => {
    try {
        const credential = res.credential
        if (credential) {
            const data: GoogleData = jwtDecode(credential)
            if (data) {
                const { sub, picture, name, email } = data
                const document: IUserProfile = {
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
    }
}
