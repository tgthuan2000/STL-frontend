import { useRef, useEffect } from 'react'

const useScrollIntoView = <T extends HTMLDivElement>() => {
    const ref = useRef<T>(null)
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [])
    return ref
}

export default useScrollIntoView
