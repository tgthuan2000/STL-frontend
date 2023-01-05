import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '~/components/_base'
import { Button } from '~/components'
import { useLoading } from '~/context'

const schema = yup.object().shape({
    email: yup.string().email('Định dạng không hợp lệ').required('Yêu cầu nhập!'),
    password: yup.string().required('Yêu cầu nhập!'),
})

export interface LoginForm {
    email: string
    password: string
}

interface LoginByEmailPasswordFormProps {
    onSubmit: (data: LoginForm) => Promise<void>
}

const LoginByEmailPasswordForm: React.FC<LoginByEmailPasswordFormProps> = ({ onSubmit }) => {
    const form = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-2'>
                <Input name='email' form={form} label='Tài khoản (email)' />
                <Input name='password' form={form} label='Mật khẩu' type='password' />
                <Button color='cyan' type='submit'>
                    Đăng nhập
                </Button>
            </div>
        </form>
    )
}

export default LoginByEmailPasswordForm
