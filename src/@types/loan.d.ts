import { SanityImageAssetDocument } from '@sanity/client'
import { ISpendingData } from './spending'

// INTERFACES
export interface IUserLoan {
    _id: string
    userName: string
    surplus: number
    image?: SanityImageAssetDocument
}

// PROPS
export interface StatusLoanProps {
    data: ISpendingData[] | undefined
    loading: boolean
    label: string
}
export interface PayDueLoanProps {
    data: ISpendingData[] | undefined
    loading: boolean
    label: string
}
