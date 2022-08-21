import { SanityImageAssetDocument } from '@sanity/client'
import React, { HTMLInputTypeAttribute } from 'react'
import { Control, FieldError, RegisterOptions, UseFormReturn } from 'react-hook-form'
import { IUserLoan } from './loan'
import { ISpendingData } from './spending'

export interface SlideParams {
    slide?: string
}
export interface AutoCompleteProps {
    name: string
    className?: string
    label?: string
    data?: any[]
    idKey?: string
    valueKey?: string
    onReload?: () => Promise<void>
    addMore?: (value: any) => Promise<any>
    loading?: boolean
    form: UseFormReturn<any, object>
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    disabled?: boolean
    onChange?: (value: any) => void
    showImage?: boolean
}

export interface SelectionProps {
    name: string
    className?: string
    label?: string
    data?: any[]
    idKey?: string
    valueKey?: string
    placeholder?: string
    form: UseFormReturn<any, object>
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export interface SlideOverProps {
    children?: () => React.ReactNode
}

export interface InputProps {
    className?: string
    label?: string
    name: string
    type?: HTMLInputTypeAttribute
    disabled?: boolean
    form: UseFormReturn<any, object>
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}
export interface UploadImageProps {
    className?: string
    label?: string
    name: string
    disabled?: boolean
    form: UseFormReturn<any, object>
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export interface DateProps {
    className?: string
    label?: string
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}
export interface TextAreaProps {
    className?: string
    label?: string
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}
export interface ButtonProps {
    className?: string
    children: React.ReactNode
    type: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    color: 'primary' | 'outline' | 'cyan' | 'green' | 'blue' | 'radicalRed' | 'prussianBlue'
    disabled?: boolean
}

export interface ContentBoxProps {
    title?: string
    seeMore?: boolean
    children: React.ReactNode
    to?: string
    onReload?: () => void
    loading?: boolean
    className?: string
    fullWidth?: boolean
}

export interface ContentLoanBox2Props {
    data?: ISpendingData[]
    loading?: boolean
}

export interface ContentUserLoanBox2Props {
    data?: IUserLoan[]
    loading?: boolean
}
export interface MenuButtonProps {
    data: IMenuBtn
}

export interface IMenuBtn {
    title: string
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    color: string
    to: To
    children?: () => React.ReactNode
    query?: SlideParams
    divider?: boolean
    action?: (cb: () => void) => void
}
export interface AnimateWrapProps {
    children: React.ReactNode
    className?: string
}

export interface ToggleProps {
    label: string
    form: UseFormReturn<any, object>
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
    name: string
    disabled?: boolean
}
