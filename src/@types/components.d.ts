import { SanityDocument, SanityImageAssetDocument } from '@sanity/client'
import { DefaultTFuncReturn } from 'i18next'
import React, { HTMLInputTypeAttribute, ReactNode } from 'react'
import { ControllerRenderProps, FieldError, RegisterOptions, UseFormReturn } from 'react-hook-form'
import { ReactQuillProps } from 'react-quill'
import { NavigateFunction } from 'react-router-dom'
import { DATE_FORMAT } from '~/constant'
import { DATA_LIST_GROUP, DATA_LIST_MODE } from '~/constant/component'
import { PERMISSION } from '~/constant/permission'
import { IFILTER_DATE } from '~/constant/template'
import { ListViewResult } from '~/hook'
import { localStorageValue } from '~/hook/useLocalStorage'
import { HeroIcon } from '.'
import { IUserLoan } from './loan'
import { AssignedNotify, NotifyAdminItem } from './notify'
import { ISpendingData } from './spending'

type TrackingFunc = (name: Path<any>) => Promise<void>
type Rules = Omit<RegisterOptions<TFieldValues, TName>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
export interface SlideParams {
    slide?: string
}
export interface AutoCompleteProps {
    name: string
    className?: string
    label?: string | DefaultTFuncReturn
    data?: any[]
    idKey?: string
    valueKey?: string
    onReload?: () => Promise<void>
    addMore?: (value: any) => Promise<any>
    loading?: boolean
    form: UseFormReturn<any, object>
    rules?: Rules
    tracking?: TrackingFunc
    disabled?: boolean
    onChange?: (value: any) => void
    showImage?: boolean
    disabledClear?: boolean
    disabledShowSurplus?: boolean
    surplusName?: string | DefaultTFuncReturn
    multiple?: boolean
}

export interface AutocompleteLabelProps {
    label?: string | DefaultTFuncReturn
    onReload?: () => Promise<void>
    loading?: boolean
}
export interface ButtonMenuProps {
    className?: string
    data: IMenuBtn[]
    small?: boolean
}
export interface AutocompleteButtonProps {
    disabledClear?: boolean
    disabled?: boolean
    loading?: boolean
    selectedItem: any
    setSelectedItem: React.Dispatch<any>
    field: ControllerRenderProps<any, string>
    onChange?: (value: any) => void
}

export interface AutocompleteInputProps {
    loading?: boolean
    disabled?: boolean
    onChange?: (value: any) => void
    onBlur?: () => void
    loadingAddMore?: boolean
    valueKey: string
}

export interface AutocompleteOptionProps {
    filterData: any[]
    idKey: string
    valueKey: string
    showImage?: boolean
    query: string
    addMore?: (value: any) => Promise<any>
}

export interface AutocompleteSurplusProps {
    surplus?: number
    disabledShowSurplus?: boolean
    surplusName?: string | DefaultTFuncReturn
    children?: ReactNode
}

export interface ErrorMessageProps {
    error?: FieldError
}

export interface SelectionProps {
    name: string
    className?: string
    label?: string | DefaultTFuncReturn
    data?: any[]
    idKey?: string
    valueKey?: string
    placeholder?: string | DefaultTFuncReturn
    form: UseFormReturn<any, object>
    rules?: Rules
    disabled?: boolean
}
export interface SelectionLabelProps {
    label?: DefaultTFuncReturn
}
export interface SelectionButtonProps {
    field: ControllerRenderProps<any, string>
    valueKey: string
    placeholder: DefaultTFuncReturn
    disabled?: boolean
}
export interface SelectionOptionsProps {
    data: any[]
    idKey: string
    valueKey: string
}
export interface DropdownProps {
    name: string
    className?: string
    label?: ReactNode | DefaultTFuncReturn
    data?: Array<Array<any>>
    idKey?: string
    valueKey?: string
    placeholder?: string | DefaultTFuncReturn
    form: UseFormReturn<any, object>
    rules?: Rules
    disabled?: boolean
    showValueOnLabel?: boolean
    customButtonClassName?: string
}

export interface DropdownButtonProps {
    field: ControllerRenderProps<any, string>
    disabled?: boolean
    customButtonClassName?: string
    showValueOnLabel?: boolean
    valueKey: string
    label: ReactNode | DefaultTFuncReturn
}

export interface DropdownItemsProps {
    data: Array<Array<any>>
    idKey: string
    valueKey: string
    selected: any
    handleChange?: (value: any, onChange: (value: any) => void) => void
    field: ControllerRenderProps<any, string>
}

export interface SlideOverProps {
    children?: () => React.ReactNode
}

export interface InputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string
    label?: string | DefaultTFuncReturn
    name: string
    type?: HTMLInputTypeAttribute
    disabled?: boolean
    form: UseFormReturn<any, object>
    rules?: Rules
    autoFocus?: boolean
    numberHint?: boolean
    calculator?: boolean
    tracking?: TrackingFunc
}

export interface LabelProps {
    id?: string
    label?: DefaultTFuncReturn
    className?: string
}

export interface InputNumberHintProps {
    field: ControllerRenderProps<any, string>
}

interface RichTextProps extends ReactQuillProps {
    className?: string
    label?: string | DefaultTFuncReturn
    name: string
    disabled?: boolean
    form: UseFormReturn<any, object>
    rules?: Rules
    placeholder?: string | DefaultTFuncReturn
}

export interface UploadImageProps {
    className?: string
    label?: string | DefaultTFuncReturn
    name: string
    disabled?: boolean
    form: UseFormReturn<any, object>
    rules?: Rules
}

export interface UploadBoxProps {
    id: string
    loading: boolean
    getRootProps: ReturnType<typeof useDropzone>['getRootProps']
    isDragActive: ReturnType<typeof useDropzone>['isDragActive']
}

export interface UploadImageCoreProps {
    loading: boolean
    id: string
    image: string | null | undefined
    clearImage: () => void
    isDragActive: boolean
    getRootProps: (props?: any) => any
}

export interface DateProps {
    className?: string
    label?: string | DefaultTFuncReturn
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: Rules
    tracking?: TrackingFunc
    disabledClear?: boolean
    disabled?: boolean
    onChange?: (value: any) => void
    format?: keyof typeof DATE_FORMAT
    showTimeInput?: boolean
    placeholderText?: string | DefaultTFuncReturn
    showMonthYearPicker?: boolean
    showYearPicker?: boolean
    selectsRange?: boolean
    startDate?: Date
    endDate?: Date
    InputProps?: {
        readOnly?: boolean
    }
    selectsStart?: boolean
    selectsEnd?: boolean
    minDate?: Date
}

export interface DatePickerInputProps {
    error?: FieldError
    label?: string | DefaultTFuncReturn
    className?: string
    disabledClear?: boolean
    disabled?: boolean
    field: ControllerRenderProps<any, string>
    readOnlyInput?: boolean
}

export interface TextAreaProps {
    className?: string
    label?: string | DefaultTFuncReturn
    name: string
    error?: FieldError
    form: UseFormReturn<any, object>
    rules?: Rules
    tracking?: TrackingFunc
}
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: React.ReactNode
    type: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    color:
        | 'outline'
        | 'indigo'
        | 'cyan'
        | 'green'
        | 'blue'
        | 'radicalRed'
        | 'prussianBlue'
        | 'yellow'
        | 'outline-indigo'
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
    title?: string | DefaultTFuncReturn
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

export interface ButtonMenuProviderProps {
    data: IMenuBtn[]
    children: (data: IMenuBtn) => React.ReactNode
}
export interface MenuButtonProps {
    data: IMenuBtn
}

export interface IMenuBtn {
    title: string
    icon: HeroIcon
    color: string
    to: To
    children?: () => React.ReactNode
    query?: SlideParams
    divider?: boolean
    action?: (...cb: Array<() => void>) => void
}
export interface AnimateWrapProps {
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
}

export interface ToggleProps {
    label?: string | React.ReactNode
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
    label?: string | DefaultTFuncReturn
    loading?: boolean
    onReload: () => void
}

interface TabsLinkData {
    name: string
    href: string
}

export interface TabsLinkProps {
    data: TabsLinkData[]
}

export interface TabLinkItemProps {
    tab: TabsLinkData
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
    title?: string | DefaultTFuncReturn
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
    onItemClick?: (data: any) => void | Promise<any>
    hasNextPage: boolean
    renderTitle: (data: any) => React.ReactNode
    renderList: (data: any, index: number) => React.ReactNode
}

export type BodyListProps = Omit<ListProps, 'EmptyList' | 'groupBy' | 'data'> & { data: { [x: string]: any[] } }

export interface NotificationProps {}

export type ItemReadEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ClientNotifyDataType
) => Promise<void>
export type ReadDetailEvent = (data: ClientNotifyDataType) => Promise<void>
export interface NotificationItemProps {
    data: ClientNotifyDataType & { _updatedAt: string }
    onItemRead: ItemReadEvent
    onReadDetail: ReadDetailEvent
}

export interface NotifyDetailFormData {
    notify: ClientNotifyDataType
}

export interface NotifyDetailAdminFormData {
    notify: SanityDocument<NotifyAdminItem>
}

export interface TableColumn<T extends any> {
    key: string
    title: React.ReactNode
    label: string
    renderRow: (item: T, index: number) => React.ReactNode
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
    onChange: (value: any) => any | any[]
    disabled?: boolean
    label?: string | DefaultTFuncReturn
    options?: any[]
    hasNextPage?: boolean
    placeholder?: string | DefaultTFuncReturn
    onGetMore?: () => void
    onSearch?: (value: string) => void
    valueKey?: string
    labelKey?: string
    loading?: boolean
    getOptionLabel?: (option: any, active: boolean) => React.ReactNode
    autoFocus?: boolean
}
export interface LazySearchSelectLabelProps {
    label?: string | DefaultTFuncReturn
}

export interface LazySearchSelectInputProp {
    field: ControllerRenderProps<{ __search: string }, '__search'>
    autoFocus?: boolean
    loading?: boolean
    disabled?: boolean
    placeholder?: string | DefaultTFuncReturn
    handleSearch?: (value: string, onChange: (...event: any[]) => void) => void
}
export interface LazySearchSelectIconProps {
    loading?: boolean
}
export interface LazySearchSelectOptionsProps {
    loading?: boolean
    options?: any[]
    valueKey: string
    labelKey: string
    getOptionLabel?: (option: any, active: boolean) => React.ReactNode
    handleGetMoreData: () => void
    hasNextPage
}
export interface PermissionCheckProps {
    permissions: PERMISSION[]
    children: React.ReactNode
    fallback?: React.ReactNode
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
    excludes?: E_FILTER_DATE[]
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
    title?: string | DefaultTFuncReturn
    children?: React.ReactNode
    hasBack?: boolean
}

export interface AvatarImage {
    size?: 'small' | 'medium' | 'large' | 'custom'
    roundFull?: boolean
}
export interface ImageProps {
    src: string | undefined
    avatar?: AvatarImage
    alt?: string
    className?: string | ((error: boolean) => string)
    fallback?: React.ReactNode
    className?: string
    onClick?: () => void
}

export interface ChipProps {
    children: React.ReactNode
    onClick?: (data: any) => void
    disabled?: boolean
    hidden?: boolean
    className?: string
}

export interface ThemeIconProps {
    theme: localStorageValue<string>
    className?: string
}

export interface BackButtonProps {
    onClick: () => void
    disabled?: boolean
}

export interface SubmitWrapProps {
    children: React.ReactNode
    className?: string
    hiddenBorder?: boolean
}

export interface AsideProps {
    children: React.ReactNode
}

export interface ButtonGroupProps {
    form: UseFormReturn<any, object>
    name: string
    idKey?: string
    valueKey?: string
    data?: any[]
    onChange?: (data: any) => void
}

export interface ListViewFilterProps {
    loading?: boolean
    totalLoading?: boolean
    timeFilter?: boolean
    viewListMode?: boolean
    viewTotal?: boolean
    onSubmitTimeFilter: (data: TimeFilterPayload) => void
    children?: React.ReactNode
    _: ListViewResult
    totalData?: {
        cost: number
        receive: number
        count: number
    }
    receiveTitle?: DefaultTFuncReturn
    costTitle?: DefaultTFuncReturn
    countTitle?: DefaultTFuncReturn
}

export interface TwoFactorFormRef {
    clear: () => void
}

export interface TwoFactorFormProps {
    number?: number
    disabled?: boolean
    password?: boolean
    placeholder?: string
    onSubmit: (data: string) => void
}
