import { Suspense, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
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
        <Suspense fallback={<div className='text-gray-900 dark:text-white'>Loading...</div>}>
            <Outlet />
        </Suspense>
    )
}

export default TimeKeeping
