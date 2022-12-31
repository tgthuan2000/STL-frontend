import { TAGS } from '~/constant'

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
    (...keys: Array<keyof T>) => string,
    (...keys: Array<keyof T>) => void,
    Boolean
]
