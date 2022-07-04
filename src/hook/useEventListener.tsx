import { useEffect, useRef } from 'react'

const useEventListener = (eventName: string, handler: (event: Event) => void, element: Window | Document = window) => {
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
