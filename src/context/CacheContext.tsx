import { get, isEqual } from 'lodash'
import React, { createContext, useContext, useRef } from 'react'
import { DataCache, DeleteCache, ICacheContext, ICacheData, QueryParams, TagsField } from '~/@types/context'
import { TAGS } from '~/constant'
import { client } from '~/sanityConfig'
import { deleteObjKeys, hashCode } from '~/services'

const CACHE_RANGE = {
    [TAGS.ALTERNATE]: 10,
    [TAGS.ENUM]: Infinity,
    [TAGS.SHORT]: 10,
}

const clone = <T extends ICacheData<T>>(
    obj: ICacheData<any>
): {
    [Property in TAGS]: DataCache<T>
} => JSON.parse(JSON.stringify(obj))

const CacheContext = createContext<ICacheContext>({
    fetchApi: <T,>() => Promise.resolve({} as T),
    deleteCache: () => '',
    checkInCache: <T,>() => ({ data: {} as T, callApi: {} }),
    saveCache: <T,>() => ({} as T),
})

const DeleteObjKeys = ['__from', '__to', '__start', '__end']

const CacheProvider = ({ children }: { children: React.ReactNode }) => {
    const cacheRef = useRef<ICacheData<any>>(Object.assign({}, ...Object.values(TAGS).map((tag) => ({ [tag]: [] }))))

    /*
        INPUT: data need to be cached
        OUTPUT: update cache
    */
    const updateCache = <T extends ICacheData<T>>(groups: T) => {
        let cache = clone<T>(cacheRef.current)

        /* Check space in cache & cached data */
        for (const group of Object.entries(groups)) {
            const [tags, data] = group as [TagsField, DataCache<T>]
            const __cache = cache[tags]

            if (__cache) {
                data.forEach((d) => {
                    const indexCached = __cache.findIndex((c) => c.key === d.key)
                    if (indexCached !== -1) {
                        const { data } = __cache[indexCached]

                        cache[tags][indexCached] = {
                            ...cache[tags][indexCached],
                            data: {
                                hasNextPage: get(d.data, 'hasNextPage', false),
                                data: [...get(data, 'data', []), ...get(d.data, 'data', [])],
                            } as any,
                        }
                        return
                    }

                    /* Check spacing of cache (remove first element of array if have not space) */
                    const calc = __cache.length + data.length - get(CACHE_RANGE, tags, 0)
                    if (calc >= 0) {
                        __cache.splice(0, calc)
                    }
                    /* Cache data */
                    cache[tags] = [...__cache, ...data]
                })
            }
        }
        cacheRef.current = cache
    }

    /*
        INPUT: payloads Array<{ query, params, tags }> elements need to be deleted
        OUTPUT: Delete cached data
    */
    const deleteCache: DeleteCache = (payloads) => {
        let cache = clone<any>(cacheRef.current)
        let count = 0

        payloads.forEach((payload) => {
            const { query, params, tags } = payload

            const __params = deleteObjKeys(params, DeleteObjKeys)
            /* queryHash: hash query & params (exclude from, to params) */
            const queryHash = hashCode(JSON.stringify({ query, params: __params }))

            /* __cache: cache data of tag */
            const __cache = cache[tags]

            /* indexCache: index of cached data */
            const indexCache = __cache.length > 0 ? __cache.findIndex((c) => c.key === queryHash) : -1
            if (indexCache !== -1) {
                __cache.splice(indexCache, 1)
                cache[tags] = __cache
                count++
            }
        })
        cacheRef.current = cache

        return 'Deleted ' + count + ' cached data'
    }

    /*
        INPUT: callApi: { x: { query: queryString, key: hash query & params } },  params: all params, tags: { x: TAGS }
        OUTPUT: data called from API
    */
    const fetchApi = async <T extends { [x: string]: any }>(
        callApi: { [x: string]: { query: string; key: number } },
        params: { [y: string]: string | number | string[] | null }
    ) => {
        /* keys: key of query (EX: recent, methodSpending, v.v) */
        const keys = Object.keys(callApi)
        /* q: Query string */
        const q = '{' + keys.map((key) => `"${key}": ${callApi[key].query}`).join(', ') + '}'
        /* Call API */
        const res: T = await client.fetch(q, params)
        return res
    }

    const saveCache = <T extends { [x: string]: any }>(
        res: T,
        callApi: { [x: string]: { query: string; key: number } },
        tags: { [x: string]: TAGS }
    ) => {
        const keys = Object.keys(callApi)
        const data = {} as T

        Object.assign(data, res)

        const groups: any = {
            [TAGS.ALTERNATE]: [],
            [TAGS.ENUM]: [],
            [TAGS.SHORT]: [],
        }

        keys.forEach((key) => {
            groups[tags[key]] = [...groups[tags[key]], { ...callApi[key], data: data[key] }]
        })

        updateCache(groups)

        return data
    }

    /*
        INPUT: query params tags
        OUTPUT: data (cached) & callApi (not in cache) { x: { value: queryString, key: hash query & params } }
    */
    const checkInCache = <T extends { [x: string]: any }>(
        query: {
            [Property in keyof T]: string
        },
        params: QueryParams = {},
        tags: { [x: string]: TAGS },
        keys: Array<keyof T> = []
    ) => {
        const __params = deleteObjKeys(params, DeleteObjKeys)
        const callApi: {
            [x: string]: { query: string; key: number }
        } = {}
        const data = {} as T

        const cache = clone<T>(cacheRef.current)

        Object.keys(query).forEach((key) => {
            const value = query[key]
            /* p: GET params of query string */
            const p = isEqual(__params, {})
                ? {}
                : Object.assign(
                      {},
                      ...Object.keys(__params)
                          .filter((x) => value.includes(x))
                          .map((v) => ({ [v]: __params[v] }))
                  )

            /* queryHash: hash query & params (exclude from to params) */
            const queryHash = hashCode(JSON.stringify({ query: value, params: p }))

            /* __cache: cache data of tag */
            const __cache = cache[tags[key]]

            /* indexCache: index of cache data => in one loop return 1 element: data (cached) OR callApi (not in cache) */
            const indexCache =
                __cache.length > 0 && !keys.includes(key) ? __cache.findIndex((c) => c.key === queryHash) : -1
            if (indexCache !== -1) {
                Object.assign(data, { [key]: __cache[indexCache].data })
            } else {
                Object.assign(callApi, { [key]: { query: value, key: queryHash } })
            }
        })

        return { data, callApi }
    }

    const value: ICacheContext = {
        fetchApi,
        deleteCache,
        checkInCache,
        saveCache,
    }

    return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
}

const useCache = () => {
    const context = useContext(CacheContext)

    if (!context) {
        throw new Error('useCache must be used within a CacheProvider')
    }

    return context
}

export { useCache, CacheProvider }
