import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { NotifyDetailFormData } from '~/@types/components'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import Button from '../Button'
import SubmitWrap from '../SubmitWrap'
import { Input, RichText } from '../_base'
import { get } from 'lodash'
import clsx from 'clsx'
import LazySearchUser from './LazySearchUser'

interface Props {
    data: NotifyDetailFormData
}

const NotifyDetailEdit: React.FC<Props> = (props) => {
    const { data } = props
    const { t } = useTranslation()
    const { loading } = useLoading()
    const navigate = useNavigate()

    const form = useForm({
        defaultValues: {
            title: get(data, 'notify.notify.title', ''),
            description: get(data, 'notify.notify.description', ''),
            content: get(data, 'notify.notify.content', ''),
        },
    })

    const onsubmit = (data: any) => {}

    // const __users = form.watch('users')

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full w-full flex-col gap-3 md:gap-4'>
            <SubmitWrap hiddenBorder className='sm:rounded-xl sm:bg-white sm:shadow-sm sm:dark:bg-slate-800'>
                <Button color='blue' type='submit' disabled={loading.submit || true}>
                    {t(LANGUAGE.UPDATE)}
                </Button>
                <Button color='outline-indigo' type='button' onClick={() => {}}>
                    {t(LANGUAGE.PREVIEW)}
                </Button>
            </SubmitWrap>
            <div className='flex flex-col-reverse gap-3 md:gap-4 lg:flex-row lg:items-start'>
                <Wrap className='flex-1'>
                    <RichText
                        form={form}
                        name='content'
                        label={t(LANGUAGE.CONTENT)}
                        placeholder={t(LANGUAGE.PLACEHOLDER_ENTER_CONTENT)}
                        className='xl'
                    />
                </Wrap>
                <div className='flex w-full flex-col-reverse gap-3 md:gap-4 lg:w-96 lg:flex-col'>
                    <Wrap className='space-y-4'>
                        <Input label={t(LANGUAGE.TITLE)} form={form} name='title' />

                        <RichText
                            label={t(LANGUAGE.SHORT_DESCRIPTION)}
                            form={form}
                            name='description'
                            placeholder={t(LANGUAGE.PLACEHOLDER_SHORT_DESCRIPTION)}
                            className='xs'
                        />
                    </Wrap>
                    <Wrap className='space-y-4'>
                        {/* List user */}
                        <LazySearchUser form={form} autoFocus={false} />
                    </Wrap>
                </div>
            </div>
        </form>
    )
}

interface WrapProps {
    className?: string
    children: React.ReactNode
}

const Wrap: React.FC<WrapProps> = (props) => {
    const { className, children } = props

    return (
        <div className={clsx('sm:rounded-xl sm:bg-white sm:p-4 sm:shadow-sm sm:dark:bg-slate-800 xl:p-6', className)}>
            {children}
        </div>
    )
}

export default NotifyDetailEdit
