import { isEmpty, isUndefined } from 'lodash'
import moment from 'moment'
import React, { Suspense, useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IUserLoan } from '~/@types/loan'
import { ICategorySpending, IMethodSpending } from '~/@types/spending'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery } from '~/hook'
import { GET_USER_LOAN } from '~/schema/query/loan'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'

const Button = React.lazy(() => import('~/components').then(({ Button }) => ({ default: Button })))
const Input = React.lazy(() => import('~/components').then(({ Input }) => ({ default: Input })))
const AutoComplete = React.lazy(() => import('~/components').then(({ AutoComplete }) => ({ default: AutoComplete })))
const DatePicker = React.lazy(() => import('~/components').then(({ DatePicker }) => ({ default: DatePicker })))
const TextArea = React.lazy(() => import('~/components').then(({ TextArea }) => ({ default: TextArea })))

interface IAddIncomeForm {
    amount: number | string
    categorySpending: ICategorySpending | null
    methodSpending: IMethodSpending | null
    date: Date | null
    description: string
    userLoan: IUserLoan[] | null
}
interface Data {
    methodSpending: IMethodSpending[]
    userLoan: IUserLoan[]
}
const MakeLoan = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { deleteCache } = useCache()
    const { getKindSpendingId, kindSpending } = useConfig()
    const { loading, setSubmitLoading } = useLoading()

    const kindLoanId = useMemo(() => {
        return getKindSpendingId('LOAN')
    }, [kindSpending])

    const [{ methodSpending, userLoan }, fetchData, deleteCacheData, reloadData] = useQuery<Data>(
        {
            methodSpending: GET_METHOD_SPENDING,
            userLoan: GET_USER_LOAN,
        },
        {
            userId: userProfile?._id as string,
        }
    )

    useEffect(() => {
        if (!isUndefined(kindLoanId)) {
            fetchData()
        }
    }, [kindLoanId])

    const form = useForm<IAddIncomeForm>({
        defaultValues: {
            amount: '',
            categorySpending: null,
            methodSpending: null,
            date: null,
            description: '',
            userLoan: null,
        },
    })

    const onsubmit: SubmitHandler<IAddIncomeForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodSpending, description, date, userLoan } = data
        amount = Number(amount)
        description = description.trim()

        // add to database
        const documentLoan = {
            _type: 'spending',
            amount,
            description,
            paid: false,
            date: date ? moment(date).format() : undefined,
            kindSpending: {
                _type: 'reference',
                _ref: kindLoanId,
            },
            methodSpending: {
                _type: 'reference',
                _ref: methodSpending?._id,
            },
            // array
            // userLoan: {
            //     _type: 'reference',
            //     _ref: userLoan?._id,
            // },
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            const { client } = await import('~/sanityConfig')
            const __ = client.transaction()
            __.create(documentLoan)

            userLoan?.forEach((user) => {
                const updateUserLoan = client
                    .patch(user?._id as string)
                    .setIfMissing({
                        surplus: 0,
                        countUsed: 0,
                    })
                    .inc({
                        surplus: amount as number,
                        countUsed: 1,
                    })
                __.patch(updateUserLoan)
            })

            await __.commit()

            // navigate to dashboard
            form.reset(
                {
                    amount: '',
                    methodSpending,
                    userLoan,
                },
                {
                    keepDefaultValues: true,
                }
            )
            alert('Thực hiện tạo vay thành công!')
            // setIsOpen(false)
            // navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleReloadData = async (keys: keyof Data) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
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
                                    name='methodSpending'
                                    form={form}
                                    rules={{
                                        required: 'Yêu cầu chọn phương thức cho vay!',
                                    }}
                                    data={methodSpending.data}
                                    label='Phương thức cho vay'
                                    loading={methodSpending.loading}
                                    onReload={
                                        isEmpty(methodSpending.data)
                                            ? undefined
                                            : () => handleReloadData('methodSpending')
                                    }
                                />

                                <DatePicker name='date' form={form} label='Ngày trả' />

                                <AutoComplete
                                    name='userLoan'
                                    form={form}
                                    rules={{
                                        required: 'Yêu cầu chọn đối tượng cho vay!',
                                    }}
                                    data={userLoan.data}
                                    label='Đối tượng cho vay'
                                    valueKey='userName'
                                    loading={userLoan.loading}
                                    onReload={isEmpty(userLoan.data) ? undefined : () => handleReloadData('userLoan')}
                                    showImage
                                />

                                <TextArea name='description' form={form} label='Ghi chú' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                    <div className='flex sm:justify-start justify-end space-x-3'>
                        <Button color='prussianBlue' type='submit' disabled={loading.submit}>
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
        </Suspense>
    )
}

export default SlideOverHOC(MakeLoan)
