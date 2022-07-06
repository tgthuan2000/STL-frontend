export interface ILoadingContext {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IKindSpending {
    _id: string
    key: string
    name: string
}

export interface IConfigContext {
    kindSpending: IKindSpending[]
}

export interface ISlideOverContext {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

export interface ICacheContext {
    fetchApi: <T>(query: string, params?: QueryParams, options: null | 'no-cache') => Promise<T>
}
export interface ICacheData<T> {
    key: number
    data: T
}

export type QueryParams = { [key: string]: any }
