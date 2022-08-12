import { KIND_SPENDING } from '~/constant/spending'
import { IUserProfile } from './auth'
import { IKindSpending } from './context'

export interface SpendingData {
    _id: string
    _createdAt: string
    categorySpending?: {
        _id: string
        name: string
    }
    methodSpending: {
        _id: string
        name: string
    }
    methodReference?: {
        _id: string
        name: string
    }
    kindSpending: {
        _id: string
        name: string
        key: KIND_SPENDING
    }
    surplus: number
    description: string
    amount: number
    date: string
}

export interface StatisticData {
    _id: string
    name: string
    key: KIND_SPENDING
    data: number[]
}

export interface RecentProps {
    data: SpendingData[] | undefined
    loading: boolean
}

export interface Statistic {
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
