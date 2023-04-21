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
        //                             {/* <div>
        //                                 <p className='inline-block text-sm font-medium text-gray-700 dark:text-slate-100'>
        //                                     {t(LANGUAGE.NOTIFY_RECEIVER_LIST)}
        //                                 </p>
        //                                 <UserList data={__users}>
        //                                     {(user, index) => (
        //                                         <Fragment>
        //                                             <UserAllowSendMailButton
        //                                                 active={user.sendMail}
        //                                                 disabled={form.watch('sendAll')}
        //                                                 hidden={!user.allowSendMail}
        //                                                 onClick={() => {
        //                                                     form.setValue(`users.${index}.sendMail`, !user.sendMail)
        //                                                 }}
        //                                             />
        //                                             <UserDeleteButton
        //                                                 disabled={form.watch('sendAll')}
        //                                                 onClick={() => {
        //                                                     form.setValue(
        //                                                         'users',
        //                                                         __users.filter((u) => u._id !== user._id)
        //                                                     )
        //                                                 }}
        //                                             />
        //                                         </Fragment>
        //                                     )}
        //                                 </UserList>
        //                             </div> */}

        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full w-full flex-col gap-3 md:gap-4'>
            <SubmitWrap hiddenBorder className='rounded-xl bg-white shadow-sm dark:bg-slate-800'>
                <Button color='blue' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.UPDATE)}
                </Button>
                <Button
                    color='outline'
                    type='button'
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    {t(LANGUAGE.BACK)}
                </Button>
            </SubmitWrap>
            <div className='flex flex-col-reverse gap-3 md:gap-4 lg:flex-row lg:items-start'>
                <Wrap className='flex-1'>
                    <RichText
                        form={form}
                        name='content'
                        label={t(LANGUAGE.CONTENT)}
                        placeholder={t(LANGUAGE.PLACEHOLDER_ENTER_CONTENT)}
                        className='lg'
                    />
                </Wrap>
                <div className='flex w-full flex-col gap-3 md:gap-4 lg:w-96'>
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
                    <Wrap className='h-80 space-y-4'>
                        {/* List user */}
                        <></>
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
        <div className={clsx('rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800 xl:p-6', className)}>{children}</div>
    )
}

export default NotifyDetailEdit
