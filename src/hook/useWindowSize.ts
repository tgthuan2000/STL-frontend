import { useCallback, useState } from 'react'
import useEventListener from './useEventListener'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    const handler = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }, [])

    useEventListener('resize', handler)

    return windowSize
}

export default useWindowSize
