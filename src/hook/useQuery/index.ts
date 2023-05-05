import { isEmpty, isEqual } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
    Data,
    ParamsTypeUseQuery,
    QueryTypeUseQuery,
    RefactorUseQuery,
    TagsTypeUseQuery,
    useQueryType,
} from '~/@types/hook'
import { TAGS } from '~/constant'
import { useCache } from '~/context'
import { assignLoading, filterQueryParams, formatTransform } from './services'

const useQuery = <T extends { [x: string]: any }>(
    query: QueryTypeUseQuery<T>,
    params: ParamsTypeUseQuery = {},
    tags: TagsTypeUseQuery<T>,
    refactor?: RefactorUseQuery<T>,
    isRevert?: boolean
): useQueryType<T> => {
    const { fetchApi, deleteCache, checkInCache, saveCache } = useCache()
    const queryRef = useRef(query)
    const paramsRef = useRef(params)
    const tagsRef = useRef(tags)
    const refactorRef = useRef(refactor)
    const isRevertRef = useRef(isRevert)
    const [refetch, setRefetch] = useState<{ reload: boolean; keys: Array<keyof T> }>({
        reload: false,
        keys: [],
    })
    const [error, setError] = useState(false)
    const dataRef = useRef<Data<T>>()
    const [data, setData] = useState<Data<T>>(() =>
        filterQueryParams(queryRef.current, paramsRef.current, tagsRef.current)
    )

    useEffect(() => {
        queryRef.current = query
    }, [query])

    useEffect(() => {
        paramsRef.current = params
    }, [JSON.stringify(params)])

    useEffect(() => {
        tagsRef.current = tags
    }, [JSON.stringify(tags)])

    useEffect(() => {
        refactorRef.current = refactor
    }, [refactor])

    useEffect(() => {
        isRevertRef.current = isRevert
    }, [isRevert])

    useEffect(() => {
        dataRef.current = data
    }, [data])

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
                let data = await fetchApi<T>(callApi, paramsRef.current)
                data = refactorRef.current?.(data) || data
                data = saveCache(data, callApi, tagsRef.current)

                // setData fetched
                setData((prev) => {
                    const formatted = formatTransform<T>(
                        prev,
                        data,
                        queryRef.current,
                        paramsRef.current,
                        tagsRef.current,
                        refetch.keys,
                        isRevertRef.current
                    )
                    return formatted
                })
            } catch (error) {
                console.log(error)
                setError(true)
            }
        }
    }, [queryRef, paramsRef, refactorRef, checkInCache, refetch])

    const deletedCaches = useCallback(
        (...keys: Array<keyof T>) => {
            const filters = filterQueryParams(queryRef.current, paramsRef.current, tagsRef.current)
            const items = keys.map((key) => {
                if (filters[key]) {
                    const { query, params, tags } = filters[key]
                    return { query, params, tags }
                }
            })
            const arr = items.filter(Boolean) as Array<{ query: string; params: any; tags: TAGS }>
            if (!isEmpty(arr)) {
                return deleteCache(arr)
            }
            return null
        },
        [deleteCache, queryRef, paramsRef, tagsRef]
    )

    const reloadData = (...keys: Array<keyof T>) => {
        setRefetch({ reload: true, keys })
    }

    const getCurrentData = useCallback(() => {
        return structuredClone(dataRef.current)
    }, [])

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

    return [data, fetchData, deletedCaches, reloadData, error, setData, getCurrentData]
}

export default useQuery
