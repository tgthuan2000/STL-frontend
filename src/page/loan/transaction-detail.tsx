import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ILoanData } from '~/@types/loan'
import { IMethodSpending } from '~/@types/spending'
import { useLoading } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import { GET_TRANSACTION_DETAIL } from '~/schema/query/loan'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { TransactionDetailForm, TransactionDetailFormData } from './components'

export interface Data {
    transaction: ILoanData[]
    methodSpending: IMethodSpending[]
}

const TransactionDetail = () => {
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { setSubmitLoading } = useLoading()
    const { id } = useParams()
    const { METHOD_SPENDING_DESC_SURPLUS, METHOD_SPENDING, RECENT_SPENDING, ALL_RECENT_SPENDING, STATISTIC_SPENDING } =
        useServiceQuery()

    const [{ transaction, methodSpending }, fetchData, deleteCacheData, reloadData] = useQuery<Data>(
        {
            transaction: GET_TRANSACTION_DETAIL,
            methodSpending: GET_METHOD_SPENDING,
        },
        {
            userId: userProfile?._id as string,
            id: id as string,
        }
    )
    const kindLoan = useMemo(() => transaction.data?.[0].kindLoan, [transaction.data])

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [])

    const onsubmit = () => {}

    const handleReloadData = async (keys: keyof Data) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    const handleDeleteTransaction = () => {}
    const handlePaidTransaction = () => {}

    const data: TransactionDetailFormData = {
        title: kindLoan?.name as string,
        onsubmit,
        handleReloadData,
        handleDeleteTransaction,
        handlePaidTransaction,
        methodSpending,
        transaction: transaction.data?.[0] as ILoanData,
    }

    if (transaction.loading) return null

    return <TransactionDetailForm data={data} />
}

export default TransactionDetail
