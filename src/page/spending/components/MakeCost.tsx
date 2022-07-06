import { useEffect, useMemo, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ICategorySpending, IMethodSpending } from '~/@types/spending'
import { AutoComplete, Button, Input, TextArea } from '~/components'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import { client } from '~/sanityConfig'
import { GET_CATEGORY_SPENDING, GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'

interface IAddCostForm {
    amount: number
    categorySpending: ICategorySpending | null
    methodSpending: IMethodSpending | null
    description: string
}
interface Data {
    methodSpending: ICategorySpending[]
    categorySpending: IMethodSpending[]
}

const MakeCost = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { setIsRefetch, fetchApi } = useCache()
    const { loading, setLoading } = useLoading()
    const { kindSpending } = useConfig()

    const kindSpendingId = useMemo(() => {
        return kindSpending.find((kind) => kind.key.toLowerCase() === 'cost')?._id
    }, [])

    const [data, setData] = useState<Data>({
        methodSpending: [],
        categorySpending: [],
    })
    const { control, handleSubmit } = useForm<IAddCostForm>({
        defaultValues: {
            amount: 0,
            categorySpending: null,
            methodSpending: null,
            description: '',
        },
    })

    useEffect(() => {
        const getData = async () => {
            try {
                const query = `
                    {
                        "methodSpending": ${GET_METHOD_SPENDING},
                        "categorySpending": ${GET_CATEGORY_SPENDING}
                    }
                `

                const params = {
                    userId: userProfile?._id,
                    kindSpending: kindSpendingId,
                }
                const res = await fetchApi<Data>(query, params)

                setData({
                    methodSpending: res.methodSpending,
                    categorySpending: res.categorySpending,
                })
            } catch (error) {
                console.log(error)
            } finally {
            }
        }
        getData()
    }, [])

    const onsubmit: SubmitHandler<IAddCostForm> = async (data) => {
        setLoading(true)
        let { amount, methodSpending, categorySpending, description } = data

        // add to database
        const document = {
            _type: 'spending',
            amount,
            description,
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
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name='description'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu chọn phương thức thanh toán!',
                                }}
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
