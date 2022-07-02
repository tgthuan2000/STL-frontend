import { useEffect } from 'react'
import { useLoading } from '~/context'

const TimeKeeping = () => {
    const { setLoading } = useLoading()
    useEffect(() => {
        setLoading(true)
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 1500)

        return () => timeout && clearTimeout(timeout)
    }, [])
    return <div>TimeKeeping</div>
}

export default TimeKeeping
