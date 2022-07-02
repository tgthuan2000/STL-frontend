import { useEffect } from 'react'
import { useLoading } from '~/context'

const Loan = () => {
    const { setLoading } = useLoading()
    useEffect(() => {
        setLoading(true)
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 1500)

        return () => timeout && clearTimeout(timeout)
    }, [])
    return <div>Loan</div>
}

export default Loan
