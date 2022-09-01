import { GoogleData, IFetchGoogleResponse } from '~/@types/auth'

export const fetchGoogleResponse: IFetchGoogleResponse = async (res, addUser, setLoading) => {
    try {
        setLoading(true)
        const credential = res.credential
        if (credential) {
            const jwtDecode = (await import('jwt-decode')).default
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
                const { client } = await import('~/sanityConfig')
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
