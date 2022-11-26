import { useAutoAnimate } from '@formkit/auto-animate/react'
import { isEmpty, isEqual } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IMethodSpending } from '~/@types/spending'
import { Button, Input } from '~/components'
import { SlideOverHOC, useCache, useLoading, useSlideOver } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'

interface IAddMethodForm {
    name: string
}
interface Data {
    methodSpending: IMethodSpending[]
}
const AddMethod = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { loading, setSubmitLoading } = useLoading()
    const { deleteCache } = useCache()
    const { METHOD_SPENDING_DESC_SURPLUS, METHOD_SPENDING } = useServiceQuery()
    const [alertRef] = useAutoAnimate<HTMLDivElement>()
    const form = useForm<IAddMethodForm>({
        defaultValues: {
            name: '',
        },
    })

    const [{ methodSpending }, fetchData, deleteCacheData, reloadData] = useQuery<Data>(
        { methodSpending: GET_METHOD_SPENDING },
        { userId: userProfile?._id as string }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const onsubmit: SubmitHandler<IAddMethodForm> = async (data) => {
        setSubmitLoading(true)
        let { name } = data
        // delete spaces between and last first
        name = name.replace(/\s+/g, ' ').trim()
        // capitalize first letter
        name = name.charAt(0).toUpperCase() + name.slice(1)
        // add to database
        const document = {
            _type: 'methodSpending',
            name,
            surplus: 0,
            countUsed: 0,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }
        try {
            await client.create(document)
            // navigate to dashboard
            const result = deleteCache([METHOD_SPENDING_DESC_SURPLUS, METHOD_SPENDING])
            console.log(result)
            alert('Tạo mới phương thức thanh toán thành công!')
            // setIsOpen(false)
            // navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const watchName = form.watch('name')

    const sameMethodList = useMemo(() => {
        return methodSpending.data?.filter((item) => {
            return item.name.toLowerCase().includes(watchName.toLowerCase())
        })
    }, [watchName])

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <Input
                                name='name'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu nhập tên phương thức thanh toán!',
                                    maxLength: {
                                        value: 50,
                                        message: 'Tên phương thức thanh toán không được vượt quá 50 ký tự!',
                                    },
                                }}
                                type='text'
                                label='Tên phương thức thanh toán'
                            />

                            <div ref={alertRef}>
                                {!methodSpending.loading && watchName.length >= 2 && (
                                    <>
                                        {!isEmpty(sameMethodList) ? (
                                            <>
                                                <h4>Đang có một số phương thức gần giống tên:</h4>
                                                <ul className='mt-1 list-disc pl-5'>
                                                    {sameMethodList?.map((item) => {
                                                        let component: any = <>{item.name}</>
                                                        const index = item.name
                                                            .toLowerCase()
                                                            .indexOf(watchName.toLowerCase())
                                                        if (index !== -1) {
                                                            const start = item.name.slice(0, index)
                                                            const middle = item.name.slice(
                                                                index,
                                                                index + watchName.length
                                                            )
                                                            const end = item.name.slice(index + watchName.length)
                                                            component = (
                                                                <>
                                                                    {start}
                                                                    <span className='font-medium text-green-600'>
                                                                        {middle}
                                                                    </span>
                                                                    {end}
                                                                </>
                                                            )
                                                        }
                                                        return <li key={item._id}>{component}</li>
                                                    })}
                                                </ul>
                                            </>
                                        ) : (
                                            <div className='text-green-500'>
                                                Không có phương thức nào gần giống tên!
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                <div className='flex sm:justify-start justify-end space-x-3'>
                    <Button color='cyan' type='submit' disabled={loading.submit}>
                        Tạo
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

export default SlideOverHOC(AddMethod)
