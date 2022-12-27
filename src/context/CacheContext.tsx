import { isEqual } from 'lodash'
import React, { createContext, useContext, useRef } from 'react'
import { ICacheContext, ICacheData, QueryParams } from '~/@types/context'
import { TAGS } from '~/constant'
import { client } from '~/sanityConfig'
import { hashCode } from '~/services'

const CACHE_LIMIT_RANGE = 8

const CacheContext = createContext<ICacheContext>({
    fetchApi: <T,>() => Promise.resolve({} as T),
    deleteCache: () => '',
    checkInCache: <T,>() => ({ data: {} as T, callApi: {} }),
})

const CacheProvider = ({ children }: { children: React.ReactNode }) => {
    const cacheRef = useRef<ICacheData<any>>(Object.assign({}, ...Object.values(TAGS).map((tag) => ({ [tag]: [] }))))

    const updateCache = <T extends ICacheData<any>>(groups: T) => {
        let cache: ICacheData<T> = JSON.parse(JSON.stringify(cacheRef.current))

        Object.keys(groups).forEach((groupKey) => {
            const groupData = groups[groupKey] as Array<{ key: number; data: T }>
            const cacheData = cache[groupKey] as Array<{ key: number; data: T }>
            if (cacheData.length >= CACHE_LIMIT_RANGE) {
                cache = cache.slice(1)
            }
            cache.push({ key, data })
        })

        cacheRef.current = cache
    }
    console.log(cacheRef.current)
    const deleteCache = (payloads: { [x: string]: any }[]) => {
        const cache: Array<ICacheData<any>> = JSON.parse(JSON.stringify(cacheRef.current))
        let count = 0

        payloads.forEach((payload) => {
            const queryHash = hashCode(JSON.stringify(payload))
            const indexCache = cache.length > 0 ? cache.findIndex((c) => c.key === queryHash) : -1
            if (indexCache !== -1) {
                cache.splice(indexCache, 1)
                count++
            }
        })
        cacheRef.current = cache

        return 'Deleted ' + count + ' cached data'
    }

    const fetchApi = async <T extends { [x: string]: any }>(
        callApi: { [x: string]: { value: string; key: number; data: any[] } },
        params: { [y: string]: string | number | string[] },
        tags: { [x: string]: TAGS }
    ) => {
        const data = {} as T
        const keys = Object.keys(callApi)
        const q = '{' + keys.map((key) => `"${key}": ${callApi[key].value}`).join(', ') + '}'
        const res: T = await client.fetch(q, params)
        Object.assign(data, res)

        const groups = {} as T
        keys.forEach((key) =>
            Object.assign(groups, {
                [tags[key]]: [{ ...callApi[key], data: res[key] }],
            })
        )

        updateCache(groups)

        return data
    }
    const checkInCache = <T extends { [x: string]: any }>(
        query: {
            [Property in keyof T]: string
        },
        params: QueryParams = {}
    ) => {
        const callApi: {
            [x: string]: { value: string; key: number; data: any[] }
        } = {}
        const data = {} as T
        const cache: Array<ICacheData<any>> = JSON.parse(JSON.stringify(cacheRef.current))

        Object.keys(query).forEach((key) => {
            const value = query[key]
            const p = isEqual(params, {})
                ? {}
                : Object.assign(
                      {},
                      ...Object.keys(params)
                          .filter((x) => value.includes(x))
                          .map((v) => ({ [v]: params[v] }))
                  )
            const queryHash = hashCode(JSON.stringify({ [key]: value, params: p }))

            const indexCache = cache.length > 0 ? cache.findIndex((c) => c.key === queryHash) : -1
            if (indexCache !== -1) {
                Object.assign(data, { [key]: cache[indexCache].data })
            } else {
                Object.assign(callApi, { [key]: { value, key: queryHash } })
            }
        })

        return { data, callApi }
    }

    const value: ICacheContext = {
        fetchApi,
        deleteCache,
        checkInCache,
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
