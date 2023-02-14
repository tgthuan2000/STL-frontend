import { get, isEmpty } from 'lodash'
import { Data, ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'

/*
    Filter params in query
    OUTPUT: data loading
*/
export const filterQueryParams = <T>(
    query: QueryTypeUseQuery<T>,
    params: ParamsTypeUseQuery = {},
    tags: TagsTypeUseQuery<T>
) => {
    const keys = Object.keys(params)

    const data = Object.keys(query).map((key) => {
        let p: ParamsTypeUseQuery = {}
        const item = get(query, key, '') as string
        const tag = get(tags, key, '') as string

        if (!isEmpty(keys)) {
            p = Object.assign({}, ...keys.filter((x) => item.includes(x)).map((v) => ({ [v]: params[v] })))
        }

        return { [key]: { loading: true, data: undefined, query: item, params: p, tags: tag } }
    })
    return Object.assign({}, ...data) as Data<T>
}

/*
    Format data from api
    OUTPUT: data
*/
export const formatTransform = <T extends { [x: string]: any }>(
    prev: Data<T>,
    data: T,
    query: QueryTypeUseQuery<T>,
    params: ParamsTypeUseQuery,
    tags: TagsTypeUseQuery<T>,
    keys: Array<keyof T> = [],
    isRevert: boolean = false
) => {
    const filters = filterQueryParams(query, params, tags)
    const arr = Object.keys(data).map((key) => {
        const _d = data[key]

        return {
            [key]: {
                loading: false,
                data: keys.includes(key)
                    ? {
                          hasNextPage: _d.hasNextPage,
                          data: prev[key].data
                              ? isRevert
                                  ? _d.data.concat(prev[key].data?.data)
                                  : prev[key].data?.data.concat(_d.data)
                              : _d.data,
                      }
                    : _d,
                query: query[key],
                params: filters[key].params,
                tags: tags[key],
            },
        }
    })
    const assign = Object.assign({}, ...arr)
    return { ...prev, ...assign }
}

export const assignLoading = <T extends { [x: string]: string }>(prev: Data<T>) => {
    const arr = Object.keys(prev).map((key) => {
        const { query, params, data } = prev[key]
        return { [key]: { loading: true, data, query, params } }
    })
    return Object.assign({}, ...arr)
}
