import { SanityDocument, SanityImageAssetDocument } from '@sanity/client'
import React, { HTMLInputTypeAttribute, ReactNode } from 'react'
import { FieldError, RegisterOptions, UseFormReturn } from 'react-hook-form'
import { ReactQuillProps } from 'react-quill'
import { NavigateFunction } from 'react-router-dom'
import { DATE_FORMAT } from '~/constant'
import { DATA_LIST_GROUP, DATA_LIST_MODE } from '~/constant/component'
import { PERMISSION } from '~/constant/permission'
import { IFILTER_DATE } from '~/constant/template'
import { IUserLoan } from './loan'
import { NotifyItem } from './notify'
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

interface RichTextProps extends ReactQuillProps {
    className?: string
    label?: string
    name: string
    disabled?: boolean
    form: UseFormReturn<any, object>
    rules?: Rules
    placeholder?: string
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

export interface DatePickerInputProps {
    error?: FieldError
    label?: string
    className?: string
    disabledClear?: boolean
    disabled?: boolean
    field: ControllerRenderProps<any, string>
    readOnlyInput?: boolean
}

export interface TextAreaProps {
    className?: string
    label?: string
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: Rules
}
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
        | 'custom'
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
    SkeletonTable?: (loading: boolean) => React.ReactNode
    EmptyTable?: React.ReactNode
    SkeletonList?: (loading: boolean) => React.ReactNode
    EmptyList?: React.ReactNode
}

export interface SkeletonProps {
    elNumber?: number
}

export interface IDataListView {
    viewMode?: DATA_LIST_MODE
    listGroup?: DATA_LIST_GROUP
}

export interface SettingIconProps {
    className?: string
}

export interface BoxTitleProps {
    title?: string
    onReload?: () => void
    loading?: boolean
    customEvent?: React.ReactNode
}

export interface ListProps {
    groupBy: (data: any) => string
    data: Array<any> | undefined
    loading: boolean
    EmptyList?: React.ReactNode
    SkeletonList?: (loading: boolean) => React.ReactNode
    onGetMore?: () => void
    onRowClick: (data: any) => string
    hasNextPage: boolean
    renderTitle: (data: any) => React.ReactNode
    renderList: (data: any, index: number) => React.ReactNode
}

export type BodyListProps = Omit<ListProps, 'EmptyList' | 'groupBy' | 'data'> & { data: { [x: string]: any[] } }

export interface NotificationProps {
    leftSide?: boolean
}

export type ItemReadEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: SanityDocument<NotifyItem>
) => Promise<void>
export type ReadDetailEvent = (data: SanityDocument<NotifyItem>) => Promise<void>
export interface NotificationItemProps {
    data: SanityDocument<NotifyItem>
    onItemRead: ItemReadEvent
    onReadDetail: ReadDetailEvent
}

export interface NotifyDetailFormData {
    notify: SanityDocument<NotifyItem>
}

export interface NotifyDetailFormProps {
    data: NotifyDetailFormData
}

export interface TableColumn {
    key: string
    title: React.ReactNode
    label: string
    renderRow: (item: any, index: number) => React.ReactNode
    sort?: boolean
    className?: string
    colSpan?: number
}

export interface TableProps {
    columns: Array<TableColumn>
    data: Array<any> | undefined
    loading: boolean
    EmptyTable?: React.ReactNode
    SkeletonTable?: (loading: boolean) => React.ReactNode
    onGetMore?: () => void
    onRowClick: (data: any) => string
    hasNextPage: boolean
    subRow?: (data: any, index: number, origin: any[]) => React.ReactNode
}

export interface LazySearchSelectProps {
    className?: string
    onChange: (value: any) => void
    disabled?: boolean
    label?: string
    options?: any[]
    hasNextPage?: boolean
    onGetMore?: () => void
    onSearch?: (value: string) => void
    valueKey?: string
    labelKey?: string
    loading?: boolean
    getOptionLabel?: (option: any, active: boolean) => React.ReactNode
    autoFocus?: boolean
}

export interface PermissionCheckProps {
    permissions: PERMISSION[]
    children: React.ReactNode
}

export interface ProgressItem {
    step: number
    label: string
}

export interface ProgressProps {
    step: number
    options: ProgressItem[]
    className?: string
    onStepClick?: (option: ProgressItem) => void
}

export interface ProseProps {
    children: string
    className?: string
}

export type DateRange = [Date, Date]
export type FilterDateType = 'isDateRangeFilter' | 'isDateFilter' | 'isMonthFilter' | 'isYearFilter'
export interface TimeFilterProps {
    onSubmit: (data: TimeFilterPayload) => void
}
export interface IFilterDate {
    date?: Date | null
    month?: Date | null
    year?: Date | null
    dateRange?: DateRange | null
    filter: IFILTER_DATE | null
}
export type TimeFilterPayload = {
    id: number
    data: Date | DateRange | null | undefined
}

export interface TransactionProps {
    title?: string
    children?: React.ReactNode
    hasBack?: boolean
}

export interface ImageProps {
    src: string | undefined
    alt?: string
    className?: string
    errorComp?: React.ReactNode
    size?: 'small' | 'medium' | 'large' | 'custom'
    className?: string
}

export interface ChipProps {
    children: React.ReactNode
    onClick?: (data: any) => void
    disabled?: boolean
    hidden?: boolean
}
