import { get, isEmpty, isEqual } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Data, useQueryType } from '~/@types/hook'
import { useCache } from '~/context'

const filterQueryParams = <T>(query: QueryTypeUseQuery<T>, params: ParamsTypeUseQuery = {}) => {
    const keys = Object.keys(params)

    const data = Object.keys(query).map((key) => {
        let p: ParamsTypeUseQuery = {}
        const item = get(query, key, '') as string

        if (!isEmpty(keys)) {
            p = Object.assign({}, ...keys.filter((x) => item.includes(x)).map((v) => ({ [v]: params[v] })))
        }

        return { [key]: { loading: true, data: undefined, query: item, params: p } }
    })
    return Object.assign({}, ...data) as Data<T>
}

const formatTransform = <T extends { [x: string]: string }>(
    prev: Data<T>,
    data: T,
    queries: QueryTypeUseQuery<T>,
    params: ParamsTypeUseQuery
) => {
    const filters = filterQueryParams(queries, params)
    const arr = Object.keys(data).map((key) => {
        return {
            [key]: {
                loading: false,
                data: data[key],
                query: queries[key],
                params: filters[key].params,
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

const useQuery = <T extends { [x: string]: any }>(
    query: QueryTypeUseQuery<T>,
    params: ParamsTypeUseQuery = {}
): useQueryType<T> => {
    const { fetchApi, deleteCache, checkInCache } = useCache()
    const queryRef = useRef(query)
    const paramsRef = useRef(params)
    const [reload, setReload] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        queryRef.current = query
    }, [query])

    useEffect(() => {
        paramsRef.current = params
    }, [params])

    const [data, setData] = useState<Data<T>>(() => filterQueryParams(queryRef.current, paramsRef.current))

    const fetchData = useCallback(async () => {
        // Check in cache
        const { data, callApi } = checkInCache<T>(queryRef.current, paramsRef.current)

        // setData loading
        setData(assignLoading)
        // setData in cache
        if (!isEqual(data, {})) {
            setData((prev) => formatTransform<T>(prev, data, queryRef.current, paramsRef.current))
        }

        // fetch data not in cache and cache it
        if (!isEqual(callApi, {})) {
            try {
                const data = await fetchApi<T>(callApi, paramsRef.current)
                // setData fetched
                setData((prev) => formatTransform<T>(prev, data, queryRef.current, paramsRef.current))
            } catch (error) {
                console.log(error)
                setError(true)
            }
        }
    }, [queryRef, paramsRef, checkInCache])

    const deletedCaches = useCallback(
        (...keys: Array<keyof T>) => {
            const items = keys.map((key) => {
                const { params, query } = data[key]
                return { [key]: query, params }
            })
            return deleteCache(items)
        },
        [deleteCache, query, data]
    )

    const reloadData = () => {
        setReload(true)
    }

    useEffect(() => {
        if (reload) {
            fetchData().then(() => {
                setReload(false)
            })
        }
    }, [reload, fetchData])

    return [data, fetchData, deletedCaches, reloadData, error]
}

export default useQuery
