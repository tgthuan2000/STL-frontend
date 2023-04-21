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
        <div className='rounded-xl bg-white py-2 shadow-lg dark:bg-slate-800 sm:py-6 lg:py-8'>
            <div className='mx-auto w-full max-w-lg'>
                <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
                    <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                        <div className='flex flex-1 flex-col justify-between'>
                            <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                                <div className='space-y-6 pt-6 pb-5'>
                                    <Input label={t(LANGUAGE.TITLE)} form={form} name='title' />

                                    <RichText
                                        label={t(LANGUAGE.SHORT_DESCRIPTION)}
                                        form={form}
                                        name='description'
                                        placeholder={t(LANGUAGE.PLACEHOLDER_SHORT_DESCRIPTION)}
                                        className='xs'
                                    />

                                    <RichText
                                        form={form}
                                        name='content'
                                        label={t(LANGUAGE.CONTENT)}
                                        placeholder={t(LANGUAGE.PLACEHOLDER_ENTER_CONTENT)}
                                    />

                                    {/* <div>
                                        <p className='inline-block text-sm font-medium text-gray-700 dark:text-slate-100'>
                                            {t(LANGUAGE.NOTIFY_RECEIVER_LIST)}
                                        </p>
                                        <UserList data={__users}>
                                            {(user, index) => (
                                                <Fragment>
                                                    <UserAllowSendMailButton
                                                        active={user.sendMail}
                                                        disabled={form.watch('sendAll')}
                                                        hidden={!user.allowSendMail}
                                                        onClick={() => {
                                                            form.setValue(`users.${index}.sendMail`, !user.sendMail)
                                                        }}
                                                    />
                                                    <UserDeleteButton
                                                        disabled={form.watch('sendAll')}
                                                        onClick={() => {
                                                            form.setValue(
                                                                'users',
                                                                __users.filter((u) => u._id !== user._id)
                                                            )
                                                        }}
                                                    />
                                                </Fragment>
                                            )}
                                        </UserList>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <SubmitWrap>
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
                            {t(LANGUAGE.CANCEL)}
                        </Button>
                    </SubmitWrap>
                </form>
            </div>
        </div>
    )
}

export default NotifyDetailEdit
