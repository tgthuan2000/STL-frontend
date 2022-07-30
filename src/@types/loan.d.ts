import { SanityAssetDocument } from '@sanity/client'

export interface IUserLoan {
    _id: string
    userName: string
    image: SanityAssetDocument
}
