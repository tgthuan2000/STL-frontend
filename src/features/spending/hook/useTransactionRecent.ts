import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Data, ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { RecentQueryData, TransactionDefaultValueResult } from '~/@types/spending'
import { COUNT_PAGINATE } from '~/constant'
import { useCheck, useConfig } from '~/context'
import { useQuery } from '~/hook'
import { useProfile } from '~/store/auth'
import { services } from '../services/transaction'

type UseTransactionRecent = [
    Data<RecentQueryData>,
    (...keys: (keyof RecentQueryData)[]) => string | null,
    (...keys: (keyof RecentQueryData)[]) => void,
    Boolean,
    {
        defaultValues: TransactionDefaultValueResult
        getAll: TransactionDefaultValueResult
        reload: () => void
        getMore: (length: number) => void
        set: Dispatch<
            SetStateAction<{
                query: QueryTypeUseQuery<RecentQueryData>
                params: ParamsTypeUseQuery
                tags: TagsTypeUseQuery<RecentQueryData>
            }>
        >
    }
]

const useTransactionRecent = (): UseTransactionRecent => {
    const { userProfile } = useProfile()
    const { getKindSpendingIds } = useConfig()
    const [searchParams] = useSearchParams()
    const getAll = useMemo(
        () =>
            services.getAll({
                userId: userProfile?._id as string,
                kindSpendingIds: getKindSpendingIds('COST', 'RECEIVE', 'TRANSFER_FROM', 'TRANSFER_TO'),
            }),
        []
    )

    const defaultValues = useMemo(() => services.getDefaultValue({ getAll, searchParams }), [])
    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<RecentQueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<RecentQueryData>
    }>(defaultValues)

    const [data, fetchData, deleteCacheData, reloadData, error] = useQuery<RecentQueryData>(query, params, tags)

    const reload = () => {
        setQuery((prev) => ({ ...prev, params: { ...prev.params, __fromRecent: 0, __toRecent: COUNT_PAGINATE } }))
    }

    const getMore = (length: number) => {
        setQuery((prev) => ({
            ...prev,
            params: { ...prev.params, __fromRecent: length, __toRecent: length + COUNT_PAGINATE },
        }))
    }
    useCheck(reloadData)

    useEffect(() => {
        fetchData()
    }, [])

    return [data, deleteCacheData, reloadData, error, { defaultValues, getAll, reload, getMore, set: setQuery }]
}

export default useTransactionRecent
