import { head, isEmpty } from 'lodash'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { lazily } from 'react-lazily'
import { useNavigate, useParams } from 'react-router-dom'
import { IMethodSpending, ISpendingData } from '~/@types/spending'
import { KIND_SPENDING } from '~/constant/spending'
import { useCache, useLoading } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_TRANSACTION_DETAIL } from '~/schema/query/loan'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { PaidForm, TransactionDetailFormData } from '../components'

const { TransactionDetailForm } = lazily(() => import('../components'))

export interface Data {
    transaction: ISpendingData[]
    methodSpending: IMethodSpending[]
}

const TransactionDetail = () => {
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { setSubmitLoading } = useLoading()
    const { id } = useParams()
    const {
        METHOD_SPENDING_DESC_SURPLUS,
        METHOD_SPENDING,
        RECENT_SPENDING,
        ALL_RECENT_SPENDING,
        STATISTIC_SPENDING,
        GET_RECENT_LOAN,
        GET_PAY_DUE_LOAN,
        GET_STATISTIC_LOAN,
    } = useServiceQuery()
    const { deleteCache } = useCache()

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

    const trans = head(transaction.data)

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [])

    const onsubmit: SubmitHandler<PaidForm> = async (value) => {
        if (id) {
            try {
                setSubmitLoading(true)
                const { paid, methodSpending, amount } = value
                const condition = [KIND_SPENDING.GET_LOAN].includes(trans?.kindSpending.key as KIND_SPENDING) ? 1 : -1

                const __ = client.transaction()
                const update = client.patch(id).set({
                    paid,
                    realPaid: amount,
                    methodSpending: {
                        _type: 'reference',
                        _ref: methodSpending?._id as string,
                    },
                })

                __.patch(update)

                const updateMethod = client
                    .patch(methodSpending?._id as string)
                    .setIfMissing({ surplus: 0, countUsed: 0 })
                    .inc({ countUsed: 1 })
                    .dec({ surplus: condition * amount })

                __.patch(updateMethod)

                const updateUserLoan = client
                    .patch(trans?.userLoan?._id as string)
                    .setIfMissing({ countUsed: 0, surplus: 0 })
                    .dec({ surplus: trans ? condition * amount : 0 })

                __.patch(updateUserLoan)
                await __.commit()

                let res = deleteCacheData('transaction', 'methodSpending')
                console.log(res)

                res = deleteCache([
                    METHOD_SPENDING_DESC_SURPLUS,
                    METHOD_SPENDING,
                    RECENT_SPENDING,
                    ALL_RECENT_SPENDING,
                    STATISTIC_SPENDING,
                    GET_RECENT_LOAN,
                    GET_PAY_DUE_LOAN,
                    GET_STATISTIC_LOAN,
                ])
                console.log(res)
                reloadData()
            } catch (e) {
                console.log(e)
            } finally {
                setSubmitLoading(false)
                // navigate(-1)
            }
        }
    }

    const handleReloadData = async (keys: keyof Data) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    const handleDeleteTransaction = async () => {
        try {
            setSubmitLoading(true)
            const condition = [KIND_SPENDING.GET_LOAN].includes(trans?.kindSpending.key as KIND_SPENDING) ? 1 : -1
            const __ = client.transaction()

            if (trans) {
                // refund surplus, countUsed for method deleted
                if (trans.methodSpending) {
                    const patchMethod = client
                        .patch(trans.methodSpending._id)
                        .setIfMissing({ surplus: 0, countUsed: 0 })
                        .dec({
                            surplus: (trans.amount as number) * condition,
                            countUsed: 1,
                        })
                    __.patch(patchMethod)
                }

                // refund surplus, countUsed for userLoan
                if (trans.userLoan) {
                    const patchuserLoan = client
                        .patch(trans.userLoan._id)
                        .setIfMissing({ surplus: 0, countUsed: 0 })
                        .dec({
                            surplus: (trans.amount as number) * condition,
                            countUsed: 1,
                        })
                    __.patch(patchuserLoan)
                }
            }

            // delete transaction
            __.delete(id as string)

            // commit
            await __.commit()

            const caches = deleteCache([
                METHOD_SPENDING_DESC_SURPLUS,
                METHOD_SPENDING,
                RECENT_SPENDING,
                ALL_RECENT_SPENDING,
                STATISTIC_SPENDING,
                GET_RECENT_LOAN,
                GET_PAY_DUE_LOAN,
                GET_STATISTIC_LOAN,
            ])
            console.log(caches)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
            navigate(-1)
        }
    }

    const data: TransactionDetailFormData = {
        onsubmit,
        handleReloadData,
        handleDeleteTransaction,
        methodSpending,
        transaction: trans as ISpendingData,
    }

    if (transaction.loading) return null

    if (isEmpty(transaction.data)) return <div>Empty Data!</div>

    return <TransactionDetailForm data={data} />
}

export default TransactionDetail
