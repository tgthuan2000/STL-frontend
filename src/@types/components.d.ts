import React from 'react'

export interface SlideParams {
    slide?: string
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

export interface ButtonProps {
    data: IMenuBtn
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
