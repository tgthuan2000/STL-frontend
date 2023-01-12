import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CheckCircleIcon, ExclamationIcon } from '@heroicons/react/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { SanityDocument } from '@sanity/client'
import { isEmpty } from 'lodash'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { IUserProfile, Step2Props } from '~/@types/auth'
import { Button } from '~/components'
import { Input } from '~/components/_base'
import { UserSvg } from '~/components/_constant'
import { useLoading } from '~/context'

const schema = yup.object().shape({
    password: yup.string().required('Yêu cầu nhập!'),
})

const Step2: React.FC<Step2Props> = ({ previewData, onSubmit }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [chose, setChose] = useState<SanityDocument<IUserProfile> | null | undefined>(previewData?.[0])
    const { loading } = useLoading()
    const form = useForm<{ password: string }>({
        mode: 'onBlur',
        defaultValues: {
            password: '',
        },
        resolver: yupResolver(schema),
    })
    const handleSubmit: SubmitHandler<{ password: string }> = (data) => {
        if (!chose) return
        onSubmit(data, chose)
    }
    return (
        <div className='space-y-3'>
            {!isEmpty(previewData) && (
                <div className='bg-white shadow-md rounded-lg select-none overflow-hidden'>
                    {previewData?.map((data) => {
                        const checked = data._id === chose?._id
                        return (
                            <div
                                className='px-4 py-2 flex gap-2 items-center cursor-pointer'
                                onClick={() => !checked && setChose(data)}
                            >
                                {data.image ? (
                                    <img
                                        src={data.image}
                                        alt={data.userName}
                                        className='h-8 w-8 rounded-full flex-shrink-0 object-cover'
                                    />
                                ) : (
                                    <div className='h-8 w-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-400'>
                                        <UserSvg />
                                    </div>
                                )}
                                <div className='flex-1 max-w-[250px]'>
                                    <p className='font-medium text-gray-900 truncate'>{data.userName}</p>
                                    <small className='font-normal text-gray-500 truncate block'>{data.email}</small>
                                </div>
                                {checked && <CheckCircleIcon className='h-6 text-cyan-500' />}
                            </div>
                        )
                    })}
                </div>
            )}
            <div ref={parent}>
                {chose?.isHasPassword ? (
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
                        <Input
                            name='password'
                            form={form}
                            label='Mật khẩu'
                            type='password'
                            disabled={loading.config}
                            autoFocus
                        />
                        <Button className='!text-xs' color='cyan' type='submit' disabled={loading.config}>
                            Đăng nhập
                        </Button>
                    </form>
                ) : (
                    <div className='flex items-center gap-2 text-white bg-yellow-500 p-3 rounded-md select-none'>
                        <ExclamationIcon className='h-6' />
                        <p className='font-normal'>Tài khoản này chưa cài đặt mật khẩu!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Step2
