import { useEffect, useReducer } from 'react'

const useMounted = () => {
    const [mounted, mount] = useReducer(() => true, false)

    useEffect(mount, [mount])

    return mounted
}

export default useMounted
