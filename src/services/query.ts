import moment from 'moment'
import {
    GetBudgetSpending,
    GetCategorySpending,
    GetLongBudgetSpending,
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
import { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN, GET_USER_LOAN } from '~/schema/query/loan'
import {
    GET_BUDGET_BY_MONTH,
    GET_CATEGORY_SPENDING,
    GET_LONG_BUDGET,
    GET_METHOD_SPENDING,
    GET_METHOD_SPENDING_DESC_SURPLUS,
    GET_RECENT_SPENDING,
    GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE,
    GET_RECENT_SPENDING_PAGINATE,
    GET_STATISTIC_SPENDING,
} from '~/schema/query/spending'
import { service } from '.'

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
            startDate: service.getDateOfMonth('start'),
            endDate: service.getDateOfMonth('end'),
        },
        tags: TAGS.ALTERNATE,
    }
}

export const getRecentSpending = <T extends Record<string, any>>({
    userProfile,
    getKindSpendingIds,
}: GetRecentSpending<T>): QueryResult => {
    return {
        query: GET_RECENT_SPENDING,
        params: {
            userId: userProfile?._id as string,
            kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
            from: 0,
            to: 5,
        },
        tags: TAGS.ALTERNATE,
    }
}

export const getRecentLoanPaginate = <T extends Record<string, any>>({
    userProfile,
    getKindSpendingIds,
}: GetRecentSpendingPaginate<T>): QueryResult => {
    return {
        query: GET_RECENT_SPENDING_PAGINATE,
        params: {
            userId: userProfile?._id as string,
            kindSpendingIds: getKindSpendingIds('CREDIT', 'LOAN'),
        },
        tags: TAGS.ALTERNATE,
    }
}

export const getRecentLoanFilterDateRangePaginate = <T extends Record<string, any>>({
    userProfile,
    getKindSpendingIds,
}: GetRecentSpendingPaginate<T>): QueryResult => {
    return {
        query: GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE,
        params: {
            userId: userProfile?._id as string,
            kindSpendingIds: getKindSpendingIds('CREDIT', 'LOAN'),
        },
        tags: TAGS.ALTERNATE,
    }
}

export const getRecentSpendingPaginate = <T extends Record<string, any>>({
    userProfile,
    getKindSpendingIds,
}: GetRecentSpendingPaginate<T>): QueryResult => {
    return {
        query: GET_RECENT_SPENDING_PAGINATE,
        params: {
            userId: userProfile?._id as string,
            kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
        },
        tags: TAGS.ALTERNATE,
    }
}

export const getRecentSpendingFilterDateRangePaginate = <T extends Record<string, any>>({
    userProfile,
    getKindSpendingIds,
}: GetRecentSpendingPaginate<T>): QueryResult => {
    return {
        query: GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE,
        params: {
            userId: userProfile?._id as string,
            kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
        },
        tags: TAGS.ALTERNATE,
    }
}

export const getBudgetSpending = <T extends Record<string, any>>({
    userProfile,
    budgetId,
    budgetKind,
    startDate,
    endDate,
}: GetBudgetSpending<T>): QueryResult => {
    return {
        query: GET_BUDGET_BY_MONTH,
        params: {
            userId: userProfile?._id as string,
            startDate,
            endDate,
            budgetKind,
            ...(budgetId && { budgetId }),
        },
        tags: TAGS.ALTERNATE,
    }
}

export const getLongBudgetSpending = <T extends Record<string, any>>({
    userProfile,
}: GetLongBudgetSpending<T>): QueryResult => {
    return {
        query: GET_LONG_BUDGET,
        params: {
            userId: userProfile?._id as string,
        },
        tags: TAGS.ALTERNATE,
    }
}

// LOAN

export const getRecentLoan = <T extends Record<string, any>>({
    userProfile,
    kindLoan,
    kindCredit,
}: GetRecentLoan<T>): QueryResult => {
    return {
        query: GET_RECENT_LOAN,
        params: { userId: userProfile?._id as string, from: 0, to: 10, kindLoan, kindCredit },
        tags: TAGS.ALTERNATE,
    }
}

export const getPayDueLoan = <T extends Record<string, any>>({
    userProfile,
    kindLoan,
    kindCredit,
}: GetPayDueLoan<T>): QueryResult => {
    return {
        query: GET_PAY_DUE_LOAN,
        params: {
            userId: userProfile?._id as string,
            from: 0,
            to: 10,
            dueDate: moment().utc(true).add(7, 'days').toISOString(),
            kindLoan,
            kindCredit,
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

export const getUserLoan = <T extends Record<string, any>>({ userProfile }: GetStatisticLoan<T>): QueryResult => {
    return {
        query: GET_USER_LOAN,
        params: {
            userId: userProfile?._id as string,
        },
        tags: TAGS.ENUM,
    }
}
