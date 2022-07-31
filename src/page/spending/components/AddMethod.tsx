import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '~/components'
import { SlideOverHOC, useCache, useConfig, useSlideOver } from '~/context'
import { client } from '~/sanityConfig'
import { getMethodKindSpending, getMethodSpending } from '~/services/query'
import useAuth from '~/store/auth'

interface IAddMethodForm {
    name: string
}

const AddMethod = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const [loading, setLoading] = useState(false)
    const { deleteCache } = useCache()
    const { kindSpending } = useConfig()

    const form = useForm<IAddMethodForm>({
        defaultValues: {
            name: '',
        },
    })

    const onsubmit: SubmitHandler<IAddMethodForm> = async (data) => {
        setLoading(true)
        let { name } = data
        // delete spaces between and last first
        name = name.replace(/\s+/g, ' ').trim()
        // capitalize first letter
        name = name.charAt(0).toUpperCase() + name.slice(1)
        // add to database
        const document = {
            _type: 'methodSpending',
            name,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }
        try {
            await client.create(document)
            // navigate to dashboard
            const result = deleteCache([
                getMethodKindSpending({ userProfile, kindSpending }),
                getMethodSpending({ userProfile }),
            ])
            console.log(result)
            alert('Tạo mới phương thức thanh toán thành công!')
            // setIsOpen(false)
            // navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

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
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                <div className='flex sm:justify-start justify-end space-x-3'>
                    <Button color='cyan' type='submit' disabled={loading}>
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
