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
}

export interface ButtonProps {
    data: IMenuBtn
}

export interface AutoCompleteProps {
    title?: string
}

export interface SlideOverProps {
    children?: () => React.ReactNode
}
