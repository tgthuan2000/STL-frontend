import { SanityAssetDocument } from '@sanity/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Input, UploadImage } from '~/components'
import { SlideOverHOC, useLoading, useSlideOver } from '~/context'
import useAuth from '~/store/auth'

interface IMakeTransferForm {
    userName: string
    image: SanityAssetDocument | null
}

const defaultValues = {
    userName: '',
    image: null,
}

const MakeTransfer = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { loading, setSubmitLoading } = useLoading()

    const form = useForm<IMakeTransferForm>({
        defaultValues,
    })

    const onsubmit: SubmitHandler<IMakeTransferForm> = async (data) => {
        setSubmitLoading(true)
        let { userName, image } = data
        // delete spaces between and last first
        userName = userName.replace(/\s+/g, ' ').trim()
        // add to database
        let _image
        if (image) {
            _image = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: image._id,
                },
            }
        }
        const document = {
            _type: 'userLoan',
            userName,
            image: _image,
            surplus: 0,
            countUsed: 0,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            const { client } = await import('~/sanityConfig')
            await client.transaction().create(document).commit()
            // navigate to dashboard
            form.reset(defaultValues, {
                keepDefaultValues: true,
            })
            alert('Tạo thành viên thành công!')
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
                                name='userName'
                                form={form}
                                rules={{
                                    required: 'Yêu cầu nhập tên thành viên!',
                                }}
                                type='text'
                                label='Họ và tên'
                            />
                            <UploadImage name='image' form={form} label='Hình ảnh (tùy chọn)' />
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
