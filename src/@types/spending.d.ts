import { IUserProfile } from './auth'
import { IKindSpending } from './context'

export interface BoxProps {
    title?: string
    seeMore?: boolean
    children: React.ReactNode
    to?: string
}
export interface RecentData {
    _id: string
    _createdAt: string
    name: string
    categorySpending: {
        _id: string
        name: string
    }
    methodSpending: {
        _id: string
        name: string
    }
    kindSpending: {
        _id: string
        name: string
        key: string
    }
    description: string
    amount: number
    date: string
}

export interface RecentProps {
    data: RecentData[]
    loading: boolean
}
export interface MethodData {
    _id: string
    name: string
    cost: number
    receive: number
}
export interface MethodProps {
    data: MethodData[]
    loading: boolean
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

export interface MenuButtonProps {
    data: IMenuBtn
}

export interface ICategorySpending {
    _id: string
    name: string
    kindSpending: IKindSpending
    user: IUserProfile
}
export interface IMethodSpending {
    _id: string
    name: string
    user: IUserProfile
}
