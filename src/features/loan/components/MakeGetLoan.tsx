import { isEmpty, isUndefined } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IMakeGetLoanForm, QueryDataMakeGetLoan } from '~/@types/loan'
import { Button, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea } from '~/components/_base'
import { TAGS } from '~/constant'
import { SlideOverHOC, useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_USER_LOAN } from '~/schema/query/loan'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import StatusLoan from './common/StatusLoan'

const MakeGetLoan = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { getKindSpendingId, kindSpending } = useConfig()
    const { loading, setSubmitLoading } = useLoading()
    const { needCheckWhenLeave } = useCheck()
    const { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } = useServiceQuery()
    const { deleteCache } = useCache()

    const kindLoanId = useMemo(() => {
        return getKindSpendingId('GET_LOAN')
    }, [kindSpending])

    const [{ methodSpending, userLoan }, fetchData, deleteCacheData, reloadData] = useQuery<QueryDataMakeGetLoan>(
        { methodSpending: GET_METHOD_SPENDING, userLoan: GET_USER_LOAN },
        { userId: userProfile?._id as string },
        { methodSpending: TAGS.ENUM, userLoan: TAGS.ENUM }
    )

    useEffect(() => {
        if (!isUndefined(kindLoanId)) {
            fetchData()
        }
    }, [kindLoanId])

    const form = useForm<IMakeGetLoanForm>({
        defaultValues: {
            amount: '',
            methodReference: null,
            estimatePaidDate: null,
            userLoan: null,
            description: '',
        },
    })

    const onsubmit: SubmitHandler<IMakeGetLoanForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodReference, description, estimatePaidDate, userLoan } = data
        amount = Number(amount)
        description = description.trim()

        const documentSpending = {
            _type: 'spending',
            amount,
            description: `${methodReference ? 'Cộng gốc' : 'Tạm vay'}${description ? `\n${description}` : ''}`,
            kindSpending: {
                _type: 'reference',
                _ref: kindLoanId,
            },
            date: moment().format(), // for statistic
            estimatePaidDate: estimatePaidDate ? moment(estimatePaidDate).format() : undefined,
            paid: false,
            ...(methodReference && {
                surplus: methodReference.surplus,
                methodReference: {
                    _type: 'reference',
                    _ref: methodReference._id,
                },
            }),
            userLoan: {
                _type: 'reference',
                _ref: userLoan?._id,
            },
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            const __ = client.transaction()
            __.create(documentSpending)

            const updateUserLoan = client
                .patch(userLoan?._id as string)
                .setIfMissing({
                    surplus: 0,
                    countUsed: 0,
                })
                .inc({
                    surplus: amount,
                    countUsed: 1,
                })
            __.patch(updateUserLoan)

            if (methodReference) {
                const updateMethodReference = client
                    .patch(methodReference?._id as string)
                    .setIfMissing({
                        countUsed: 0,
                        surplus: 0,
                    })
                    .inc({
                        countUsed: 1,
                        surplus: amount,
                    })
                __.patch(updateMethodReference)
            }

            await __.commit()

            let res
            setTimeout(() => {
                if (methodReference) {
                    res = deleteCacheData('methodSpending', 'userLoan')
                } else {
                    res = deleteCacheData('userLoan')
                }
                console.log(res)

                reloadData()
            }, 0)

            form.reset({ amount: '', methodReference, userLoan }, { keepDefaultValues: true })
            toast.success<string>('Thực hiện tạo vay thành công!')
            deleteCache([GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN])
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleReloadData = async (keys: keyof QueryDataMakeGetLoan) => {
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
                                name='methodReference'
                                form={form}
                                data={methodSpending.data}
                                label='Phương thức nhận tiền'
                                loading={methodSpending.loading}
                                onReload={
                                    isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')
                                }
                            />

                            <StatusLoan form={form} name='methodReference' />

                            <DatePicker name='estimatePaidDate' form={form} label='Ngày trả' />

                            <AutoComplete
                                name='userLoan'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu chọn đối tượng vay!',
                                }}
                                data={userLoan.data}
                                label='Đối tượng vay'
                                valueKey='userName'
                                loading={userLoan.loading}
                                onReload={isEmpty(userLoan.data) ? undefined : () => handleReloadData('userLoan')}
                                showImage
                                surplusName='Tài sản'
                            />

                            <TextArea name='description' form={form} label='Ghi chú' />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
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
            </SubmitWrap>
        </form>
    )
}

export default SlideOverHOC(MakeGetLoan)
