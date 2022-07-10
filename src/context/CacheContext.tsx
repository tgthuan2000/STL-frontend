import _ from 'lodash'
import React, { createContext, useContext, useState } from 'react'
import { ICacheContext, ICacheData, QueryParams } from '~/@types/context'
import { client } from '~/sanityConfig'
import { hashCode } from '~/util'

const CACHE_LIMIT_RANGE = 8

const CacheContext = createContext<ICacheContext>({
    fetchApi: <T,>() => Promise.resolve({} as T),
    deleteCache: () => Promise.resolve(''),
})

const CacheProvider = ({ children }: { children: React.ReactNode }) => {
    const [cache, setCache] = useState<Array<ICacheData<any>>>([])

    const updateCache = <T extends { [x: string]: any }>(res: T) => {
        let clone: Array<ICacheData<T>> = JSON.parse(JSON.stringify(cache))

        Object.keys(res).forEach((k) => {
            const { key, data } = res[k]
            if (clone.length >= CACHE_LIMIT_RANGE) {
                clone = clone.slice(1)
            }
            clone.push({ key, data })
        })

        setCache(clone)
    }

    const deleteCache = (payloads: { [x: string]: any }[]) => {
        let count = 0
        let clone: Array<ICacheData<any>> = JSON.parse(JSON.stringify(cache))

        payloads.forEach((payload) => {
            const queryHash = hashCode(JSON.stringify(payload))
            const indexCache = clone.length > 0 ? clone.findIndex((c) => c.key === queryHash) : -1
            if (indexCache !== -1) {
                clone.splice(indexCache, 1)
                count++
            }
        })
        setCache(clone)
        return Promise.resolve('Deleted ' + count + ' cache')
    }

    const fetchApi = async <T extends { [x: string]: any }>(
        query: {
            [Property in keyof T]: string
        },
        params: QueryParams = {}
    ) => {
        const callApi: {
            [x: string]: { value: string; key: number; data: any[] }
        } = {}
        const data = {} as T

        Object.keys(query).forEach((key) => {
            const value = query[key]
            const p = _.isEqual(params, {})
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

        if (!_.isEqual(callApi, {})) {
            const keys = Object.keys(callApi)
            const query = '{' + keys.map((key) => `"${key}": ${callApi[key].value}`).join(', ') + '}'
            const res: T = await client.fetch(query, params)
            Object.assign(data, res)

            const temp = {} as T
            keys.forEach((key) =>
                Object.assign(temp, {
                    [key]: { ...callApi[key], data: res[key] },
                })
            )
            updateCache(temp)
        }
        return data
    }

    const value: ICacheContext = {
        fetchApi,
        deleteCache,
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
