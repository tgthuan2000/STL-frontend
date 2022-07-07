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
export type FetchApi = <T>(query: string, params?: QueryParams = {}, status?: 'no-cache') => Promise<T>

export interface ICacheContext {
    fetchApi: FetchApi
    setIsRefetch: React.Dispatch<React.SetStateAction<boolean>>
}
export interface ICacheData<T> {
    key: number
    data: T
}

export type QueryParams = { [key: string]: any }
