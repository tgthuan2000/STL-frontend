import { SanityDocument } from '@sanity/client'

export interface GetCategorySpending<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
    kindSpending: string
}
export interface GetMethodKindSpending<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
}

export interface GetMethodSpending<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
}

export interface GetStatisticSpending<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
}

export interface GetRecentSpending<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
}

export interface GetAllRecentSpending<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
}

export interface GetRecentLoan<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
    kindLoan: string
    kindGetLoan: string
}

export interface GetPayDueLoan<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
    kindLoan: string
    kindGetLoan: string
}

export interface GetStatisticLoan<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
}
