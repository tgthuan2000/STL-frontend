import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IMakeTransferForm, MakeTransferQueryData } from '~/@types/spending'
import { Button } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea } from '~/components/_base'
import { TAGS } from '~/constant'
import { SlideOverHOC, useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'

const MakeTransfer = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { deleteCache } = useCache()
    const { loading, setSubmitLoading } = useLoading()
    const { getKindSpendingId } = useConfig()
    const { needCheckWhenLeave } = useCheck()
    const { METHOD_SPENDING_DESC_SURPLUS, RECENT_SPENDING, RECENT_SPENDING_PAGINATE } = useServiceQuery()

    const [{ methodSpending }, fetchData, deleteCacheData, reloadData] = useQuery<MakeTransferQueryData>(
        { methodSpending: GET_METHOD_SPENDING },
        { userId: userProfile?._id as string },
        { methodSpending: TAGS.ENUM }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const form = useForm<IMakeTransferForm>({
        defaultValues: {
            amount: '',
            methodSpendingFrom: null,
            methodSpendingTo: null,
            date: new Date(),
            description: '',
        },
    })

    const onsubmit: SubmitHandler<IMakeTransferForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodSpendingFrom, methodSpendingTo, description, date } = data
        amount = Number(amount)
        description = description.trim()
        // add to database
        const document1 = {
            _type: 'spending',
            amount,
            description: `Đến ${methodSpendingTo?.name}${description ? `\n${description}` : ''}`,
            date: moment(date).format(),
            surplus: methodSpendingFrom?.surplus,
            kindSpending: {
                _type: 'reference',
                _ref: getKindSpendingId('TRANSFER_FROM'),
            },
            methodSpending: {
                _type: 'reference',
                _ref: methodSpendingFrom?._id,
            },
            methodReference: {
                _type: 'reference',
                _ref: methodSpendingTo?._id,
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
            date: moment(date).format(),
            surplus: methodSpendingTo?.surplus,
            kindSpending: {
                _type: 'reference',
                _ref: getKindSpendingId('TRANSFER_TO'),
            },
            methodSpending: {
                _type: 'reference',
                _ref: methodSpendingTo?._id,
            },
            methodReference: {
                _type: 'reference',
                _ref: methodSpendingFrom?._id,
            },
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            const patch1 = client
                .patch(methodSpendingFrom?._id as string)
                .setIfMissing({ surplus: 0, countUsed: 0 })
                .dec({ surplus: amount })
                .inc({ countUsed: 1 })

            const patch2 = client
                .patch(methodSpendingTo?._id as string)
                .setIfMissing({ surplus: 0, countUsed: 0 })
                .inc({ surplus: amount, countUsed: 1 })

            await client.transaction().create(document1).patch(patch1).create(document2).patch(patch2).commit()
            // navigate to dashboard
            let res: string | null = deleteCache([
                METHOD_SPENDING_DESC_SURPLUS,
                RECENT_SPENDING,
                RECENT_SPENDING_PAGINATE,
            ])
            console.log(res)

            setTimeout(() => {
                res = deleteCacheData('methodSpending')
                console.log(res)

                reloadData()
            }, 0)

            form.reset(
                {
                    amount: '',
                    methodSpendingFrom,
                    methodSpendingTo,
                },
                {
                    keepDefaultValues: true,
                }
            )
            toast.success<string>('Thực hiện chuyển khoản thành công!')
            needCheckWhenLeave()
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

    const handleReloadData = async (keys: keyof MakeTransferQueryData) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <Input
                                name='amount'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu nhập số tiền!',
                                    min: {
                                        value: 0,
                                        message: 'Số tiền phải lớn hơn 0!',
                                    },
                                }}
                                type='number'
                                label='Số tiền'
                            />

                            <AutoComplete
                                name='methodSpendingFrom'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu chọn phương thức thanh toán!',
                                }}
                                data={methodSpending.data}
                                label='Từ phương thức thanh toán'
                                loading={methodSpending.loading}
                                addMore={handleAddMoreMethodSpending}
                                onReload={
                                    isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')
                                }
                            />

                            <AutoComplete
                                name='methodSpendingTo'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu chọn phương thức thanh toán!',
                                }}
                                data={methodSpending.data}
                                label='Đến phương thức thanh toán'
                                loading={methodSpending.loading}
                                addMore={handleAddMoreMethodSpending}
                                onReload={
                                    isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')
                                }
                            />

                            <DatePicker
                                name='date'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu chọn ngày!',
                                }}
                                label='Ngày'
                            />

                            <TextArea name='description' form={form} label='Ghi chú' />
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
