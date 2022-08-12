import { SanityAssetDocument } from '@sanity/client'
import _ from 'lodash'
import moment from 'moment'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IMethodSpending } from '~/@types/spending'
import { AutoComplete, Button, DatePicker, Input, TextArea } from '~/components'
import { SlideOverHOC, useCache, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GETALL_RECENT_SPENDING, GET_METHOD_SPENDING, GET_RECENT_SPENDING } from '~/schema/query/spending'
import useAuth from '~/store/auth'

interface IMakeTransferForm {
    userName: string
    image: SanityAssetDocument | null
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

    const form = useForm<IMakeTransferForm>({
        defaultValues: {
            userName: '',
            image: null,
        },
    })

    const onsubmit: SubmitHandler<IMakeTransferForm> = async (data) => {
        setSubmitLoading(true)
        let { userName, image } = data
        // add to database
        const document = {
            _type: 'userLoan',
            userName,
            image: image?._id,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            await client.transaction().create(document).commit()
            // navigate to dashboard
            form.reset(
                {
                    userName: '',
                    image: null,
                },
                {
                    keepDefaultValues: true,
                }
            )
            alert('Thực hiện chuyển khoản thành công!')
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

    const handleReloadData = async (keys: keyof Data) => {
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
                                name='userName'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu nhập tên thành viên!',
                                }}
                                type='text'
                                label='Họ và tên'
                            />
                            {/* <Controller
                                name='image'
                                form={form}
                                render={({ field, fieldState: { error } }) => <div>hello</div>}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                <div className='flex sm:justify-start justify-end space-x-3'>
                    <Button color='green' type='submit' disabled={loading.submit}>
                        Tạo thành viên
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
