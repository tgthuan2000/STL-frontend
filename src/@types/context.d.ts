import { KIND_SPENDING } from '~/constant/spending'

export interface ILoadingContext {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IKindSpending {
    _id: string
    key: KIND_SPENDING
    name: string
}

export interface IConfigContext {
    kindSpending: IKindSpending[]
    getKindSpendingId: (KEY: keyof typeof KIND_SPENDING) => string | undefined
}

export interface ISlideOverContext {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
}
export type FetchApi = <
    T extends {
        [x: string]: any
    }
>(
    query: { [Property in keyof T]: string },
    params?: QueryParams,
    status?: 'no-cache' | undefined
) => Promise<T>

export interface ICacheContext {
    fetchApi: FetchApi
    deleteCache: (payloads: { [x: string]: any }[]) => Promise<string>
}
export interface ICacheData<T> {
    key: number
    data: T
}

export type QueryParams = { [key: string]: string | number | undefined }
