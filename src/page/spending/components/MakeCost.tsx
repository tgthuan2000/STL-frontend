import _ from 'lodash'
import moment from 'moment'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ICategorySpending, IMethodSpending } from '~/@types/spending'
import { AutoComplete, Button, Input, TextArea } from '~/components'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery } from '~/hook'
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
    const { deleteCache } = useCache()
    const { loading, setSubmitLoading } = useLoading()
    const { getKindSpendingId, kindSpending } = useConfig()

    const kindSpendingId = useMemo(() => {
        return getKindSpendingId('COST')
    }, [getKindSpendingId])

    const [{ categorySpending, methodSpending }, fetchData, deleteCacheData, reloadData] = useQuery<Data>(
        {
            methodSpending: GET_METHOD_SPENDING,
            categorySpending: GET_CATEGORY_SPENDING,
        },
        {
            userId: userProfile?._id as string,
            kindSpending: kindSpendingId as string,
        }
    )

    useEffect(() => {
        if (!_.isUndefined(kindSpendingId)) {
            fetchData()
        }
    }, [kindSpendingId])

    const { control, handleSubmit, reset, watch } = useForm<IAddCostForm>({
        defaultValues: {
            amount: undefined,
            categorySpending: null,
            methodSpending: null,
            description: '',
        },
    })
    console.log(watch())
    const onsubmit: SubmitHandler<IAddCostForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodSpending, categorySpending, description } = data
        // transfer amount to number
        amount = Number(amount)
        description = description.trim()

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
            const res = deleteCache([
                {
                    method: F_GET_METHOD_SPENDING(kindSpending),
                    params: { userId: userProfile?._id },
                },
                {
                    recent: GET_RECENT_SPENDING,
                    params: { userId: userProfile?._id, from: 0, to: 5 },
                },
            ])
            console.log(res)
            reset(
                {
                    amount: 0,
                    categorySpending,
                    methodSpending,
                },
                {
                    keepDefaultValues: true,
                }
            )
            alert('Tạo chi phí thành công!')
            // setIsOpen(false)
            // navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleAddMoreCategorySpending = async (name: string) => {
        const document = {
            _type: 'categorySpending',
            name,
            kindSpending: {
                _type: 'reference',
                _ref: kindSpendingId,
            },
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            const { _id, name } = await client.create(document)
            const res = deleteCacheData('categorySpending')
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
                                        data={categorySpending.data}
                                        label='Thể loại'
                                        error={error}
                                        loading={categorySpending.loading}
                                        addMore={handleAddMoreCategorySpending}
                                        onReload={
                                            _.isEmpty(categorySpending.data)
                                                ? undefined
                                                : () => handleReloadData('categorySpending')
                                        }
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
                                        data={methodSpending.data}
                                        label='Phương thức thanh toán'
                                        error={error}
                                        loading={methodSpending.loading}
                                        addMore={handleAddMoreMethodSpending}
                                        onReload={
                                            _.isEmpty(methodSpending.data)
                                                ? undefined
                                                : () => handleReloadData('methodSpending')
                                        }
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
                    <Button color='radicalRed' type='submit' disabled={loading.submit}>
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
