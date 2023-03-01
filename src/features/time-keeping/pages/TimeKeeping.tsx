import { Suspense, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingText from '~/components/Loading/LoadingText'
import { useLoading } from '~/context'

const TimeKeeping = () => {
    const { setConfigLoading } = useLoading()
    useEffect(() => {
        setConfigLoading(true)
        const timeout = setTimeout(() => {
            setConfigLoading(false)
        }, 1500)

        return () => timeout && clearTimeout(timeout)
    }, [])
    return (
        <Suspense fallback={<LoadingText />}>
            <Outlet />
        </Suspense>
    )
}

export default TimeKeeping
