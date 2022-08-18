import { SanityImageAssetDocument } from '@sanity/client'
import { KIND_LOAN } from '~/constant/loan'
import { IMethodSpending } from './spending'

// INTERFACES
export interface IUserLoan {
    _id: string
    userName: string
    surplus: number
    image?: SanityImageAssetDocument
}

export interface IKindLoan {
    _id: string
    name: string
    key: KIND_LOAN
}
export interface ILoanData {
    _id: string
    amount: number
    kindLoan: IKindLoan
    payDate: string
    userLoan: IUserLoan
    paid: boolean
    methodSpending: IMethodSpending
    description?: string
}

// PROPS
export interface StatusLoanProps {
    data: ILoanData[] | undefined
    loading: boolean
    label: string
}
export interface PayDueLoanProps {
    data: ILoanData[] | undefined
    loading: boolean
    label: string
}
