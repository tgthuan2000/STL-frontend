import { KIND_SPENDING } from '~/constant/spending'
import { IUserProfile } from './auth'
import { IKindSpending } from './context'
import { Query } from './hook'
import { IUserLoan } from './loan'

/* INTERFACES */

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
    _updatedAt: string
    amount: number
    kindSpending: IKindSpending
    surplus: number
    user: IUserProfile
    description?: string
    categorySpending?: ICategorySpending
    methodSpending: IMethodSpending
    methodReference?: IMethodSpending
    date?: string
    estimatePaidDate?: string // dành cho giao dịch vay -> thời hạn trả
    paidDate?: string // dành cho giao dịch vay -> thời điểm đã trả
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

export interface IAddCategoryForm {
    name: string
    kindSpending: IKindSpending | null
}

export interface IAddMethodForm {
    name: string
}

export interface IAddCostForm {
    amount: number | string
    categorySpending: ICategorySpending | null
    methodSpending: IMethodSpending | null
    description: string
    date: Date
}

export interface IAddIncomeForm {
    amount: number | string
    categorySpending: ICategorySpending | null
    methodSpending: IMethodSpending | null
    date: Date
    description: string
}

export interface IMakeTransferForm {
    amount: string | number
    methodSpendingFrom: IMethodSpending | null
    methodSpendingTo: IMethodSpending | null
    date: Date
    description: string
}

/* PROPS */

export interface RecentProps {
    data: ISpendingData[] | undefined
    loading: boolean
}

interface Statistic {
    _id: string
    value: number
    name: string
    getLoan?: number
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

export interface TransactionDetailFormProps {
    data: TransactionDetailFormData
}

/* USE QUERY */
export interface AddCategoryQueryData {
    categorySpending: ICategorySpending[]
}

export interface AddMethodQueryData {
    methodSpending: IMethodSpending[]
}
export interface MakeCostQueryData {
    methodSpending: IMethodSpending[]
    categorySpending: ICategorySpending[]
}

export interface MakeIncomeQueryData {
    methodSpending: IMethodSpending[]
    categorySpending: ICategorySpending[]
}

export interface MakeTransferQueryData {
    methodSpending: IMethodSpending[]
}

export interface TransactionDetailQueryData {
    transaction: ISpendingData[]
    methodSpending: IMethodSpending[]
}

export interface DashboardQueryData {
    recent: ISpendingData[]
    method: IMethodSpending[]
    statistic: IStatisticData[]
}
interface RecentQueryData {
    recent: ISpendingData[]
}

/* OTHERS */
export interface TransactionDetailFormData {
    onsubmit: SubmitHandler<IDetailSpendingForm>
    title: string
    handleReloadData: (keys: keyof TransactionDetailQueryData) => Promise<void>
    handleReloadDataCategory: (keys: keyof DataCategory) => Promise<void>
    handleAddMoreMethodSpending: (name: string) => Promise<{ _id: string; name: string } | undefined>
    handleAddMoreCategorySpending: (name: string) => Promise<{ _id: string; name: string } | undefined>
    handleDeleteTransaction: () => void
    categorySpending: Query<ICategorySpending>
    methodSpending: Query<IMethodSpending>
    transaction: ISpendingData
}

export interface IDetailSpendingForm {
    amount: number
    categorySpending?: ICategorySpending
    methodSpending: IMethodSpending
    methodReference?: IMethodSpending
    date: Date
    description: string
    surplus: number
}
export interface DataCategory {
    categorySpending: ICategorySpending[]
}
