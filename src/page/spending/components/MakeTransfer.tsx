import moment from 'moment'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IMethodSpending } from '~/@types/spending'
import { AutoComplete, Button, Input, TextArea } from '~/components'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import { client } from '~/sanityConfig'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
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
    const { setIsRefetch, fetchApi } = useCache()
    const { loading, setLoading } = useLoading()
    const { getKindSpendingId } = useConfig()
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

    useEffect(() => {
        const getData = async () => {
            try {
                const query = `
                    {
                        "methodSpending": ${GET_METHOD_SPENDING}
                    }
                `

                const params = {
                    userId: userProfile?._id,
                }
                const res = await fetchApi<Data>(query, params)

                setData({
                    methodSpending: res.methodSpending,
                })
            } catch (error) {
                console.log(error)
            } finally {
            }
        }
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
            description: `Từ ${methodSpendingTo?.name}: ${description}`,
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
            description: `Đến ${methodSpendingFrom?.name}: ${description}`,
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
            setIsRefetch(true)
            setIsOpen(false)
            navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
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
