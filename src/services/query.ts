import { SanityDocument } from '@sanity/client'
import moment from 'moment'
import { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } from '~/schema/query/loan'
import {
    GETALL_RECENT_SPENDING,
    GET_CATEGORY_SPENDING,
    GET_METHOD_SPENDING,
    GET_METHOD_SPENDING_DESC_SURPLUS,
    GET_RECENT_SPENDING,
    GET_STATISTIC_SPENDING,
} from '~/schema/query/spending'
import { getDate } from '.'

interface GetCategorySpending<T> {
    userProfile: SanityDocument<T> | null
    kindSpending: string
}
export const getCategorySpending = <T>({ userProfile, kindSpending }: GetCategorySpending<T>) => {
    return {
        categorySpending: GET_CATEGORY_SPENDING,
        params: { userId: userProfile?._id, kindSpending },
    }
}

// ---------------------------------------------------------------------------------------------------------------------
interface GetMethodKindSpending<T> {
    userProfile: SanityDocument<T> | null
}
export const getMethodSpendingDescSurplus = <T>({ userProfile }: GetMethodKindSpending<T>) => {
    return {
        method: GET_METHOD_SPENDING_DESC_SURPLUS,
        params: { userId: userProfile?._id },
    }
}

// ---------------------------------------------------------------------------------------------------------------------
interface GetMethodSpending<T> {
    userProfile: SanityDocument<T> | null
}
export const getMethodSpending = <T>({ userProfile }: GetMethodSpending<T>) => {
    return {
        methodSpending: GET_METHOD_SPENDING,
        params: { userId: userProfile?._id },
    }
}

// ---------------------------------------------------------------------------------------------------------------------
interface GetStatisticSpending<T> {
    userProfile: SanityDocument<T> | null
}
export const getStatisticSpending = <T>({ userProfile }: GetStatisticSpending<T>) => {
    return {
        statistic: GET_STATISTIC_SPENDING,
        params: { userId: userProfile?._id, startDate: getDate('start'), endDate: getDate('end') },
    }
}

// ---------------------------------------------------------------------------------------------------------------------
interface GetRecentSpending<T> {
    userProfile: SanityDocument<T> | null
}
export const getRecentSpending = <T>({ userProfile }: GetRecentSpending<T>) => {
    return {
        recent: GET_RECENT_SPENDING,
        params: { userId: userProfile?._id, from: 0, to: 5 },
    }
}

// ---------------------------------------------------------------------------------------------------------------------
interface GetAllRecentSpending<T> {
    userProfile: SanityDocument<T> | null
}
export const getAllRecentSpending = <T>({ userProfile }: GetAllRecentSpending<T>) => {
    return {
        recent: GETALL_RECENT_SPENDING,
        params: { userId: userProfile?._id },
    }
}

// ---------------------------------------------------------------------------------------------------------------------
// LOAN
interface GetRecentLoan<T> {
    userProfile: SanityDocument<T> | null
    kindLoan: string
    kindGetLoan: string
}
export const getRecentLoan = <T>({ userProfile, kindLoan, kindGetLoan }: GetRecentLoan<T>) => {
    return {
        recent: GET_RECENT_LOAN,
        params: { userId: userProfile?._id, from: 0, to: 10, kindLoan, kindGetLoan },
    }
}

// ---------------------------------------------------------------------------------------------------------------------
interface GetPayDueLoan<T> {
    userProfile: SanityDocument<T> | null
    kindLoan: string
    kindGetLoan: string
}
export const getPayDueLoan = <T>({ userProfile, kindLoan, kindGetLoan }: GetPayDueLoan<T>) => {
    return {
        recent: GET_PAY_DUE_LOAN,
        params: {
            userId: userProfile?._id,
            from: 0,
            to: 10,
            dueDate: moment().utc(true).add(7, 'days').toISOString(),
            kindLoan,
            kindGetLoan,
        },
    }
}
// ---------------------------------------------------------------------------------------------------------------------
interface GetStatisticLoan<T> {
    userProfile: SanityDocument<T> | null
}
export const getStatisticLoan = <T>({ userProfile }: GetStatisticLoan<T>) => {
    return {
        recent: GET_STATISTIC_LOAN,
        params: {
            userId: userProfile?._id,
            from: 0,
            to: 10,
        },
    }
}
