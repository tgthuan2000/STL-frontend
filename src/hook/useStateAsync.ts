import React, { useEffect, useState } from 'react'

const useStateAsync = <T>(
    data: Promise<T>,
    initialValue: T
): [state: T, setState: React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(initialValue)

    useEffect(() => {
        ;(async () => {
            const _ = await data
            setState(_)
        })()
    }, [])

    return [state, setState]
}

export default useStateAsync
