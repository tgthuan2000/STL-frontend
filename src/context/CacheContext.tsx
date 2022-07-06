import _ from 'lodash'
import React, { createContext, useContext, useState } from 'react'
import { ICacheContext, ICacheData, QueryParams } from '~/@types/context'
import { client } from '~/sanityConfig'
import { hashCode } from '~/util'

const CACHE_LIMIT_RANGE = 5

const CacheContext = createContext<ICacheContext>({
    fetchApi: <T,>() => Promise.resolve({} as T),
})

const CacheProvider = ({ children }: { children: React.ReactNode }) => {
    const [cache, setCache] = useState<Array<ICacheData<any>>>([])

    const updateCache = <T,>(
        newKey: number,
        newData: T,
        options: { status: null | 'no-cache'; indexCache: number }
    ) => {
        let clone: Array<ICacheData<T>> = JSON.parse(JSON.stringify(cache))
        if (options.status === 'no-cache' && options.indexCache !== -1) {
            clone.splice(options.indexCache, 1)
        }
        if (clone.length >= CACHE_LIMIT_RANGE) {
            clone = clone.slice(1)
        }
        clone.push({ key: newKey, data: newData })
        setCache(clone)
    }

    const fetchApi = async <T,>(query: string, params: QueryParams = {}, status: 'no-cache' | null = null) => {
        const queryHash = hashCode(query + JSON.stringify(params))
        const indexCache = cache.length > 0 ? cache.findIndex((c) => c.key === queryHash) : -1
        if (indexCache !== -1 && _.isNull(status)) {
            return cache[indexCache].data as T
        } else {
            const data: T = await client.fetch(query, params)
            updateCache<T>(queryHash, data, { status, indexCache })
            return data
        }
    }

    const value: ICacheContext = {
        fetchApi,
    }

    return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
}

const useCache = () => {
    const context = useContext(CacheContext)

    if (!context) {
        throw new Error('useCache must be used within a CacheProvider. Using SlideOverHOC to wrap parent component')
    }

    return context
}

export { useCache, CacheProvider }
