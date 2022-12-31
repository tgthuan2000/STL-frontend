import { TAGS } from '~/constant'
import { KIND_LOAN } from '~/constant/loan'
import { KIND_SPENDING } from '~/constant/spending'
import { TagsTypeUseQuery } from '~/hook/useQuery'
import { IBudgetSpending } from './spending'

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

export interface IConfigContext {
    kindSpending: IKindSpending[]
    budgetSpending: { _id: string | undefined | null }
    getKindSpendingId: (KEY: keyof typeof KIND_SPENDING) => string | undefined
    getKindSpendingIds: (...KEYS: (keyof typeof KIND_SPENDING)[]) => string[]
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
    params: { [y: string]: string | number | string[] },
    tags: { [x: string]: TAGS }
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

export interface ICacheContext {
    fetchApi: FetchApi
    checkInCache: CheckInCache
    deleteCache: DeleteCache
}

export type DataCache<T> = Array<{ key: number; data: { data: T; hasNextPage: boolean } | T }>
export type TagsField = `${TAGS}`
export interface ICacheData<T> {
    [Property in TAGS]?: DataCache<T>
}

export type QueryParams = { [key: string]: string | number | undefined | string[] }

export interface IConfig {
    kindSpending: IKindSpending[]
    budgetSpending: { _id: string | undefined | null }
}
