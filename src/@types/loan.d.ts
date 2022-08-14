import { SanityAssetDocument } from '@sanity/client'

// INTERFACES
export interface IUserLoan {
    _id: string
    userName: string
    image: SanityAssetDocument
}

// PROPS
export interface ListMemberProps {
    data: IUserLoan[] | undefined
    loading: boolean
    label: string
}
