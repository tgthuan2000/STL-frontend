import { SanityDocument } from '@sanity/client'
import { IKindSpending } from '~/@types/context'
import {
    F_GET_METHOD_SPENDING,
    GETALL_RECENT_SPENDING,
    GET_CATEGORY_SPENDING,
    GET_METHOD_SPENDING,
    GET_RECENT_SPENDING,
    GET_STATISTIC_SPENDING,
} from '~/schema/query/spending'
import { getDate } from '.'

interface GetCategorySpending<T> {
    userProfile: SanityDocument<T> | null
    kindSpending: IKindSpending | null
}
export const getCategorySpending = <T>({ userProfile, kindSpending }: GetCategorySpending<T>) => {
    return {
        categorySpending: GET_CATEGORY_SPENDING,
        params: { userId: userProfile?._id, kindSpending: kindSpending?._id },
    }
}

// ---------------------------------------------------------------------------------------------------------------------
interface GetMethodKindSpending<T> {
    userProfile: SanityDocument<T> | null
    kindSpending: IKindSpending[]
}
export const getMethodKindSpending = <T>({ userProfile, kindSpending }: GetMethodKindSpending<T>) => {
    return {
        method: F_GET_METHOD_SPENDING(kindSpending),
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
