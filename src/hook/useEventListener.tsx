import { useEffect, useRef } from 'react'

const useEventListener = (
    eventName: string,
    handler: (event: Event) => void,
    element: typeof window | typeof document = window
) => {
    const handlerRef = useRef(handler)

    useEffect(() => {
        handlerRef.current = handler
    }, [handler])

    useEffect(() => {
        const handler = (e: Event) => handlerRef.current(e)
        element.addEventListener(eventName, handler)

        return () => {
            element.removeEventListener(eventName, handler)
        }
    }, [eventName, handler])
}

export default useEventListener
