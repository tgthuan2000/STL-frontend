import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '~/components'
import { SlideOverHOC, useCache, useLoading, useSlideOver } from '~/context'
import { useServiceQuery } from '~/hook'
import { client } from '~/sanityConfig'
import useAuth from '~/store/auth'

interface IAddMethodForm {
    name: string
}

const AddMethod = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { loading, setSubmitLoading } = useLoading()
    const { deleteCache } = useCache()
    const { METHOD_SPENDING_DESC_SURPLUS, METHOD_SPENDING } = useServiceQuery()

    const form = useForm<IAddMethodForm>({
        defaultValues: {
            name: '',
        },
    })

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