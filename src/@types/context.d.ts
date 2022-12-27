import { TAGS } from '~/constant'
import { KIND_LOAN } from '~/constant/loan'
import { KIND_SPENDING } from '~/constant/spending'
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
    callApi: { [x: string]: { value: string; key: number; data: any[] } },
    params: { [y: string]: string | number | string[] },
    tags: { [x: string]: TAGS }
) => Promise<T>

export type CheckInCache = <
    T extends {
        [x: string]: any
    }
>(
    query: { [Property in keyof T]: string },
    params?: QueryParams
) => {
    data: T
    callApi: {
        [x: string]: {
            value: string
            key: number
            data: any[]
        }
    }
}

export interface ICacheContext {
    fetchApi: FetchApi
    checkInCache: CheckInCache
    deleteCache: (payloads: { [x: string]: any }[]) => string
}
export interface ICacheData<T> {
    [Property in TAGS]: Array<{ key: number; data: T }>
}

export type QueryParams = { [key: string]: string | number | undefined | string[] }

export interface IConfig {
    kindSpending: IKindSpending[]
    budgetSpending: { _id: string | undefined | null }
}
