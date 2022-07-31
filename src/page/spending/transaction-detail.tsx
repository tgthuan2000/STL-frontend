import _ from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ICategorySpending, IMethodSpending, SpendingData } from '~/@types/spending'
import { useCache, useLoading } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_CATEGORY_SPENDING, GET_METHOD_SPENDING, GET_TRANSACTION_DETAIL } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import TransactionDetailForm, { TransactionDetailFormData } from './components/DetailForm'

interface IDetailSpendingForm {
    amount: number
    categorySpending: ICategorySpending
    methodSpending: IMethodSpending
    date: Date
    description: string
}
export interface Data {
    transaction: SpendingData[]
    methodSpending: IMethodSpending[]
}
export interface DataCategory {
    categorySpending: ICategorySpending[]
}
const TransactionDetail = () => {
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { setSubmitLoading } = useLoading()
    const { id } = useParams()
    const { deleteCache } = useCache()
    const { METHOD_KIND_SPENDING, RECENT_SPENDING, ALL_RECENT_SPENDING, STATISTIC_SPENDING } = useServiceQuery()

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

    const kindSpending = useMemo(() => transaction.data?.[0].kindSpending, [transaction.data])

    const [{ categorySpending }, fetchDataCategory, deleteCacheDataCategory, reloadDataCategory] =
        useQuery<DataCategory>(
            {
                categorySpending: GET_CATEGORY_SPENDING,
            },
            {
                userId: userProfile?._id as string,
                kindSpending: kindSpending?._id as string,
            }
        )

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [])

    useEffect(() => {
        if (kindSpending?._id) {
            fetchDataCategory()
        }
    }, [kindSpending])

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

    const handleReloadData = async (keys: keyof Data) => {
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
        let { amount, description, categorySpending, methodSpending, date } = data
        description = description.trim()
        amount = Number(amount)
        try {
            setSubmitLoading(true)
            await client
                .patch(id as string)
                .set({
                    amount,
                    date: moment(date).format(),
                    description,
                    categorySpending: {
                        _type: 'reference',
                        _ref: categorySpending._id,
                    },
                    methodSpending: {
                        _type: 'reference',
                        _ref: methodSpending._id,
                    },
                })
                .commit()

            const res = deleteCacheData('transaction')
            console.log(res)

            const caches = deleteCache([METHOD_KIND_SPENDING, RECENT_SPENDING, ALL_RECENT_SPENDING, STATISTIC_SPENDING])
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
            await client.delete(id as string)
            const caches = deleteCache([METHOD_KIND_SPENDING, RECENT_SPENDING, ALL_RECENT_SPENDING, STATISTIC_SPENDING])
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

    const data: TransactionDetailFormData = {
        title: kindSpending?.name as string,
        onsubmit,
        handleReloadData,
        handleReloadDataCategory,
        handleAddMoreCategorySpending,
        handleAddMoreMethodSpending,
        handleDeleteTransaction,
        categorySpending,
        methodSpending,
        transaction: transaction.data?.[0] as SpendingData,
    }

    if (transaction.loading) return null

    return <TransactionDetailForm data={data} />
}

export default TransactionDetail
