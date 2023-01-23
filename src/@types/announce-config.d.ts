import React, { SetStateAction } from 'react'
import { URLSearchParams } from 'url'
import { TimeFilterPayload } from '~/@types/components'
import { NotifyQueryData } from '~/@types/notify'
import { DATA_LIST_MODE } from '~/constant/component'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import { IUserProfile } from './auth'
import { NotifyAssignForm, NotifyContentForm, NotifyTitleDescForm } from './notify'

export interface CreateStep1Props {
    id: string
    onSubmit: (data: NotifyContentForm) => void
}
export interface CreateStep2Props {
    id: string
    onSubmit: (data: NotifyTitleDescForm) => void
}

export interface CreateStep3Props {
    id: string
    onSubmit: (data: NotifyAssignForm) => void
}
export interface QueryDataStep3 {
    users: {
        data: IUserProfile[]
        hasNextPage: boolean
    }
}
export interface CreateStep4Props {
    id: string
    onSubmit: (data: localStorageValue<DraftNotify>) => Promise<void>
}

/* --- SERVICES --- */

export interface Services {
    getAll: DefaultValueResult
    getDefaultValue: GetDefaultValue
    filterSubmit: FilterSubmit
    getDropdownOptions: GetDropdownOptions
    getListGroupOptions: GetLisGroupOptions
}

type GetLisGroupOptions = () => Array<Array<ListGroupResult>>
type GetDefaultValue = (options: DefaultValueOption) => DefaultValueResult

type FilterSubmit = (
    data: TimeFilterPayload,
    options: FilterSubmitOption
) => SetStateAction<DefaultValueResult> | undefined

type GetDropdownOptions = (options: DropdownOptions) => Array<Array<DropdownResult>>

interface DropdownResult {
    id: DATA_LIST_MODE | number
    name: string
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
    onClick?: () => void
}

interface ListGroupResult {
    id: DATA_LIST_GROUP
    name: string
}
interface DropdownOptions {
    onReloadClick: () => void
}
interface FilterSubmitOption {
    defaultValues: DefaultValueResult
}
interface DefaultValueOption {
    searchParams: URLSearchParams
}
export interface DefaultValueResult {
    query: QueryTypeUseQuery<NotifyQueryData>
    params: ParamsTypeUseQuery
    tags: TagsTypeUseQuery<NotifyQueryData>
}

/* --- SERVICES --- */
