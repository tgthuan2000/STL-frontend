import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import { get, isEqual } from 'lodash'
import React, { Suspense, createContext, lazy, useCallback, useContext, useRef, useState } from 'react'
import { DataCache, DeleteCache, ICacheContext, ICacheData, QueryParams, TagsField } from '~/@types/context'
import { TAGS } from '~/constant'
import { client } from '~/sanityConfig'
import { service } from '~/services'

const WatchCache = lazy(() => import('~/components/Cache'))

export const CACHE_RANGE = {
    [TAGS.ALTERNATE]: 10,
    [TAGS.ENUM]: Infinity,
    [TAGS.SHORT]: 10,
}

const clone = <T extends ICacheData<T>>(
    obj: ICacheData<any>
): {
    [Property in TAGS]: DataCache<T>
} => structuredClone(obj) as any

const WATCH_CACHE_MODE = import.meta.env.VITE_WATCH_CACHE_MODE.toLowerCase() === 'true'

const CacheContext = createContext<ICacheContext>({
    fetchApi: <T,>() => Promise.resolve({} as T),
    deleteCache: () => '',
    checkInCache: <T,>() => ({ data: {} as T, callApi: {} }),
    saveCache: <T,>() => ({} as T),
    watchCache: {},
})

const DeleteObjKeys = ['__from', '__to', '__start', '__end', '__exclude']

interface Props {
    children: React.ReactNode
}

const CacheProvider: React.FC<Props> = (props) => {
    const { children } = props
    const cacheRef = useRef<ICacheData<any>>(Object.assign({}, ...Object.values(TAGS).map((tag) => ({ [tag]: [] }))))
    const [stateCache, setStateCache] = useState(cacheRef.current)

    const _update = <T extends any>(cache: ICacheData<T>) => {
        cacheRef.current = cache

        if (WATCH_CACHE_MODE) {
            setStateCache(cacheRef.current)
        }
    }

    /*
        INPUT: data need to be cached
        OUTPUT: update cache
    */
    const updateCache = useCallback(<T extends ICacheData<T>>(groups: T) => {
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

                        if (get(data, 'data')) {
                            cache[tags][indexCached] = {
                                ...cache[tags][indexCached],
                                data: {
                                    hasNextPage: get(d.data, 'hasNextPage', false),
                                    data: [...(get(data, 'data', []) as any[]), ...(get(d.data, 'data', []) as any[])],
                                } as any,
                            }
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

        _update<T>(cache)
    }, [])

    /*
        INPUT: payloads Array<{ query, params, tags }> elements need to be deleted
        OUTPUT: Delete cached data
    */
    const deleteCache: DeleteCache = useCallback((payloads) => {
        let cache = clone<any>(cacheRef.current)
        let count = 0

        payloads.forEach((payload) => {
            const { query, params, tags } = payload

            const __params = service.deleteObjKeys(params, DeleteObjKeys)
            /* queryHash: hash query & params (exclude from, to,... params) */
            const queryHash = service.hashCode(JSON.stringify({ query, params: __params }))

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
        _update<any>(cache)

        return 'Deleted ' + count + ' cached data'
    }, [])

    /*
        INPUT: callApi: { x: { query: queryString, key: hash query & params } },  params: all params, tags: { x: TAGS }
        OUTPUT: data called from API
    */
    const fetchApi = async <T extends { [x: string]: any }>(
        callApi: { [x: string]: { query: string; key: number } },
        params: { [y: string]: string | number | string[] | null | undefined }
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
        const __params = service.deleteObjKeys(params, DeleteObjKeys)
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
                          .filter((x) => value.includes('$' + x))
                          .map((v) => ({ [v]: __params[v] }))
                  )

            /* queryHash: hash query & params (exclude from to params) */
            const queryHash = service.hashCode(JSON.stringify({ query: value, params: p }))

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
        watchCache: stateCache,
    }

    return (
        <CacheContext.Provider value={value}>
            {WATCH_CACHE_MODE && (
                <Suspense fallback={<CubeTransparentIcon className='h-5 w-5 animate-pulse' />}>
                    <WatchCache />
                </Suspense>
            )}
            {children}
        </CacheContext.Provider>
    )
}

const useCache = () => {
    const context = useContext(CacheContext)

    if (!context) {
        throw new Error('useCache must be used within a CacheProvider')
    }

    const { watchCache, ...ctx } = context

    return ctx
}

const useWatchCache = () => {
    const context = useContext(CacheContext)

    if (!context) {
        throw new Error('useCache must be used within a CacheProvider')
    }

    const { watchCache, ...ctx } = context

    return watchCache
}

export { useCache, useWatchCache, CacheProvider }
