import { Transaction } from '@sanity/client'
import { useCallback, useEffect, useRef } from 'react'
import { client } from '~/sanityConfig'

const useDebounceFunc = <T extends { [x: string]: any }>(
    cb: (trans: Transaction, params: T) => (() => void) | void,
    ms: number = 1000
) => {
    const transaction = useRef<Transaction | null>(null)
    const timeout = useRef<NodeJS.Timeout | null>(null)
    const promise = useRef<Promise<void> | null>(null)
    const callback = useRef(cb)

    useEffect(() => {
        callback.current = cb
    }, [cb])

    const debounce = useCallback(async (params: T) => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        if (!transaction.current) {
            transaction.current = client.transaction()
        }

        if (promise.current) {
            promise.current = null
        }

        const timeoutCallback = callback.current(transaction.current, params)

        promise.current = new Promise<void>((resolve) => {
            timeout.current = setTimeout(async () => {
                try {
                    await transaction.current?.commit()
                    resolve()
                    timeoutCallback?.()
                    transaction.current = null
                    timeout.current = null
                } catch (err) {}
            }, ms)
        })

        if (promise.current) {
            return await promise.current
        }
    }, [])

    return debounce
}

export default useDebounceFunc
