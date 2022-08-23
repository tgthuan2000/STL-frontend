export type Data<T> = {
    [Property in keyof T]: {
        loading: boolean
        data: undefined | T[Property]
        query: string
        params?: {}
    }
}

export type useQueryType<T> = [Data<T>, () => Promise<void>, (...keys: Array<keyof T>) => string, () => void, Boolean]
