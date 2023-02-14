import { SanityDocument } from '@sanity/client'
import React from 'react'
import { TagsTypeUseQuery } from '~/@types/hook'
import { TAGS } from '~/constant'
import { PERMISSION } from '~/constant/permission'
import { KIND_SPENDING } from '~/constant/spending'
import { NotifyItem } from './notify'

type LoadingItems = {
    config: boolean
    submit: boolean
}
export interface ILoadingContext {
    loading: LoadingItems
    setConfigLoading: (config: boolean) => void
    setSubmitLoading: (submit: boolean) => void
}

export interface IKindSpending {
    _id: string
    key: KIND_SPENDING
    name: string
}
export type GetKindSpendingId = (KEY: keyof typeof KIND_SPENDING) => string | undefined
export type GetKindSpendingIds = (...KEYS: (keyof typeof KIND_SPENDING)[]) => string[]
export interface IConfigContext {
    kindSpending: IKindSpending[]
    budgetSpending: { _id: string | undefined | null }
    role: IRoleControl | null | undefined
    getKindSpendingId: GetKindSpendingId
    getKindSpendingIds: GetKindSpendingIds
    hasPermissions: (keys: Array<PERMISSION>) => boolean
    ok: boolean
}

export interface ISlideOverContext {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
}
export type FetchApi = <T extends { [x: string]: any }>(
    callApi: { [x: string]: { query: string; key: number } },
    params: { [y: string]: string | number | string[] | null }
) => Promise<T>

export type CheckInCache = <T extends { [x: string]: any }>(
    query: { [Property in keyof T]: string },
    params?: QueryParams,
    tags: { [x: string]: TAGS },
    keys: Array<keyof T>
) => {
    data: T
    callApi: {
        [x: string]: {
            query: string
            key: number
        }
    }
}

export type DeleteCache = <T extends { [x: string]: any }>(
    payloads: Array<{
        query: string
        params: { [y: string]: string | number | string[] }
        tags: TagsTypeUseQuery<T>[keyof T]
    }>
) => string

export type SaveCache = <
    T extends {
        [x: string]: any
    }
>(
    res: T,
    callApi: {
        [x: string]: {
            query: string
            key: number
        }
    },
    tags: {
        [x: string]: TAGS
    }
) => T

export interface ICacheContext {
    fetchApi: FetchApi
    checkInCache: CheckInCache
    deleteCache: DeleteCache
    saveCache: SaveCache
}

export type DataCache<T> = Array<{ key: number; data: { data: T; hasNextPage: boolean } | T }>
export type TagsField = `${TAGS}`
export interface ICacheData<T> {
    [Property in TAGS]?: DataCache<T>
}

export type QueryParams = { [key: string]: string | number | undefined | string[] | null }

export interface IPermissions {
    _id: PERMISSION
    name: string
    key: string
}
export interface IRoleControl {
    _id: string
    name: string
    key: string
    permissions: IPermissions[]
}
export interface IConfig {
    kindSpending: IKindSpending[]
    budgetSpending: { _id: string | undefined | null }
    role: { role: IRoleControl } | null
}

export interface ICheckingContext {
    check: boolean
    needCheck: () => void
    needCheckWhenLeave: () => void
    cancelCheck: () => void
    checkWhenLeave: boolean
}

export interface ISideBarContext {
    desktop: {
        open: boolean
        set: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export interface INotifyContext {
    notify: SanityDocument<NotifyItem>[]
    total: number
    loadNewNotify: boolean
    hasNextPage: boolean
    loading: boolean
    fetch: (__fromNotify?: number, __toNotify?: number) => Promise<void>
    getMore: () => Promise<void>
    readDetail: (data: SanityDocument<NotifyItem>) => Promise<string>
}

export interface IScrollToTopContext {
    scrollToTop: () => void
}

export interface IFilePreview {
    file: any
    type: any
    onPreview: (file: any) => void
    clear: () => void
}
