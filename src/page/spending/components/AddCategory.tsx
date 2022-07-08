import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IKindSpending } from '~/@types/context'
import { Button, Input, Selection } from '~/components'
import { SlideOverHOC, useConfig, useSlideOver } from '~/context'
import { client } from '~/sanityConfig'
import useAuth from '~/store/auth'

interface IAddCategoryForm {
    name: string
    kindSpending: IKindSpending | null
}
const AddCategory = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { kindSpending } = useConfig()
    const { userProfile } = useAuth()
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit } = useForm<IAddCategoryForm>({
        defaultValues: {
            name: '',
            kindSpending: null,
        },
    })

    const onsubmit: SubmitHandler<IAddCategoryForm> = async (data) => {
        setLoading(true)
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
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }
        try {
            await client.create(document)
            // navigate to dashboard
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
                                name='kindSpending'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu chọn thể loại!',
                                }}
                                render={({ field: { value, onChange }, fieldState: { error } }) => (
                                    <Selection
                                        label='Thể loại'
                                        placeholder='--- Chọn thể loại ---'
                                        data={kindSpending}
                                        idKey='_id'
                                        valueKey='name'
                                        error={error}
                                        value={value}
                                        onChange={onChange}
                                    />
                                )}
                            />
                            <Controller
                                name='name'
                                control={control}
                                rules={{
                                    required: 'Yêu cầu nhập tên thể loại!',
                                    maxLength: {
                                        value: 50,
                                        message: 'Tên thể loại không được vượt quá 50 ký tự!',
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <Input type='text' label='Tên thể loại' error={error} {...field} />
                                )}
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

export default SlideOverHOC(AddCategory)
