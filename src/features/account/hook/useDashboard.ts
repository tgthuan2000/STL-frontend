import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AccountDefaultValueResult, AccountQueryData } from '~/@types/account'
import { Data } from '~/@types/hook'
import { COUNT_PAGINATE } from '~/constant'
import { useCheck } from '~/context'
import { useQuery } from '~/hook'
import { services } from '../services/account'

type UseDashboard = [
    Data<AccountQueryData>,
    (...keys: (keyof AccountQueryData)[]) => string | null,
    (...keys: (keyof AccountQueryData)[]) => void,
    {
        reload: () => void
        getMore: () => void
    }
]

const useDashboard = (): UseDashboard => {
    const [searchParams] = useSearchParams()
    const getAll = useMemo(() => services.getAll(), [])

    const defaultValues = useMemo(() => services.getDefaultValue({ getAll, searchParams }), [])
    const [{ query, params, tags }, setQuery] = useState<AccountDefaultValueResult>(defaultValues)

    const [data, fetchData, deleteCache, reloadData] = useQuery<AccountQueryData>(query, params, tags)

    const reload = () => {
        setQuery((prev) => ({ ...prev, params: { ...prev.params, __fromAccount: 0, __toAccount: COUNT_PAGINATE } }))
    }

    const getMore = () => {
        setQuery((prev) => ({
            ...prev,
            params: { ...prev.params, __fromAccount: length, __toAccount: length + COUNT_PAGINATE },
        }))
    }
    useCheck(reloadData)

    useEffect(() => {
        fetchData()
    }, [])

    return [data, deleteCache, reloadData, { reload, getMore }]
}

export default useDashboard
