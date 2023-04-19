import { SanityDocument } from '@sanity/client'
import { IUserProfile } from '~/@types/auth'
import { client } from '~/sanityConfig'
import { GET_ACTIVE_USERS_BY_EMAIL } from '~/schema/query/login'

export const getActiveUsersByEmail = async (email: string) => {
    try {
        const document = {
            email,
        }
        return await client.fetch<Array<SanityDocument<IUserProfile> & { isHasPassword: boolean }>>(
            GET_ACTIVE_USERS_BY_EMAIL,
            document
        )
    } catch (error) {
        throw error
    }
}
