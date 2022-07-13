import { useEffect } from 'react'
import { useLoading } from '~/context'

const Loan = () => {
    const { setConfigLoading } = useLoading()
    useEffect(() => {
        setConfigLoading(true)
        const timeout = setTimeout(() => {
            setConfigLoading(false)
        }, 1500)

        return () => timeout && clearTimeout(timeout)
    }, [])
    return <div>Loan</div>
}

export default Loan
