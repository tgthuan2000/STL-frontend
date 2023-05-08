import { Transaction } from '@sanity/client'
import { useCallback, useEffect, useRef } from 'react'
import { client } from '~/sanityConfig'
import { DFCbResult } from './useDF'

const useTDF = <T extends { [x: string]: any }>(
    cb: (trans: Transaction, params: T) => DFCbResult,
    ms: number = 1000
) => {
    const timeout = useRef<NodeJS.Timeout | null>(null)
    const transaction = useRef<Transaction | null>(null)
    const resolves = useRef<Array<(value: void | PromiseLike<void>) => void>>([])
    const callback = useRef(cb)

    useEffect(() => {
        callback.current = cb
    }, [cb])

    const debounce = useCallback((params: T) => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        if (!transaction.current) {
            transaction.current = client.transaction()
        }

        const promise = new Promise<void>((resolve) => {
            resolves.current.push(resolve)
        })

        const { commit, resolved, error } = callback.current(transaction.current, params)

        timeout.current = setTimeout(async () => {
            try {
                await commit()
                resolved?.()
                resolves.current.forEach((resolve) => resolve())
                resolves.current = []
                transaction.current = null
                timeout.current = null
            } catch (err) {
                error?.(err)
            }
        }, ms)

        return promise
    }, [])

    return debounce
}

export default useTDF
