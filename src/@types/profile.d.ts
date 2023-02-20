import React from 'react'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { KIND_SPENDING } from '~/constant/spending'

export interface ProfileInfoGroupProps {
    title: string
    children: React.ReactNode
    className?: string
    wrapClassName?: string
    hidden?: boolean
}
type profileData = string | number | React.ReactNode
type profileId = string | number
export interface ProfileInfoProps {
    label: string
    data: profileData
    hidden?: boolean
}
export interface profileValue {
    id: profileId
    title: string
    data: profileData
    hidden?: boolean
}
export interface profileOption {
    id: profileId
    title: string
    className: string
    wrapClassName?: string
    values: profileValue[]
    hidden?: boolean
}
export type profileOptionFn = (data: ProfileQueryData) => profileOption[]

export interface MethodProfile {
    _id: string
    name: string
    countUsed: number
    receives: number[]
    costs: number[]
}
export interface CategoryProfile {
    _id: string
    name: string
    countUsed: number
    kindSpending: {
        key: KIND_SPENDING
    }
    receives: number[]
    costs: number[]
}
export interface BudgetProfile {
    _id: string
    date: string
    totalMethod: number[]
    totalCategory: number[]
}
export interface ProfileQueryData {
    method: MethodProfile[] | undefined
    category: CategoryProfile[] | undefined
    budget: BudgetProfile[] | undefined
}

export type CategoryRespond = Array<
    Omit<MethodProfile, 'costs' | 'receives' | 'countUsed'> & { costs: number; receives: number; countUsed: number }
>
export interface MethodResult {
    maxCost: { costs: number }
    maxReceive: { receives: number }
    maxUsed: { countUsed: number }
}

export interface CategoryResult {
    maxCostUsed?: { countUsed: number }
    maxReceiveUsed?: { countUsed: number }
    maxCost?: { costs: number }
    maxReceive?: { receives: number }
}

export interface BudgetResult {
    maxTotalMethod: { totalMethod: number }
    maxTotalCategory: { totalCategory: number }
}

export interface ProfileService {
    method: (method: MethodProfile[] | undefined) => MethodResult | undefined
    category: (category: CategoryProfile[] | undefined) => CategoryResult | undefined
    budget: (budget: BudgetProfile[] | undefined) => BudgetResult | undefined
}

/* --- SERVICES --- */

export interface Services {
    filterQuery: FilterQuery
    getAll: GetAll
    getDefaultValue: GetDefaultValue
    filterSubmit: FilterSubmit
}
type GetAll = (options: GetAllOptions) => DefaultValueResult
type GetDefaultValue = (options: DefaultValueOption) => DefaultValueResult
type FilterSubmit = (
    data: TimeFilterPayload,
    options: FilterSubmitOption
) => React.SetStateAction<DefaultValueResult> | undefined
interface FilterQuery {
    method: string
    category: string
    budget: string
}
interface GetAllOptions {
    receiveKindIds: string[]
    costKindIds: string[]
    userId: string
}

interface FilterSubmitOption {
    defaultValues: DefaultValueResult
    getAll: DefaultValueResult
    receiveCostKindIds: string[]
}
interface DefaultValueOption {
    receiveCostKindIds: string[]
    searchParams: URLSearchParams
    getAll: DefaultValueResult
}
export interface DefaultValueResult {
    query: QueryTypeUseQuery<ProfileQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<ProfileQueryData>
}

/* --- SERVICES --- */
