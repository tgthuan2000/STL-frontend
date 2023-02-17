import { isEmpty, isUndefined } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IAddIncomeForm, QueryDataMakeLoan } from '~/@types/loan'
import { Button, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea } from '~/components/_base'
import { TAGS } from '~/constant'
import { SlideOverHOC, useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_USER_LOAN } from '~/schema/query/loan'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'

const MakeLoan = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useProfile()
    const { getKindSpendingId, kindSpending } = useConfig()
    const { loading, setSubmitLoading } = useLoading()
    const { needCheckWhenLeave } = useCheck()
    const { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } = useServiceQuery()
    const { deleteCache } = useCache()

    const kindLoanId = useMemo(() => {
        return getKindSpendingId('LOAN')
    }, [kindSpending])

    const [{ methodSpending, userLoan }, fetchData, deleteCacheData, reloadData] = useQuery<QueryDataMakeLoan>(
        { methodSpending: GET_METHOD_SPENDING, userLoan: GET_USER_LOAN },
        { userId: userProfile?._id as string },
        { methodSpending: TAGS.ENUM, userLoan: TAGS.ENUM }
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

            form.reset({ amount: '', methodSpending, userLoan }, { keepDefaultValues: true })
            toast.success<string>('Thực hiện tạo vay thành công!')
            deleteCache([GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN])
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleReloadData = async (keys: keyof QueryDataMakeLoan) => {
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
                                name='methodSpending'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu chọn phương thức cho vay!',
                                }}
                                data={methodSpending.data}
                                label='Phương thức cho vay'
                                loading={methodSpending.loading}
                                onReload={
                                    isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')
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
            <SubmitWrap>
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
            </SubmitWrap>
        </form>
    )
}

export default SlideOverHOC(MakeLoan)
