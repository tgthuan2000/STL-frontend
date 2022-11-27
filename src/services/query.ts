import moment from 'moment'
import {
    GetAllRecentSpending,
    GetCategorySpending,
    GetMethodKindSpending,
    GetMethodSpending,
    GetPayDueLoan,
    GetRecentLoan,
    GetRecentSpending,
    GetStatisticLoan,
    GetStatisticSpending,
} from '~/@types/query'
import { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } from '~/schema/query/loan'
import {
    GETALL_RECENT_SPENDING,
    GET_CATEGORY_SPENDING,
    GET_METHOD_SPENDING,
    GET_METHOD_SPENDING_DESC_SURPLUS,
    GET_RECENT_SPENDING,
    GET_STATISTIC_SPENDING,
} from '~/schema/query/spending'
import { getDateOfMonth } from '.'

export const getCategorySpending = <T extends Record<string, any>>({
    userProfile,
    kindSpending,
}: GetCategorySpending<T>) => {
    return {
        categorySpending: GET_CATEGORY_SPENDING,
        params: { userId: userProfile?._id, kindSpending },
    }
}

export const getMethodSpendingDescSurplus = <T extends Record<string, any>>({
    userProfile,
}: GetMethodKindSpending<T>) => {
    return {
        method: GET_METHOD_SPENDING_DESC_SURPLUS,
        params: { userId: userProfile?._id },
    }
}

export const getMethodSpending = <T extends Record<string, any>>({ userProfile }: GetMethodSpending<T>) => {
    return {
        methodSpending: GET_METHOD_SPENDING,
        params: { userId: userProfile?._id },
    }
}

export const getStatisticSpending = <T extends Record<string, any>>({ userProfile }: GetStatisticSpending<T>) => {
    return {
        statistic: GET_STATISTIC_SPENDING,
        params: { userId: userProfile?._id, startDate: getDateOfMonth('start'), endDate: getDateOfMonth('end') },
    }
}

export const getRecentSpending = <T extends Record<string, any>>({ userProfile }: GetRecentSpending<T>) => {
    return {
        recent: GET_RECENT_SPENDING,
        params: { userId: userProfile?._id, from: 0, to: 5 },
    }
}

export const getAllRecentSpending = <T extends Record<string, any>>({ userProfile }: GetAllRecentSpending<T>) => {
    return {
        recent: GETALL_RECENT_SPENDING,
        params: { userId: userProfile?._id },
    }
}

// LOAN

export const getRecentLoan = <T extends Record<string, any>>({
    userProfile,
    kindLoan,
    kindGetLoan,
}: GetRecentLoan<T>) => {
    return {
        recent: GET_RECENT_LOAN,
        params: { userId: userProfile?._id, from: 0, to: 10, kindLoan, kindGetLoan },
    }
}

export const getPayDueLoan = <T extends Record<string, any>>({
    userProfile,
    kindLoan,
    kindGetLoan,
}: GetPayDueLoan<T>) => {
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

export const getStatisticLoan = <T extends Record<string, any>>({ userProfile }: GetStatisticLoan<T>) => {
    return {
        recent: GET_STATISTIC_LOAN,
        params: {
            userId: userProfile?._id,
            from: 0,
            to: 10,
        },
    }
}
