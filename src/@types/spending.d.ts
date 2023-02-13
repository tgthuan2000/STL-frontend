import { SanityImageAssetDocument } from '@sanity/client'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { KIND_SPENDING } from '~/constant/spending'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import { DropdownResult, ListGroupResult } from '.'
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
export interface IBudgetSpending {
    _id: string
    _createdAt: string
    _updatedAt: string
    date: string
    user: IUserProfile
    MethodSpending: Array<IBudgetDetail & { methodSpending: IMethodSpending }>
    CategorySpending: Array<IBudgetDetail & { categorySpending: ICategorySpending }>
}
export interface IBudgetDetail {
    _id: string
    _createdAt: string
    _updatedAt: string
    amount: number
    amounts: number[]
    budgetSpending: IBudgetSpending
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
    image?: SanityImageAssetDocument
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
    image?: File | null
}

export interface IAddIncomeForm {
    amount: number | string
    categorySpending: ICategorySpending | null
    methodSpending: IMethodSpending | null
    date: Date
    description: string
    image?: File | null
}

export interface IMakeTransferForm {
    amount: string | number
    methodSpendingFrom: IMethodSpending | null
    methodSpendingTo: IMethodSpending | null
    date: Date
    description: string
    image?: File | null
}

/* PROPS */

export interface RecentProps {
    data: ISpendingData[] | undefined
    loading: boolean
}
export interface BudgetProps {
    data: IBudgetSpending | undefined
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
export interface ListOptionProps {
    data: any[] | undefined
    loading: boolean
    cleanCache: () => void
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
export interface MakeBudgetQueryData {
    methodSpending: IMethodSpending[]
    categorySpending: ICategorySpending[]
    budgetSpending: IBudgetSpending
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
    budget?: IBudgetSpending
    statistic: IStatisticData[]
}
export interface RecentQueryData {
    recent: {
        data: ISpendingData[]
        hasNextPage: boolean
    }
}

export interface MethodQueryData {
    method: {
        data: ISpendingData[]
        hasNextPage: boolean
    }
}

export interface OthersQueryData {
    method: IMethodSpending[]
    category: ICategorySpending[]
}
/* OTHERS */
export interface TransactionDetailFormData {
    onsubmit: SubmitHandler<IDetailSpendingForm>
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
    image?: File | SanityImageAssetDocument
}
export interface DataCategory {
    categorySpending: ICategorySpending[]
}

export interface IMakeBudgetForm {
    date: Date
    MethodSpending: Array<{ _id: string; amount: number; methodSpending: IMethodSpending }> | undefined
    CategorySpending: Array<{ _id: string; amount: number; categorySpending: ICategorySpending }> | undefined
}

export type StateRefKey = 'CategorySpending' | 'MethodSpending'

type StateRefType = { [key in StateRefKey]: string[] }
export interface StateRef {
    removes: StateRefType
    updates: StateRefType
}

export interface TabsProps {
    options: any[]
    idKey?: string
    tabLabelKey?: string
    tabContentKey?: string
    getOptionLabel?: (option: any) => React.ReactNode
    getOptionContent?: (option: any) => React.ReactNode
    className?: string
}

export interface MakeBudgetProps {
    form: UseFormReturn<IMakeBudgetForm, object>
    budgetLoading: any
    onDelItem: (key: StateRefKey, id: string | null | undefined) => void
    loading?: boolean
}

export interface BudgetItemProps {
    name: string
    textColor: string
    amount: number
    percent: number
    bgColor: string
    isOver: boolean
    totalAmounts: number
}

/* --- SERVICES --- */

export interface TransactionServices {
    getAll: TransactionGetAll
    getDefaultValue: TransactionGetDefaultValue
    filterSubmit: TransactionFilterSubmit
    getDropdownOptions: GetDropdownOptions
    getListGroupOptions: GetLisGroupOptions
}

type TransactionGetAll = (options: TransactionGetAllOptions) => TransactionDefaultValueResult
type GetLisGroupOptions = () => Array<Array<ListGroupResult>>
type TransactionGetDefaultValue = (options: TransactionDefaultValueOption) => TransactionDefaultValueResult

type TransactionFilterSubmit = (
    data: TimeFilterPayload,
    options: TransactionFilterSubmitOption
) => React.SetStateAction<TransactionDefaultValueResult> | undefined

type GetDropdownOptions = (options: DropdownOptions) => Array<Array<DropdownResult>>

interface TransactionGetAllOptions {
    kindSpendingIds: string[]
    userId: string
}
interface DropdownOptions {
    onReloadClick: () => void
}
interface TransactionFilterSubmitOption {
    defaultValues: TransactionDefaultValueResult
    getAll: TransactionDefaultValueResult
}
interface TransactionDefaultValueOption {
    searchParams: URLSearchParams
    getAll: TransactionDefaultValueResult
}
export interface TransactionDefaultValueResult {
    query: QueryTypeUseQuery<RecentQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<RecentQueryData>
}

export interface MethodDetailServices {
    getAll: MethodDetailGetAll
    getDefaultValue: MethodGetDefaultValue
    filterSubmit: MethodFilterSubmit
    getDropdownOptions: GetDropdownOptions
    getListGroupOptions: GetLisGroupOptions
}

type MethodDetailGetAll = (options: MethodDetailGetAllOptions) => MethodDetailDefaultValueResult
interface MethodDetailGetAllOptions {
    kindSpendingIds: string[]
    userId: string
    methodSpendingIds: string[]
}
type MethodGetDefaultValue = (options: MethodDetailDefaultValueOption) => MethodDetailDefaultValueResult
type MethodFilterSubmit = (
    data: TimeFilterPayload,
    options: MethodDetailFilterSubmitOption
) => React.SetStateAction<MethodDetailDefaultValueResult> | undefined
interface MethodDetailFilterSubmitOption {
    defaultValues: MethodDetailDefaultValueResult
    getAll: MethodDetailDefaultValueResult
}
interface MethodDetailDefaultValueOption {
    searchParams: URLSearchParams
    getAll: MethodDetailDefaultValueResult
}
export interface MethodDetailDefaultValueResult {
    query: QueryTypeUseQuery<MethodQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<MethodQueryData>
}

/* --- SERVICES --- */
