import { head, isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IMakeGetLoanForm, TransactionEditFormData, TransactionEditQueryData } from '~/@types/loan'
import { ISpendingData } from '~/@types/spending'
import LoadingText from '~/components/Loading/LoadingText'
import { TAGS } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { useCache, useLoading } from '~/context'
import { useDocument, useQuery, useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_TRANSACTION_DETAIL, GET_USER_LOAN } from '~/schema/query/loan'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'
import TransactionEditForm from '../components/TransactionEditForm'

const TransactionEdit = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { userProfile } = useProfile()
    const { setSubmitLoading } = useLoading()
    const { id } = useParams()
    const {
        METHOD_SPENDING_DESC_SURPLUS,
        METHOD_SPENDING,
        RECENT_SPENDING,
        RECENT_LOAN_PAGINATE,
        STATISTIC_SPENDING,
        RECENT_LOAN_FILTER_DATE_RANGE_PAGINATE,
        GET_RECENT_LOAN,
        GET_PAY_DUE_LOAN,
        GET_STATISTIC_LOAN,
    } = useServiceQuery()
    const { deleteCache } = useCache()
    const document = useDocument()

    const [{ transaction, methodSpending, userLoan }, fetchData, deleteCacheData, reloadData] =
        useQuery<TransactionEditQueryData>(
            {
                transaction: GET_TRANSACTION_DETAIL,
                methodSpending: GET_METHOD_SPENDING,
                userLoan: GET_USER_LOAN,
            },
            {
                userId: userProfile?._id as string,
                id: id as string,
            },
            {
                methodSpending: TAGS.ENUM,
                transaction: TAGS.SHORT,
                userLoan: TAGS.ENUM,
            }
        )

    const trans = head(transaction.data)

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [])

    const onsubmit: SubmitHandler<IMakeGetLoanForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodReference, description, estimatePaidDate, userLoan } = data
        amount = Number(amount)
        description = description.trim()

        try {
            const __ = client.transaction()

            const documentSpending = {
                amount,
                description: `${methodReference ? 'Cộng gốc' : 'Tạm vay'}${description ? `\n${description}` : ''}`,
                estimatePaidDate: estimatePaidDate ? moment(estimatePaidDate).format() : undefined,
                ...(methodReference
                    ? {
                          surplus: methodReference.surplus,
                          methodReference: { _type: 'reference', _ref: methodReference._id },
                      }
                    : { surplus: 0, methodReference: null }),
                ...(trans?.userLoan?._id !== userLoan?._id && {
                    userLoan: { _type: 'reference', _ref: userLoan?._id },
                }),
            }

            const patch = client.patch(id as string).set(documentSpending)
            __.patch(patch)

            if (userLoan && trans?.userLoan && userLoan._id !== trans.userLoan._id) {
                // OLD userLoan
                const patchOld = client
                    .patch(trans?.userLoan._id as string)
                    .setIfMissing({ surplus: 0, countUsed: 0 })
                    .dec({ surplus: amount, countUsed: 1 })

                // NEW categorySpending
                const patchNew = client
                    .patch(userLoan._id as string)
                    .setIfMissing({ surplus: 0, countUsed: 0 })
                    .inc({ surplus: amount, countUsed: 1 })

                __.patch(patchOld).patch(patchNew)
            }

            if (trans?.methodReference?._id !== methodReference?._id) {
                if (methodReference) {
                    // NEW methodReference
                    const patchNew = client
                        .patch(methodReference?._id as string)
                        .setIfMissing({ countUsed: 0, surplus: 0 })
                        .inc({ countUsed: 1, surplus: amount })
                    __.patch(patchNew)
                }
                if (trans?.methodReference) {
                    // OLD methodReference
                    const patchOld = client
                        .patch(trans?.methodReference?._id as string)
                        .setIfMissing({ countUsed: 0, surplus: 0 })
                        .dec({ countUsed: 1, surplus: amount })
                    __.patch(patchOld)
                }
            }
            await __.commit()

            let res
            setTimeout(() => {
                const resetStore: (keyof TransactionEditQueryData)[] = ['transaction']
                if (trans?.methodReference?._id !== methodReference?._id) {
                    resetStore.push('methodSpending')
                }
                if (trans?.userLoan?._id !== userLoan?._id) {
                    resetStore.push('userLoan')
                }
                res = deleteCacheData(...resetStore)
                console.log(res)

                reloadData()
            }, 0)

            toast.success<string>(t(LANGUAGE.NOTIFY_UPDATE_SUCCESS))
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleReloadData = async (keys: keyof TransactionEditQueryData) => {
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
                if (trans.methodReference) {
                    const patchMethod = client
                        .patch(trans.methodReference._id)
                        .setIfMissing({ surplus: 0, countUsed: 0 })
                        .dec({
                            surplus: (trans.amount as number) * condition,
                            countUsed: 1,
                        })
                    __.patch(patchMethod)
                }

                // refund surplus, countUsed for userLoan
                if (trans.userLoan) {
                    const patchUserLoan = client
                        .patch(trans.userLoan._id)
                        .setIfMissing({ surplus: 0, countUsed: 0 })
                        .dec({
                            surplus: (trans.amount as number) * condition,
                            countUsed: 1,
                        })
                    __.patch(patchUserLoan)
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
                RECENT_LOAN_PAGINATE,
                RECENT_LOAN_FILTER_DATE_RANGE_PAGINATE,
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

    const handleAddMoreMethodSpending = async (name: string) => {
        const methodDoc = document.createMethod(name)
        try {
            const { _id, name } = await document.create(methodDoc)
            const res = deleteCacheData('methodSpending')
            console.log(res)
            reloadData()
            return { _id, name }
        } catch (error) {
            console.log(error)
        }
    }

    const data: TransactionEditFormData = {
        onsubmit,
        handleReloadData,
        handleDeleteTransaction,
        handleAddMoreMethodSpending,
        methodSpending,
        userLoan,
        transaction: trans as ISpendingData,
    }

    if (transaction.loading || methodSpending.loading || userLoan.loading) return <LoadingText />

    if (isEmpty(transaction.data))
        return <div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.EMPTY_DATA)}</div>

    if (trans?.paid) return <div>{t(LANGUAGE.ALREADY_PAID)}</div>

    return <TransactionEditForm data={data} />
}

export default TransactionEdit
