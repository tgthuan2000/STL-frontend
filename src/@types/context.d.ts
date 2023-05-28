import React from 'react'
import { TagsTypeUseQuery } from '~/@types/hook'
import { TAGS } from '~/constant'
import { PERMISSION } from '~/constant/permission'
import { KIND_SPENDING } from '~/constant/spending'
import { AssignedNotify, ClientNotifyDataType } from './notify'
import { LAYOUT_GROUP } from '~/constant/render-layout'

type LoadingItems = {
    config: boolean
    submit: boolean
}

export interface LayoutGroup {
    _id: string
    name?: string
}

export interface Layout {
    _id: string
    name?: string
}
export interface LayoutItem {
    layouts: Layout[]
}

export interface LayoutRender {
    _id: string
    group: LayoutGroup
    layouts: LayoutItem[]
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
export type GetLayoutGroup = (key: keyof typeof LAYOUT_GROUP) => LayoutRender | undefined
export interface IConfigContext {
    kindSpending: IKindSpending[]
    budgetSpending: { _id: string | undefined | null }
    role: IRoleControl | null | undefined
    layouts: LayoutRender[]
    getKindSpendingId: GetKindSpendingId
    getKindSpendingIds: GetKindSpendingIds
    getLayoutGroup: GetLayoutGroup
    hasPermissions: (keys: Array<PERMISSION>) => boolean
    refetchLayout: () => Promise<void>
}

export type SlideOverTitle = React.ReactNode
export type SlideOverContent = React.ReactNode
export type SlideOverFallback = React.ReactNode

export interface SlideOverSetOptions {
    slide?: string
    title: SlideOverTitle
    content: SlideOverContent
    fallback?: SlideOverFallback
}
export interface ISlideOverContext {
    isOpen: boolean
    title: SlideOverTitle
    content: SlideOverContent
    fallback?: SlideOverFallback
    close: () => void
    set: (options: SlideOverSetOptions) => void
}
export type FetchApi = <T extends { [x: string]: any }>(
    callApi: { [x: string]: { query: string; key: number } },
    params: { [y: string]: string | number | string[] | null | undefined }
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
    watchCache: ICacheData<any>
}

export type DataCache<T> = Array<{ key: number; data: { data: T; hasNextPage: boolean } | T }>
export type TagsField = `${TAGS}`
export interface ICacheData<T> {
    [Property in TAGS]?: DataCache<T>
}

export type QueryParams = { [key: string]: string | number | undefined | string[] | null }

export interface IConfig {
    kindSpending: IKindSpending[]
    budgetSpending: { _id: string | undefined | null }
    role: IRoleControl
    layouts: LayoutRender[]
}

export interface ICheckingContext {
    check: boolean
    needCheck: () => void
    needCheckWhenLeave: () => void
    cancelCheck: () => void
    checkWhenLeave: React.MutableRefObject<boolean>
}

export interface ISideBarContext {
    desktop: {
        open: boolean
        set: React.Dispatch<React.SetStateAction<boolean>>
    }
}

export interface INotifyContext {
    notify: AssignedNotify[]
    total: number
    loadNewNotify: boolean
    hasNextPage: boolean
    loading: boolean
    fetch: (__fromNotify?: number, __toNotify?: number) => Promise<void>
    getMore: () => Promise<void>
    readDetail: (data: ClientNotifyDataType) => Promise<string>
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

export interface IFlashScreen {
    show: boolean
    content: React.ReactNode
    showFlashScreen: (content: React.ReactNode) => void
    hiddenFlashScreen: () => void
}

export interface IAccessTokenContext {
    getAccessToken: () => Promise<string | undefined>
}
