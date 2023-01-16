import React from 'react'
import { KIND_SPENDING } from '~/constant/spending'
import { GetKindSpendingId } from './context'

export interface ProfileInfoGroupProps {
    title: string
    children: React.ReactNode
    className?: string
    wrapClassName?: string
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
    values: profileValue[]
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
    total: number[]
}
export interface ProfileQueryData {
    method: MethodProfile[] | undefined
    category: CategoryProfile[] | undefined
    budget: BudgetProfile[] | undefined
}
