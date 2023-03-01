import { get, head } from 'lodash'
import moment from 'moment'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
    DataCategory,
    IDetailSpendingForm,
    ISpendingData,
    TransactionDetailFormData,
    TransactionDetailQueryData,
} from '~/@types/spending'
import LoadingText from '~/components/Loading/LoadingText'
import { KIND_SPENDING } from '~/constant/spending'
import { useCache, useLoading } from '~/context'
import { useDocument, useServiceQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { TransactionDetailForm } from '../components'
import useTransactionDetail from '../hook/useTransactionDetail'

const TransactionDetail = () => {
    const navigate = useNavigate()
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
    const document = useDocument()
    const [
        [{ methodSpending, transaction }, kindSpending, deleteCacheData, reloadData],
        [{ categorySpending }, deleteCacheDataCategory, reloadDataCategory],
    ] = useTransactionDetail()

    const handleAddMoreCategorySpending = async (name: string) => {
        const categoryDocument = document.createCategory(name, kindSpending?._id as string)
        try {
            const { _id, name } = await document.create(categoryDocument)
            const res = deleteCacheDataCategory('categorySpending')
            console.log(res)
            reloadData()
            return { _id, name }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddMoreMethodSpending = async (name: string) => {
        const methodDocument = document.createMethod(name)
        try {
            const { _id, name } = await document.create(methodDocument)
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

            let imageId = undefined
            if (image) {
                if (!get(image, 'asset._ref')) {
                    const fileImage = await client.assets.upload('image', image as File)
                    imageId = fileImage._id
                }
            } else {
                imageId = null
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
                ...(imageId && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } }),
                ...(imageId === null && { image: null }),
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

    if (transaction.loading) return <LoadingText />

    return <TransactionDetailForm data={data} />
}

export default TransactionDetail
