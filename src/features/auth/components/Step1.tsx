import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Step1Props } from '~/@types/auth'
import { Button } from '~/components'
import { Input } from '~/components/_base'
import { useLoading } from '~/context'

const schema = yup.object().shape({
    email: yup.string().email('Định dạng không hợp lệ').required('Yêu cầu nhập!'),
})

const Step1: React.FC<Step1Props> = ({ onSubmit }) => {
    const { loading } = useLoading()
    const form = useForm<{ email: string }>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(schema),
    })

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-2'>
                <Input name='email' form={form} label='Tài khoản (email)' disabled={loading.submit} autoFocus />
                <Button className='!text-xs' color='cyan' type='submit' disabled={loading.submit}>
                    Tiếp theo
                </Button>
            </div>
        </form>
    )
}

export default Step1
