import _ from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IUserLoan } from '~/@types/loan'
import { ICategorySpending, IMethodSpending } from '~/@types/spending'
import { AutoComplete, Button, DatePicker, Input, TextArea } from '~/components'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_USER_LOAN } from '~/schema/query/loan'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'

interface IAddIncomeForm {
    amount: number | string
    categorySpending: ICategorySpending | null
    methodSpending: IMethodSpending | null
    payDate: Date | null
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
    const { getKindLoanId, kindLoan } = useConfig()
    const { loading, setSubmitLoading } = useLoading()

    const kindLoanId = useMemo(() => {
        return getKindLoanId('LOAN')
    }, [kindLoan])

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
        if (!_.isUndefined(kindLoanId)) {
            fetchData()
        }
    }, [kindLoanId])

    const { control, handleSubmit, reset } = useForm<IAddIncomeForm>({
        defaultValues: {
            amount: '',
            categorySpending: null,
            methodSpending: null,
            payDate: null,
            description: '',
            userLoan: null,
        },
    })

    const onsubmit: SubmitHandler<IAddIncomeForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodSpending, description, payDate, userLoan } = data
        amount = Number(amount)
        description = description.trim()

        // add to database
        const document = {
            _type: 'loan',
            amount,
            description,
            payDate: moment(payDate).format(),
            kindLoan: {
                _type: 'reference',
                _ref: kindLoanId,
            },
            methodSpending: {
                _type: 'reference',
                _ref: methodSpending?._id,
            },
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
            await client.create(document)
            // navigate to dashboard
            reset(
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
                                name='payDate'
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <DatePicker label='Ngày trả' error={error} {...field} />
                                )}
                            />
                            <Controller
                                name='userLoan'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu chọn đối tượng vay!',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <AutoComplete
                                        data={userLoan.data}
                                        label='Đối tượng vay'
                                        valueKey='userName'
                                        error={error}
                                        loading={userLoan.loading}
                                        // multiple
                                        onReload={
                                            _.isEmpty(userLoan.data) ? undefined : () => handleReloadData('userLoan')
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
    )
}

export default SlideOverHOC(MakeLoan)
