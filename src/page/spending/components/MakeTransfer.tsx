import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IMethodSpending } from '~/@types/spending'
import { AutoComplete, Button, Input, TextArea } from '~/components'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import { client } from '~/sanityConfig'
import { F_GET_METHOD_SPENDING, GET_METHOD_SPENDING, GET_RECENT_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'

interface IMakeTransferForm {
    amount: number | undefined
    methodSpendingFrom: IMethodSpending | null
    methodSpendingTo: IMethodSpending | null
    description: string
}

interface Data {
    methodSpending: IMethodSpending[]
}

const MakeTransfer = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { fetchApi, deleteCache } = useCache()
    const { loading, setLoading } = useLoading()
    const { getKindSpendingId, kindSpending } = useConfig()
    const [data, setData] = useState<Data>({
        methodSpending: [],
    })

    const { control, handleSubmit } = useForm<IMakeTransferForm>({
        defaultValues: {
            amount: undefined,
            methodSpendingFrom: null,
            methodSpendingTo: null,
            description: '',
        },
    })

    const getData = useCallback(async () => {
        try {
            const params = {
                userId: userProfile?._id,
            }
            const res = await fetchApi<Data>(
                {
                    methodSpending: GET_METHOD_SPENDING,
                },
                params
            )

            setData(res)
        } catch (error) {
            console.log(error)
        } finally {
        }
    }, [])

    useEffect(() => {
        getData()
    }, [])

    const onsubmit: SubmitHandler<IMakeTransferForm> = async (data) => {
        setLoading(true)
        let { amount, methodSpendingFrom, methodSpendingTo, description } = data
        amount = Number(amount)
        // add to database
        const document1 = {
            _type: 'spending',
            amount,
            description: `Đến ${methodSpendingTo?.name}\n${description}`,
            date: moment().format(),
            kindSpending: {
                _type: 'reference',
                _ref: getKindSpendingId('TRANSFER_FROM'),
            },
            methodSpending: {
                _type: 'reference',
                _ref: methodSpendingFrom?._id,
            },
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        const document2 = {
            _type: 'spending',
            amount,
            description: `Từ ${methodSpendingFrom?.name}\n${description}`,
            date: moment().format(),
            kindSpending: {
                _type: 'reference',
                _ref: getKindSpendingId('TRANSFER_TO'),
            },
            methodSpending: {
                _type: 'reference',
                _ref: methodSpendingTo?._id,
            },
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            await client.transaction().create(document1).create(document2).commit()
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
                {
                    method: F_GET_METHOD_SPENDING(kindSpending),
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
                                    required: 'Yêu cầu nhập số tiền!',
                                    min: {
                                        value: 0,
                                        message: 'Số tiền phải lớn hơn 0!',
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Input type='number' label='Số tiền' error={error} {...field} />
                                )}
                            />
                            <Controller
                                name='methodSpendingFrom'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu chọn phương thức thanh toán!',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <AutoComplete
                                        data={data?.methodSpending}
                                        label='Từ phương thức thanh toán'
                                        error={error}
                                        addMore={handleAddMoreMethodSpending}
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='methodSpendingTo'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu chọn phương thức thanh toán!',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <AutoComplete
                                        data={data?.methodSpending}
                                        label='Đến phương thức thanh toán'
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
                    <Button color='blue' type='submit' disabled={loading}>
                        Chuyển khoản
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

export default SlideOverHOC(MakeTransfer)
