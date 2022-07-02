import { useEffect, useRef, useState } from 'react'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    useEventListener('resize', () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    })

    return windowSize
}

export default useWindowSize

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
