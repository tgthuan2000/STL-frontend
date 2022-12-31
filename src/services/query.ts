import moment from 'moment'
import {
    GetCategorySpending,
    GetMethodKindSpending,
    GetMethodSpending,
    GetPayDueLoan,
    GetRecentLoan,
    GetRecentSpending,
    GetRecentSpendingPaginate,
    GetStatisticLoan,
    GetStatisticSpending,
    QueryResult,
} from '~/@types/query'
import { TAGS } from '~/constant'
import { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } from '~/schema/query/loan'
import {
    GETALL_RECENT_SPENDING,
    GET_CATEGORY_SPENDING,
    GET_METHOD_SPENDING,
    GET_METHOD_SPENDING_DESC_SURPLUS,
    GET_RECENT_SPENDING,
    GET_RECENT_SPENDING_PAGINATE,
    GET_STATISTIC_SPENDING,
} from '~/schema/query/spending'
import { getDateOfMonth } from '.'

export const getCategorySpending = <T extends Record<string, any>>({
    userProfile,
    kindSpending,
}: GetCategorySpending<T>): QueryResult => {
    return {
        query: GET_CATEGORY_SPENDING,
        params: { userId: userProfile?._id as string, kindSpending },
        tags: TAGS.ENUM,
    }
}

export const getMethodSpendingDescSurplus = <T extends Record<string, any>>({
    userProfile,
}: GetMethodKindSpending<T>): QueryResult => {
    return {
        query: GET_METHOD_SPENDING_DESC_SURPLUS,
        params: { userId: userProfile?._id as string },
        tags: TAGS.ALTERNATE,
    }
}

export const getMethodSpending = <T extends Record<string, any>>({
    userProfile,
}: GetMethodSpending<T>): QueryResult => {
    return {
        query: GET_METHOD_SPENDING,
        params: { userId: userProfile?._id as string },
        tags: TAGS.ENUM,
    }
}

export const getStatisticSpending = <T extends Record<string, any>>({
    userProfile,
}: GetStatisticSpending<T>): QueryResult => {
    return {
        query: GET_STATISTIC_SPENDING,
        params: {
            userId: userProfile?._id as string,
            startDate: getDateOfMonth('start'),
            endDate: getDateOfMonth('end'),
        },
        tags: TAGS.ALTERNATE,
    }
}

export const getRecentSpending = <T extends Record<string, any>>({
    userProfile,
}: GetRecentSpending<T>): QueryResult => {
    return {
        query: GET_RECENT_SPENDING,
        params: { userId: userProfile?._id as string, from: 0, to: 5 },
        tags: TAGS.ALTERNATE,
    }
}

export const getRecentSpendingPaginate = <T extends Record<string, any>>({
    userProfile,
}: GetRecentSpendingPaginate<T>): QueryResult => {
    return {
        query: GET_RECENT_SPENDING_PAGINATE,
        params: { userId: userProfile?._id as string },
        tags: TAGS.ALTERNATE,
    }
}

// LOAN

export const getRecentLoan = <T extends Record<string, any>>({
    userProfile,
    kindLoan,
    kindGetLoan,
}: GetRecentLoan<T>): QueryResult => {
    return {
        query: GET_RECENT_LOAN,
        params: { userId: userProfile?._id as string, from: 0, to: 10, kindLoan, kindGetLoan },
        tags: TAGS.ALTERNATE,
    }
}

export const getPayDueLoan = <T extends Record<string, any>>({
    userProfile,
    kindLoan,
    kindGetLoan,
}: GetPayDueLoan<T>): QueryResult => {
    return {
        query: GET_PAY_DUE_LOAN,
        params: {
            userId: userProfile?._id as string,
            from: 0,
            to: 10,
            dueDate: moment().utc(true).add(7, 'days').toISOString(),
            kindLoan,
            kindGetLoan,
        },
        tags: TAGS.ALTERNATE,
    }
}

export const getStatisticLoan = <T extends Record<string, any>>({ userProfile }: GetStatisticLoan<T>): QueryResult => {
    return {
        query: GET_STATISTIC_LOAN,
        params: {
            userId: userProfile?._id as string,
            from: 0,
            to: 10,
        },
        tags: TAGS.ALTERNATE,
    }
}
