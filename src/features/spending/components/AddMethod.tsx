import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BadgeCheckIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import { isEmpty } from 'lodash'
import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AddMethodQueryData, IAddMethodForm } from '~/@types/spending'
import { Button } from '~/components'
import { Input } from '~/components/_base'
import { SlideOverHOC, useCache, useLoading, useSlideOver } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'
import { searchName } from '../services'

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

    const [{ methodSpending }, fetchData, deleteCacheData, reloadData] = useQuery<AddMethodQueryData>(
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
            toast.success<string>('Tạo mới phương thức thanh toán thành công!')
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
                                                <h4></h4>
                                                <span className='text-yellow-500 flex items-center gap-1'>
                                                    <ExclamationCircleIcon className='h-6 w-6' />
                                                    Một số phương thức gần giống tên
                                                </span>

                                                <ul className='mt-1 list-disc pl-5'>
                                                    {sameMethodList?.map((item) => {
                                                        const component = searchName(item.name, watchName)
                                                        if (typeof component === 'string') {
                                                            return <li key={item._id}>{component}</li>
                                                        }
                                                        const [start, middle, end] = component
                                                        return (
                                                            <li key={item._id}>
                                                                {start}
                                                                <span className='font-medium text-yellow-600'>
                                                                    {middle}
                                                                </span>
                                                                {end}
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </>
                                        ) : (
                                            <span className='text-green-500 flex items-center gap-1'>
                                                <BadgeCheckIcon className='h-6 w-6' />
                                                Không có phương thức nào gần giống tên!
                                            </span>
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
