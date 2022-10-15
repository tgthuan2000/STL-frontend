import { isEmpty, isEqual } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Data, useQueryType } from '~/@types/hook'
import { useCache } from '~/context'

const formatTransform = <T extends { [x: string]: string }>(prev: Data<T>, data: T) => {
    const arr = Object.keys(data).map((key) => {
        const { query, params } = prev[key]
        return { [key]: { loading: false, data: data[key], query, params } }
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

const useQuery = <T extends { [x: string]: any }>(
    query: { [Property in keyof T]: string },
    params: { [y: string]: string | number } = {}
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

    const [data, setData] = useState<Data<T>>(() => {
        const keys = Object.keys(paramsRef.current)

        const data = Object.keys(queryRef.current).map((key) => {
            let p = {}

            if (!isEmpty(keys)) {
                p = Object.assign(
                    {},
                    ...keys.filter((x) => queryRef.current[key].includes(x)).map((v) => ({ [v]: paramsRef.current[v] }))
                )
            }

            return { [key]: { loading: true, data: undefined, query: queryRef.current[key], params: p } }
        })
        return Object.assign({}, ...data)
    })

    const fetchData = useCallback(async () => {
        // Check in cache
        const { data, callApi } = checkInCache<T>(queryRef.current, paramsRef.current)

        // setData loading
        setData(assignLoading)
        // setData in cache
        if (!isEqual(data, {})) {
            setData((prev) => formatTransform<T>(prev, data))
        }

        // fetch data not in cache and cache it
        if (!isEqual(callApi, {})) {
            try {
                const data = await fetchApi<T>(callApi, paramsRef.current)
                // setData fetched
                setData((prev) => formatTransform<T>(prev, data))
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
        [deleteCache, query]
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
    }, [reload])

    return [data, fetchData, deletedCaches, reloadData, error]
}

export default useQuery