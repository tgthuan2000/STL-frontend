import { get, head } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import {
    DataCategory,
    IDetailSpendingForm,
    ISpendingData,
    TransactionDetailFormData,
    TransactionDetailQueryData,
} from '~/@types/spending'
import { TAGS } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { useCache, useLoading } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_CATEGORY_SPENDING, GET_METHOD_SPENDING, GET_TRANSACTION_DETAIL } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { TransactionDetailForm } from '../components'

const TransactionDetail = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { setSubmitLoading } = useLoading()
    const { id } = useParams()
    const { deleteCache } = useCache()
    const {
        METHOD_SPENDING_DESC_SURPLUS,
        METHOD_SPENDING,
        RECENT_SPENDING,
        RECENT_SPENDING_PAGINATE,
        RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE,
        STATISTIC_SPENDING,
    } = useServiceQuery()

    const [{ transaction, methodSpending }, fetchData, deleteCacheData, reloadData] =
        useQuery<TransactionDetailQueryData>(
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

    const kindSpending = useMemo(() => {
        try {
            return transaction.data?.[0].kindSpending
        } catch (error) {
            console.log(error)
            navigate('/')
        }
    }, [transaction.data])

    const [{ categorySpending }, fetchDataCategory, deleteCacheDataCategory, reloadDataCategory] =
        useQuery<DataCategory>(
            { categorySpending: GET_CATEGORY_SPENDING },
            {
                userId: userProfile?._id as string,
                kindSpending: kindSpending?._id as string,
            },
            { categorySpending: TAGS.ENUM }
        )

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [])

    useEffect(() => {
        if (kindSpending?._id && head(transaction.data)?.categorySpending) {
            fetchDataCategory()
        }
    }, [kindSpending, transaction.data])

    const handleAddMoreCategorySpending = async (name: string) => {
        const document = {
            _type: 'categorySpending',
            name,
            kindSpending: {
                _type: 'reference',
                _ref: kindSpending?._id,
            },
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            const { _id, name } = await client.create(document)
            const res = deleteCacheDataCategory('categorySpending')
            console.log(res)
            reloadData()
            return { _id, name }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddMoreMethodSpending = async (name: string) => {
        const document = {
            _type: 'methodSpending',
            name,
            surplus: 0,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            const { _id, name } = await client.create(document)
            const res = deleteCacheData('methodSpending')
            console.log(res)
            reloadData()
            return { _id, name }
        } catch (error) {
            console.log(error)
        }
    }

    const handleReloadData = async (keys: keyof TransactionDetailQueryData) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    const handleReloadDataCategory = async (keys: keyof DataCategory) => {
        const res = deleteCacheDataCategory(keys)
        console.log(res)
        reloadDataCategory()
    }

    const onsubmit: SubmitHandler<IDetailSpendingForm> = async (data) => {
        let { amount, description, categorySpending, methodSpending, date, surplus, image } = data
        description = description.trim()
        amount = Number(amount)
        try {
            setSubmitLoading(true)
            const condition = [KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO].includes(
                head(transaction.data)?.kindSpending.key as KIND_SPENDING
            )
                ? 1
                : -1
            const _transaction = head(transaction.data)

            const __ = client.transaction()

            if (_transaction) {
                // refund if change category spending
                if (
                    _transaction.categorySpending &&
                    categorySpending &&
                    _transaction.categorySpending._id !== categorySpending._id
                ) {
                    // OLD categorySpending
                    const patchOld = client
                        .patch(_transaction.categorySpending._id as string)
                        .setIfMissing({ countUsed: 0 })
                        .dec({
                            countUsed: 1,
                        })
                    // NEW categorySpending
                    const patchNew = client
                        .patch(categorySpending._id as string)
                        .setIfMissing({ countUsed: 0 })
                        .inc({ countUsed: 1 })

                    __.patch(patchOld).patch(patchNew)
                }

                // refund if change method spending
                if (methodSpending._id === _transaction.methodSpending._id) {
                    if (amount !== (_transaction.amount as number)) {
                        const patch = client
                            .patch(methodSpending._id)
                            .setIfMissing({ surplus: 0 })
                            .inc({
                                surplus: (amount - (_transaction?.amount as number)) * condition,
                            })
                        __.patch(patch)
                    }
                } else {
                    // Change method spending -> refund surplus for old method
                    // OLD method
                    const patchOld = client
                        .patch(_transaction.methodSpending._id as string)
                        .setIfMissing({ surplus: 0, countUsed: 0 })
                        .dec({
                            surplus: (_transaction.amount as number) * condition,
                            countUsed: 1,
                        })
                    // NEW method
                    const patchNew = client
                        .patch(methodSpending._id as string)
                        .setIfMissing({ surplus: 0, countUsed: 0 })
                        .inc({
                            surplus: amount * condition,
                            countUsed: 1,
                        })

                    __.patch(patchOld).patch(patchNew)
                }
            }

            let imageId = null
            if (image && !get(image, '_id')) {
                const fileImage = await client.assets.upload('image', image as File)
                imageId = fileImage._id
            }

            const document = {
                amount,
                date: moment(date).format(),
                description,
                surplus,
                categorySpending: {
                    _type: 'reference',
                    _ref: categorySpending?._id as string,
                },
                methodSpending: {
                    _type: 'reference',
                    _ref: methodSpending._id,
                },
                ...(imageId && { _type: 'image', asset: { _type: 'reference', _ref: imageId } }),
            }

            const patch = client.patch(id as string).set(document)
            __.patch(patch)

            await __.commit()

            const res = deleteCacheData('transaction')
            console.log(res + ' transaction')

            const caches = deleteCache([
                METHOD_SPENDING_DESC_SURPLUS,
                METHOD_SPENDING,
                RECENT_SPENDING,
                RECENT_SPENDING_PAGINATE,
                RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE,
                STATISTIC_SPENDING,
            ])
            console.log(caches)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)

            // navigate('/spending', {
            //     replace: true,
            // })
            navigate(-1)
        }
    }

    const handleDeleteTransaction = async () => {
        try {
            setSubmitLoading(true)
            const condition = [KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO].includes(
                head(transaction.data)?.kindSpending.key as KIND_SPENDING
            )
                ? 1
                : -1
            const _transaction = head(transaction.data)
            const __ = client.transaction()

            if (_transaction) {
                // refund countUsed for category deleted
                if (_transaction.categorySpending) {
                    const patchCategory = client
                        .patch(_transaction.categorySpending._id)
                        .setIfMissing({ countUsed: 0 })
                        .dec({
                            countUsed: 1,
                        })
                    __.patch(patchCategory)
                }

                // refund surplus, countUsed for method deleted
                if (_transaction.methodSpending) {
                    const patchMethod = client
                        .patch(_transaction.methodSpending._id)
                        .setIfMissing({ surplus: 0, countUsed: 0 })
                        .dec({
                            surplus: (_transaction.amount as number) * condition,
                            countUsed: 1,
                        })
                    __.patch(patchMethod)
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
                RECENT_SPENDING_PAGINATE,
                RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE,
                STATISTIC_SPENDING,
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
        handleReloadDataCategory,
        handleAddMoreCategorySpending,
        handleAddMoreMethodSpending,
        handleDeleteTransaction,
        categorySpending,
        methodSpending,
        transaction: transaction.data?.[0] as ISpendingData,
    }

    if (transaction.loading) return <div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.LOADING)}</div>

    return <TransactionDetailForm data={data} />
}

export default TransactionDetail
