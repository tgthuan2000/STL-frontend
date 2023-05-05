import { EmailJSResponseStatus } from '@emailjs/browser'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TAGS } from '~/constant'
import { DATA_LIST_GROUP, DATA_LIST_MODE } from '~/constant/component'
import { DataListOptionsResult } from '.'
import { OptionMode } from './utils'

export type Data<T> = {
    [Property in keyof T]: {
        loading: boolean
        data: undefined | T[Property]
        query: string
        params?: ParamsTypeUseQuery
        tags: TAGS
    }
}

export type useQueryType<T> = [
    Data<T>,
    () => Promise<void>,
    (...keys: Array<keyof T>) => string | null,
    (...keys: Array<keyof T>) => void,
    Boolean,
    React.Dispatch<React.SetStateAction<Data<T>>>,
    () => Data<T> | undefined
]

export type ParamsTypeUseQuery = { [y: string]: string | number | null | string[] | undefined }
export type QueryTypeUseQuery<T> = { [Property in keyof T]: string }
export type TagsTypeUseQuery<T> = { [Property in keyof T]: TAGS }
export type RefactorUseQuery<T> = (data: T) => T

export type IUseMail = (
    templateId: string,
    serviceId?: string
) => [(params: MailParams) => Promise<EmailJSResponseStatus>]

export interface MailParams extends Record<string, unknown> {
    from_name?: string
    from_email?: string
    to_name?: string
    to_email?: string
    message?: string
}

export type ViewMode = OptionMode<DATA_LIST_MODE>
export type ListGroup = OptionMode<DATA_LIST_GROUP>
export type ListGroupOption = Array<Array<{ id: DATA_LIST_GROUP; name: string }>>

export interface ListViewResult {
    viewMode: ViewMode
    listGroup: ListGroup
    form: UseFormReturn<{ viewMode: ViewMode; listGroup: ListGroup }, any>
    dropdownOptions: DataListOptionsResult
    listGroupOptions: ListGroupOption
}

export type UseListViewFilter = (onReload?: () => void) => ListViewResult

export type localStorageValue<T> = T | undefined
export type valueSet<T> = T | ((value: localStorageValue<T>) => T)
export type UseLocalStorageResult<T> = [
    value: localStorageValue<T>,
    set: (value: valueSet<T>) => void,
    remove: () => void
]

export type CreateDoc = { _id: string; name: string }

export interface Service {
    createMethod(name: string): CreateMethodDoc
    createCategory(name: string, kindSpendingId: string): CreateCategoryDoc
    create(document: CreateMethodDoc | CreateCategoryDoc): Promise<SanityDocument<CreateDoc>>
}

export interface CreateMethodDoc {
    _type: string
    name?: string
    surplus: number
    user: {
        _type: string
        _ref?: string
    }
    active: boolean
}

export interface CreateCategoryDoc {
    _type: string
    name?: string
    kindSpending: {
        _type: string
        _ref?: string
    }
    user: {
        _type: string
        _ref?: string
    }
    active: boolean
}

export interface DataStatistic {
    dateRange: string[]
    data: (
        | {
              _id: string
              value: number
              getLoan: number
              name: string
              color: string
          }
        | {
              _id: string
              value: number
              name: string
              color: string
              getLoan?: undefined
          }
    )[]
}
