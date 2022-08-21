import { KIND_SPENDING } from '~/constant/spending'
import { IUserProfile } from './auth'
import { IKindSpending } from './context'
import { IUserLoan } from './loan'

// INTERFACES

export interface ICategorySpending {
    _id: string
    name: string
    kindSpending: IKindSpending
    user: IUserProfile
}
export interface IMethodSpending {
    _id: string
    name: string
    surplus: number
    user: IUserProfile
}

export interface ISpendingData {
    _id: string
    _createdAt: string
    amount: number
    kindSpending: IKindSpending
    surplus: number
    user: IUserProfile
    description?: string
    categorySpending?: ICategorySpending
    methodSpending: IMethodSpending
    methodReference?: IMethodSpending
    date?: string
    paid?: boolean
    realPaid?: number
    userLoan?: IUserLoan
}

export interface IStatisticData {
    _id: string
    name: string
    key: KIND_SPENDING
    data: number[]
}

// PROPS

export interface RecentProps {
    data: ISpendingData[] | undefined
    loading: boolean
}

interface Statistic {
    _id: string
    value: number
    name: string
    color: string
}
export interface StatisticProps {
    data: Statistic[] | undefined
    loading: boolean
}

export interface MethodProps {
    data: IMethodSpending[] | undefined
    loading: boolean
}
