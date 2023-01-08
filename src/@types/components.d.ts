import { SanityImageAssetDocument } from '@sanity/client'
import React, { HTMLInputTypeAttribute, ReactNode } from 'react'
import { FieldError, RegisterOptions, UseFormReturn } from 'react-hook-form'
import { NavigateFunction } from 'react-router-dom'
import { DATE_FORMAT } from '~/constant'
import { DATA_LIST_MODE } from '~/constant/component'
import { IUserLoan } from './loan'
import { ISpendingData } from './spending'

type Rules = Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
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
    rules?: Rules
    disabled?: boolean
    onChange?: (value: any) => void
    showImage?: boolean
    disabledClear?: boolean
    disabledShowSurplus?: boolean
    surplusName?: string
    multiple?: boolean
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
    rules?: Rules
    disabled?: boolean
}

export interface DropdownProps {
    name: string
    className?: string
    label?: ReactNode
    data?: Array<Array<any>>
    idKey?: string
    valueKey?: string
    placeholder?: string
    form: UseFormReturn<any, object>
    rules?: Rules
    disabled?: boolean
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
    rules?: Rules
    autoFocus?: boolean
}
export interface UploadImageProps {
    className?: string
    label?: string
    name: string
    disabled?: boolean
    form: UseFormReturn<any, object>
    rules?: Rules
}

export interface DateProps {
    className?: string
    label?: string
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: Rules
    disabledClear?: boolean
    disabled?: boolean
    onChange?: (value: any) => void
    format?: keyof typeof DATE_FORMAT
    showTimeInput?: boolean
    placeholderText?: string
    showMonthYearPicker?: boolean
    showYearPicker?: boolean
    selectsRange?: boolean
    startDate?: Date
    endDate?: Date
    InputProps?: {
        readOnly?: boolean
    }
}
export interface TextAreaProps {
    className?: string
    label?: string
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: Rules
}
export interface ButtonProps {
    className?: string
    children: React.ReactNode
    type: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    color:
        | 'outline'
        | 'primary'
        | 'cyan'
        | 'green'
        | 'blue'
        | 'radicalRed'
        | 'prussianBlue'
        | 'yellow'
        | 'outline-primary'
        | 'outline-cyan'
        | 'outline-green'
        | 'outline-blue'
        | 'outline-radicalRed'
        | 'outline-prussianBlue'
        | 'outline-yellow'
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
    customHeaderEvent?: React.ReactNode
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
    rules?: Rules
    name: string
    disabled?: boolean
}

export interface LoadingButtonProps {
    onReload: () => void
    disabled: boolean | undefined
}

export interface AvatarUserProps {
    image: SanityImageAssetDocument | null | undefined
    size?: 'small' | 'medium' | 'large'
}

export interface Box2Props {
    children?: (data: { data: any[] | undefined; loading: boolean }) => React.ReactNode
    data: any[] | undefined
    label?: string
    loading?: boolean
    onReload: () => void
}

interface TabData {
    name: string
    href: string
}

export interface TabsProps {
    data: TabData[]
}

export interface TabItemProps {
    tab: TabData
    navigate: NavigateFunction
    tabsRef: React.RefObject<HTMLAnchorElement[]>
}

export interface DataListViewTable {
    columns: Array<TableColumn>
}

export interface DataListViewList {
    groupBy: (data: any) => any
    renderTitle: (data: any) => React.ReactNode
    renderList: (data: any, index: number) => React.ReactNode
}

export interface DataListViewMode {
    table: DataListViewTable
    list: DataListViewList
}

export interface DataListViewProps {
    mode: DATA_LIST_MODE
    data: any[] | undefined
    hasNextPage: boolean
    loading: boolean
    onGetMore: () => void
    onRowClick: (data: any) => string
    view: DataListViewMode
}

export interface SkeletonProps {
    elNumber?: number
}
