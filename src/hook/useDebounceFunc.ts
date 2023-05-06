import { Transaction } from '@sanity/client'
import { useCallback, useEffect, useRef } from 'react'
import { client } from '~/sanityConfig'

const useDebounceFunc = <T extends { [x: string]: any }>(
    cb: (trans: Transaction, params: T) => (() => void) | void,
    ms: number = 1000
) => {
    const transaction = useRef<Transaction | null>(null)
    const timeout = useRef<NodeJS.Timeout | null>(null)
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

        const timeoutCallback = callback.current(transaction.current, params)

        return new Promise<void>((resolve) => {
            resolves.current.push(resolve)
            timeout.current = setTimeout(async () => {
                try {
                    await transaction.current?.commit()
                    timeoutCallback?.()
                    resolves.current.forEach((resolve) => resolve())
                    resolves.current = []
                    transaction.current = null
                    timeout.current = null
                } catch (err) {}
            }, ms)
        })
    }, [])

    return debounce
}

export default useDebounceFunc
