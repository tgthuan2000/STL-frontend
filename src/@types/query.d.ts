import { SanityDocument } from '@sanity/client'
import { GetKindSpendingIds } from './context'

export type QueryResult = {
    query: string
    params: { [y: string]: string | number | string[] }
    tags: TAGS
}

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

export interface GetRecentSpendingPaginate<T extends Record<string, any>> {
    userProfile: SanityDocument<T> | null
    getKindSpendingIds: GetKindSpendingIds
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
