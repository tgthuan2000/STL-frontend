import { get, isEmpty, isEqual } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Data, useQueryType } from '~/@types/hook'
import { TAGS } from '~/constant'
import { useCache } from '~/context'

/*
    Filter params in query
    OUTPUT: data loading
*/
const filterQueryParams = <T>(
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
const formatTransform = <T extends { [x: string]: any }>(
    prev: Data<T>,
    data: T,
    query: QueryTypeUseQuery<T>,
    params: ParamsTypeUseQuery,
    tags: TagsTypeUseQuery<T>,
    keys: Array<keyof T> = []
) => {
    const filters = filterQueryParams(query, params, tags)
    const arr = Object.keys(data).map((key) => {
        const _d = data[key]

        return {
            [key]: {
                loading: false,
                data: keys.includes(key)
                    ? { hasNextPage: _d.hasNextPage, data: prev[key].data?.data.concat(_d.data) }
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

const assignLoading = <T extends { [x: string]: string }>(prev: Data<T>) => {
    const arr = Object.keys(prev).map((key) => {
        const { query, params, data } = prev[key]
        return { [key]: { loading: true, data, query, params } }
    })
    return Object.assign({}, ...arr)
}

export type ParamsTypeUseQuery = { [y: string]: string | number | string[] }
export type QueryTypeUseQuery<T> = { [Property in keyof T]: string }
export type TagsTypeUseQuery<T> = { [Property in keyof T]: TAGS }

const useQuery = <T extends { [x: string]: any }>(
    query: QueryTypeUseQuery<T>,
    params: ParamsTypeUseQuery = {},
    tags: TagsTypeUseQuery<T>
): useQueryType<T> => {
    const { fetchApi, deleteCache, checkInCache } = useCache()
    const queryRef = useRef(query)
    const paramsRef = useRef(params)
    const tagsRef = useRef(tags)
    const [refetch, setRefetch] = useState<{ reload: boolean; keys: Array<keyof T> }>({
        reload: false,
        keys: [],
    })
    const [error, setError] = useState(false)

    useEffect(() => {
        queryRef.current = query
    }, [query])

    useEffect(() => {
        paramsRef.current = params
    }, [params])

    useEffect(() => {
        tagsRef.current = tags
    }, [tags])

    const [data, setData] = useState<Data<T>>(() =>
        filterQueryParams(queryRef.current, paramsRef.current, tagsRef.current)
    )

    const fetchData = useCallback(async () => {
        // Check in cache
        const { data, callApi } = checkInCache<T>(queryRef.current, paramsRef.current, tagsRef.current, refetch.keys)

        // setData loading
        setData(assignLoading)
        // setData in cache
        if (!isEqual(data, {})) {
            setData((prev) => formatTransform<T>(prev, data, queryRef.current, paramsRef.current, tagsRef.current))
        }

        // fetch data not in cache and cache it
        if (!isEqual(callApi, {})) {
            try {
                const data = await fetchApi<T>(callApi, paramsRef.current, tagsRef.current)
                // setData fetched
                setData((prev) =>
                    formatTransform<T>(prev, data, queryRef.current, paramsRef.current, tagsRef.current, refetch.keys)
                )
            } catch (error) {
                console.log(error)
                setError(true)
            }
        }
    }, [queryRef, paramsRef, checkInCache, refetch])

    const deletedCaches = useCallback(
        (...keys: Array<keyof T>) => {
            const items = keys.map((key) => {
                const { params, query, tags } = data[key]
                return { query, params, tags }
            })
            return deleteCache(items)
        },
        [deleteCache, query, data]
    )

    const reloadData = (...keys: Array<keyof T>) => {
        setRefetch({ reload: true, keys })
    }

    useEffect(() => {
        if (refetch.reload) {
            if (error) {
                setError(false)
            }
            fetchData().then(() => {
                setRefetch({ reload: false, keys: [] })
            })
        }
    }, [refetch.reload, fetchData])

    return [data, fetchData, deletedCaches, reloadData, error]
}

export default useQuery
