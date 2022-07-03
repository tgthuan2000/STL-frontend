import jwtDecode from 'jwt-decode'
import { GoogleData, IFetchGoogleResponse } from '~/@types/auth'
import { client } from '~/sanityConfig'

export const fetchGoogleResponse: IFetchGoogleResponse = async (res, addUser) => {
    try {
        const credential = res.credential
        if (credential) {
            const data: GoogleData = jwtDecode(credential)
            if (data) {
                const { sub, image, userName } = data
                const document = {
                    _type: 'user',
                    _id: sub,
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
