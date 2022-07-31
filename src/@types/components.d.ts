import React, { HTMLInputTypeAttribute } from 'react'
import { Control, FieldError, RegisterOptions, UseFormReturn, ValidationRule } from 'react-hook-form'

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
    rules?: RulesValidate
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
    rules?: RulesValidate
}

export interface SlideOverProps {
    children?: () => React.ReactNode
}

export interface InputProps {
    className?: string
    label?: string
    name: string
    type?: HTMLInputTypeAttribute
    form: UseFormReturn<any, object>
    rules?: Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}

export interface DateProps {
    className?: string
    label?: string
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: RulesValidate
}
export interface TextAreaProps {
    className?: string
    label?: string
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: RulesValidate
}
export interface ButtonProps {
    className?: string
    children: React.ReactNode
    type: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    color: 'primary' | 'outline' | 'cyan' | 'green' | 'blue' | 'radicalRed' | 'prussianBlue'
    disabled?: boolean
}
