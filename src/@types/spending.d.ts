import { KIND_SPENDING } from '~/constant/spending'
import { IUserProfile } from './auth'
import { IKindSpending } from './context'

export interface BoxProps {
    title?: string
    seeMore?: boolean
    children: React.ReactNode
    to?: string
    onReload?: () => void
    loading?: boolean
    className?: string
    fullWidth?: boolean
}
export interface SpendingData {
    _id: string
    _createdAt: string
    categorySpending?: {
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
        key: KIND_SPENDING
    }
    description: string
    amount: number
    date: string
}

export interface StatisticData {
    _id: string
    name: string
    key: KIND_SPENDING
    data: number[]
}

export interface RecentProps {
    data: SpendingData[] | undefined
    loading: boolean
}

export interface StatisticProps {
    data: StatisticData[] | undefined
    loading: boolean
}
export interface MethodData {
    _id: string
    name: string
    cost: number
    receive: number
}
export interface MethodProps {
    data: MethodData[] | undefined
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
