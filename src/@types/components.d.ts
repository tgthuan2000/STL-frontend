import React, { HTMLInputTypeAttribute } from 'react'
import { FieldError } from 'react-hook-form'

export interface SlideParams {
    slide?: string
}

export interface AutoCompleteProps {
    className?: string
    label?: string
    data?: any[]
    idKey?: string
    valueKey?: string
    error?: FieldError
    value?: any
    onChange: (value: any) => void
    addMore?: (value: any) => Promise<any>
}

export interface SelectionProps {
    className?: string
    label?: string
    data?: any[]
    idKey?: string
    valueKey?: string
    placeholder?: string
    error?: FieldError
    value?: any
    onChange: (value: any) => void
}

export interface SlideOverProps {
    children?: () => React.ReactNode
}

export interface InputProps {
    className?: string
    label?: string
    name: string
    type: HTMLInputTypeAttribute
    error?: FieldError
}
export interface TextAreaProps {
    className?: string
    label?: string
    name: string
    error?: FieldError
}
export interface ButtonProps {
    className?: string
    children: React.ReactNode
    type: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    color: 'primary' | 'outline' | 'cyan' | 'green' | 'blue' | 'radicalRed'
    disabled?: boolean
}
