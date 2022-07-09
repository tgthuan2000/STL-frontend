import _ from 'lodash'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ICategorySpending, IMethodSpending } from '~/@types/spending'
import { AutoComplete, Button, Input, TextArea } from '~/components'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import { client } from '~/sanityConfig'
import {
    F_GET_METHOD_SPENDING,
    GET_CATEGORY_SPENDING,
    GET_METHOD_SPENDING,
    GET_RECENT_SPENDING,
} from '~/schema/query/spending'
import useAuth from '~/store/auth'

interface IAddCostForm {
    amount: number | undefined
    categorySpending: ICategorySpending | null
    methodSpending: IMethodSpending | null
    description: string
}
interface Data {
    methodSpending: IMethodSpending[]
    categorySpending: ICategorySpending[]
}

const MakeCost = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { fetchApi, deleteCache } = useCache()
    const { loading, setLoading } = useLoading()
    const { getKindSpendingId, kindSpending } = useConfig()

    const kindSpendingId = useMemo(() => {
        return getKindSpendingId('COST')
    }, [getKindSpendingId])

    const [data, setData] = useState<Data>({
        methodSpending: [],
        categorySpending: [],
    })
    const { control, handleSubmit } = useForm<IAddCostForm>({
        defaultValues: {
            amount: undefined,
            categorySpending: null,
            methodSpending: null,
            description: '',
        },
    })

    const getData = useCallback(async () => {
        try {
            if (_.isUndefined(kindSpendingId)) return

            const params = {
                userId: userProfile?._id,
                kindSpending: kindSpendingId,
            }
            const res = await fetchApi<Data>(
                {
                    methodSpending: GET_METHOD_SPENDING,
                    categorySpending: GET_CATEGORY_SPENDING,
                },
                params
            )

            setData(res)
        } catch (error) {
            console.log(error)
        } finally {
        }
    }, [kindSpendingId])

    useEffect(() => {
        getData()
    }, [getData])

    const onsubmit: SubmitHandler<IAddCostForm> = async (data) => {
        setLoading(true)
        let { amount, methodSpending, categorySpending, description } = data
        // transfer amount to number
        amount = Number(amount)

        // add to database
        const document = {
            _type: 'spending',
            amount,
            description,
            date: moment().format(),
            kindSpending: {
                _type: 'reference',
                _ref: kindSpendingId,
            },
            categorySpending: {
                _type: 'reference',
                _ref: categorySpending?._id,
            },
            methodSpending: {
                _type: 'reference',
                _ref: methodSpending?._id,
            },
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }
        try {
            await client.create(document)
            // navigate to dashboard
            const result = await deleteCache([
                {
                    method: F_GET_METHOD_SPENDING(kindSpending),
                    params: { userId: userProfile?._id },
                },
                {
                    recent: GET_RECENT_SPENDING,
                    params: { userId: userProfile?._id },
                },
            ])
            console.log(result)
            setIsOpen(false)
            navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddMoreMethodSpending = async (name: string) => {
        // delete spaces between and last first
        name = name.replace(/\s+/g, ' ').trim()
        // capitalize first letter
        name = name.charAt(0).toUpperCase() + name.slice(1)
        // add to database
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
            const result = await deleteCache([
                {
                    methodSpending: GET_METHOD_SPENDING,
                    params: { userId: userProfile?._id },
                },
            ])
            console.log(result)
            await getData()
            return { _id, name }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <Controller
                                name='amount'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu nhập chi phí!',
                                    min: {
                                        value: 0,
                                        message: 'Chi phí phải lớn hơn 0!',
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Input type='number' label='Chi phí' error={error} {...field} />
                                )}
                            />
                            <Controller
                                name='categorySpending'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu chọn thể loại!',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <AutoComplete
                                        data={data?.categorySpending}
                                        label='Thể loại'
                                        error={error}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='methodSpending'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu chọn phương thức thanh toán!',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <AutoComplete
                                        data={data?.methodSpending}
                                        label='Phương thức thanh toán'
                                        error={error}
                                        addMore={handleAddMoreMethodSpending}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='description'
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextArea label='Ghi chú' error={error} {...field} />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                <div className='flex sm:justify-start justify-end space-x-3'>
                    <Button color='radicalRed' type='submit' disabled={loading}>
                        Lưu
                    </Button>
                    <Button
                        color='outline'
                        type='button'
                        onClick={() => {
                            setIsOpen(false)
                            navigate(-1)
                        }}
                    >
                        Hủy bỏ
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default SlideOverHOC(MakeCost)
