import React from 'react'
import { DATA_LIST_GROUP, DATA_LIST_MODE } from '~/constant/component'

export type HeroIcon = React.ForwardRefExoticComponent<
    React.SVGProps<SVGSVGElement> & {
        title?: string | undefined
        titleId?: string | undefined
    }
>

export interface DropdownResult {
    id: DATA_LIST_MODE | number
    name: string
    icon: HeroIcon
    onClick?: () => void
}

export interface ListGroupResult {
    id: DATA_LIST_GROUP
    name: string
}

export interface _List {
    _id: string
}
export type List<T> = T & { children?: Array<T> }

export interface DataListOptionsParam {
    onReloadClick: () => void
}
export interface DataOption {
    id: number
    name: string
    icon: HeroIcon
    onClick?: () => void
}
export type DataListOptionsResult = Array<Array<DataOption>>

export type DataListOptions = (params: DataListOptionsParam) => DataListOptionsResult
