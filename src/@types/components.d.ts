import React, { HTMLInputTypeAttribute } from 'react'
import { FieldError } from 'react-hook-form'

export interface SlideParams {
    slide?: string
}

export interface AutoCompleteProps {
    title?: string
    data?: any[]
    idKey?: string
    valueKey?: string
}

export interface SelectionProps {
    title?: string
    data?: any[]
    idKey?: string
    valueKey?: string
    placeholder?: string
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
export interface ButtonProps {
    className?: string
    children: React.ReactNode
    type: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    color: 'primary' | 'outline' | 'cyan' | 'green' | 'blue' | 'radicalRed'
    disabled?: boolean
}
