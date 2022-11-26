import { useAutoAnimate } from '@formkit/auto-animate/react'
import { isEmpty } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IKindSpending } from '~/@types/context'
import { ICategorySpending } from '~/@types/spending'
import { Button, Input, Selection } from '~/components'
import { KIND_SPENDING } from '~/constant/spending'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import useQuery, { ParamsTypeUseQuery, QueryTypeUseQuery } from '~/hook/useQuery'
import { client } from '~/sanityConfig'
import { GET_CATEGORY_SPENDING } from '~/schema/query/spending'
import { getCategorySpending } from '~/services/query'
import useAuth from '~/store/auth'

interface IAddCategoryForm {
    name: string
    kindSpending: IKindSpending | null
}

interface Data {
    categorySpending: ICategorySpending[]
}

const AddCategory = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { kindSpending, getKindSpendingId } = useConfig()
    const { userProfile } = useAuth()
    const { loading, setSubmitLoading } = useLoading()
    const { deleteCache } = useCache()
    const [alertRef] = useAutoAnimate<HTMLDivElement>()

    const kinds = useMemo(
        () => kindSpending.filter((kind) => [KIND_SPENDING.COST, KIND_SPENDING.RECEIVE].includes(kind.key)),
        [kindSpending]
    )

    const form = useForm<IAddCategoryForm>({
        defaultValues: {
            name: '',
            kindSpending: kinds.find((kind) => kind._id === getKindSpendingId('RECEIVE')),
        },
    })

    const watchName = form.watch('name')
    const watchKind = form.watch('kindSpending._id')

    const defaultValues = useMemo(() => {
        return {
            query: {
                categorySpending: GET_CATEGORY_SPENDING,
            },
            params: {
                userId: userProfile?._id as string,
                kindSpending: watchKind as string,
            },
        }
    }, [watchKind])

    useEffect(() => {
        setQuery(defaultValues)
        reloadData()
    }, [defaultValues])

    const [{ query, params }, setQuery] = useState<{ query: QueryTypeUseQuery<Data>; params: ParamsTypeUseQuery }>(
        defaultValues
    )

    const [{ categorySpending }, fetchData, deleteCacheData, reloadData] = useQuery<Data>(query, params)

    const onsubmit: SubmitHandler<IAddCategoryForm> = async (data) => {
        setSubmitLoading(true)
        let { name, kindSpending } = data
        // delete spaces between and last first
        name = name.replace(/\s+/g, ' ').trim()
        // capitalize first letter
        name = name.charAt(0).toUpperCase() + name.slice(1)
        // add to database
        const document = {
            _type: 'categorySpending',
            name,
            kindSpending: {
                _type: 'reference',
                _ref: kindSpending?._id,
            },
            countUsed: 0,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }
        try {
            await client.create(document)
            // navigate to dashboard
            const result = deleteCache([
                getCategorySpending({ userProfile, kindSpending: kindSpending?._id as string }),
            ])
            console.log(result)
            alert('Tạo mới thể loại thành công!')
            // setIsOpen(false)
            // navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const sameCategoryList = useMemo(() => {
        return categorySpending.data?.filter((item) => {
            return item.name.toLowerCase().includes(watchName.toLowerCase())
        })
    }, [watchName, watchKind, categorySpending.data])

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <Selection
                                name='kindSpending'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu chọn thể loại!',
                                }}
                                label='Thể loại'
                                placeholder='--- Chọn thể loại ---'
                                data={kinds}
                                idKey='_id'
                                valueKey='name'
                            />

                            <Input
                                name='name'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu nhập tên thể loại!',
                                    maxLength: {
                                        value: 50,
                                        message: 'Tên thể loại không được vượt quá 50 ký tự!',
                                    },
                                }}
                                type='text'
                                label='Tên thể loại'
                            />

                            <div ref={alertRef}>
                                {!categorySpending.loading && form.watch('kindSpending') && watchName.length >= 2 && (
                                    <>
                                        {!isEmpty(sameCategoryList) ? (
                                            <>
                                                <h4>Đang có một số thể loại gần giống tên:</h4>
                                                <ul className='mt-1 list-disc pl-5'>
                                                    {sameCategoryList?.map((item) => {
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
                                            <div className='text-green-500'>Không có thể loại nào gần giống tên!</div>
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

export default SlideOverHOC(AddCategory)
