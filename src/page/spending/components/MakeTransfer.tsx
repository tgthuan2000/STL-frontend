import _ from 'lodash'
import moment from 'moment'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IMethodSpending } from '~/@types/spending'
import { AutoComplete, Button, Input, TextArea } from '~/components'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery } from '~/hook'
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
    const { deleteCache } = useCache()
    const { loading, setSubmitLoading } = useLoading()
    const { getKindSpendingId, kindSpending } = useConfig()

    const [{ methodSpending }, fetchData, deleteCacheData, reloadData] = useQuery<Data>(
        {
            methodSpending: GET_METHOD_SPENDING,
        },
        {
            userId: userProfile?._id as string,
        }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const { control, handleSubmit, reset } = useForm<IMakeTransferForm>({
        defaultValues: {
            amount: undefined,
            methodSpendingFrom: null,
            methodSpendingTo: null,
            description: '',
        },
    })

    const onsubmit: SubmitHandler<IMakeTransferForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodSpendingFrom, methodSpendingTo, description } = data
        amount = Number(amount)
        description = description.trim()
        // add to database
        const document1 = {
            _type: 'spending',
            amount,
            description: `Đến ${methodSpendingTo?.name}${description ? `\n${description}` : ''}`,
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
            description: `Từ ${methodSpendingFrom?.name}${description ? `\n${description}` : ''}`,
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
            const result = deleteCache([
                {
                    method: F_GET_METHOD_SPENDING(kindSpending),
                    params: { userId: userProfile?._id },
                },
                {
                    recent: GET_RECENT_SPENDING,
                    params: { userId: userProfile?._id, from: 0, to: 5 },
                },
            ])
            console.log(result)
            reset({
                amount: 0,
                description: '',
            })
            alert('Transfer success!')
            // setIsOpen(false)
            // navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
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
                                        data={methodSpending.data}
                                        label='Từ phương thức thanh toán'
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
                                name='methodSpendingTo'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu chọn phương thức thanh toán!',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <AutoComplete
                                        data={methodSpending.data}
                                        label='Đến phương thức thanh toán'
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
                    <Button color='blue' type='submit' disabled={loading.submit}>
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
