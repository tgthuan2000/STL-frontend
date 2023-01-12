import { SanityAssetDocument, SanityImageAssetDocument } from '@sanity/client'
import React from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { Query } from './hook'
import { ICategorySpending, IMethodSpending, ISpendingData } from './spending'

/* INTERFACES */
export interface IUserLoan {
    _id: string
    userName: string
    surplus: number
    image?: SanityImageAssetDocument
}

export interface ICreateMemberForm {
    userName: string
    image: SanityAssetDocument | null
}

export interface IMakeGetLoanForm {
    amount: number | string
    methodReference: IMethodSpending | null
    date: Date | null
    description: string
    userLoan: IUserLoan | null
}

export interface IAddIncomeForm {
    amount: number | string
    categorySpending: ICategorySpending | null
    methodSpending: IMethodSpending | null
    date: Date | null
    description: string
    userLoan: IUserLoan[] | null
}
interface IMakeGetLoanForm {
    amount: number | string
    methodReference: IMethodSpending | null
    estimatePaidDate: Date | null
    description: string
    userLoan: IUserLoan | null
}

/* PROPS */
export interface PayDueLoanProps {
    data: ISpendingData[] | undefined
    loading: boolean
    label: string
}

export interface GroupProps {
    children: React.ReactNode
    label: string
    className?: string
}

export interface TransactionDetailFormProps {
    data: TransactionDetailFormData
}

export interface TransactionEditFormProps {
    data: TransactionEditFormData
}

/* USE QUERY DATA */
export interface TransactionDetailQueryData {
    transaction: ISpendingData[]
    methodSpending: IMethodSpending[]
}

export interface DashboardQueryData {
    recent: ISpendingData[]
    paydue: ISpendingData[]
    statistic: IUserLoan[]
}

export interface TransactionEditQueryData {
    transaction: ISpendingData[]
    methodSpending: IMethodSpending[]
    userLoan: IUserLoan[]
}

/* OTHERS */

export interface TransactionEditFormData {
    title: string
    onsubmit: SubmitHandler<any>
    handleReloadData: (keys: keyof TransactionEditQueryData) => Promise<void>
    handleDeleteTransaction: () => void
    methodSpending: Query<IMethodSpending>
    transaction: ISpendingData
    userLoan: Query<IUserLoan>
    handleAddMoreMethodSpending: (name: string) => Promise<{ _id: string; name: string } | undefined>
}

export interface TransactionDetailFormData {
    onsubmit: SubmitHandler<PaidForm>
    handleReloadData: (keys: keyof TransactionDetailQueryData) => Promise<void>
    handleDeleteTransaction: () => void
    methodSpending: Query<IMethodSpending>
    transaction: ISpendingData
}

export interface PaidForm {
    paid: boolean
    methodSpending: IMethodSpending | null
    amount: number
}

export interface IconButtonProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLSpanElement>
}

export interface StatusLoanProps {
    form: UseFormReturn<any, object>
    name: string
}

export interface QueryDataMakeGetLoan {
    methodSpending: IMethodSpending[]
    userLoan: IUserLoan[]
}

interface QueryDataMakeLoan {
    methodSpending: IMethodSpending[]
    userLoan: IUserLoan[]
}
