import { useCallback, useEffect, useRef } from 'react'

export type DFCbResult = {
    commit: () => Promise<any>
    resolved?: () => void
    error?: (err: any) => void
}

const useDF = <T extends { [x: string]: any }>(cb: (params: T) => DFCbResult, ms: number = 1000) => {
    const timeout = useRef<NodeJS.Timeout | null>(null)
    const callback = useRef(cb)

    useEffect(() => {
        callback.current = cb
    }, [cb])

    const debounce = useCallback((params: T) => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        const { commit, resolved, error } = callback.current(params)

        timeout.current = setTimeout(async () => {
            try {
                await commit()
                resolved?.()
                timeout.current = null
            } catch (err: any) {
                error?.(err)
            }
        }, ms)
    }, [])

    return debounce
}

export default useDF
