import { head } from 'lodash'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IKindSpending } from '~/@types/context'
import { Data } from '~/@types/hook'
import { DataCategory, TransactionDetailQueryData } from '~/@types/spending'
import { TAGS } from '~/constant'
import { useLoading } from '~/context'
import { useQuery } from '~/hook'
import { GET_TRANSACTION_DETAIL } from '~/schema/query/loan'
import { GET_CATEGORY_SPENDING, GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'

type UseTransactionDetail = [
    [
        Data<TransactionDetailQueryData>,
        IKindSpending | undefined,
        (...keys: (keyof TransactionDetailQueryData)[]) => string | null,
        () => void
    ],
    [Data<DataCategory>, (...keys: 'categorySpending'[]) => string | null, (...keys: 'categorySpending'[]) => void]
]

const useTransactionDetail = (): UseTransactionDetail => {
    const { id } = useParams()
    const { userProfile } = useProfile()
    const navigate = useNavigate()
    const { setSubmitLoading } = useLoading()
    const [data, fetchData, deleteCacheData, reloadData] = useQuery<TransactionDetailQueryData>(
        {
            transaction: GET_TRANSACTION_DETAIL,
            methodSpending: GET_METHOD_SPENDING,
        },
        {
            userId: userProfile?._id as string,
            id: id as string,
        },
        {
            methodSpending: TAGS.ENUM,
            transaction: TAGS.SHORT,
        }
    )

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [])

    const kindSpending = useMemo(() => {
        try {
            return data.transaction.data?.[0].kindSpending
        } catch (error) {
            console.log(error)
            navigate('/')
        }
    }, [data.transaction.data])

    const [dataCategory, fetchDataCategory, deleteCacheDataCategory, reloadDataCategory] = useQuery<DataCategory>(
        { categorySpending: GET_CATEGORY_SPENDING },
        {
            userId: userProfile?._id as string,
            kindSpending: kindSpending?._id as string,
        },
        { categorySpending: TAGS.ENUM }
    )

    useEffect(() => {
        if (kindSpending?._id && head(data.transaction.data)?.categorySpending) {
            fetchDataCategory()
        }
    }, [kindSpending, data.transaction.data])

    return [
        [data, kindSpending, deleteCacheData, reloadData],
        [dataCategory, deleteCacheDataCategory, reloadDataCategory],
    ]
}

export default useTransactionDetail
