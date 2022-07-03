import jwtDecode from 'jwt-decode'
import { IFetchGoogleResponse, IUserProfile } from '~/@types/auth'
import { client } from '~/sanityConfig'

export const fetchGoogleResponse: IFetchGoogleResponse = async (res, addUser) => {
    try {
        const credential = res.credential
        if (credential) {
            const data: IUserProfile = jwtDecode(credential)
            if (data) {
                const { _id, image, userName } = data
                const document = {
                    _type: 'user',
                    _id,
                    image,
                    userName,
                }
                const d = await client.createIfNotExists(document)
                addUser(d)
            }
        }
    } catch (error) {
        console.error(error)
    }
}
