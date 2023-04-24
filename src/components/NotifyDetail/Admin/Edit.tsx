import clsx from 'clsx'
import { get } from 'lodash'
import React, { useMemo } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AdminAssigned } from '~/@types/notify'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import Button from '../../Button'
import SubmitWrap from '../../SubmitWrap'
import { Input, RichText } from '../../_base'
import LazySearchUser from './LazySearchUser'
import { IUserProfile } from '~/@types/auth'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useAxios } from '~/hook'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface Props {
    refetch: () => void
    data: { notify: NotifyDetailEditForm }
}

export interface _Assigned extends AdminAssigned {
    user: IUserProfile & { sendMail?: boolean }
    deleted?: boolean
}

export interface NotifyDetailEditForm {
    title: string
    description: string
    content: string
    assigned: Array<_Assigned>
}

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            title: yup.string().required(t(LANGUAGE.REQUIRED_NOTIFY_TITLE) as string),
            description: yup.string(),
            content: yup.string().required(t(LANGUAGE.REQUIRED_NOTIFY_CONTENT) as string),
        })
    }, [])
    return schema
}

const NotifyDetailEdit: React.FC<Props> = (props) => {
    const { data, refetch } = props
    const { id } = useParams()
    const { t } = useTranslation()
    const { loading, setSubmitLoading } = useLoading()
    const axios = useAxios()
    const navigate = useNavigate()
    const schema = useSchema()

    const form: UseFormReturn<NotifyDetailEditForm, any> = useForm({
        defaultValues: {
            title: get(data, 'notify.title', ''),
            description: get(data, 'notify.description', ''),
            content: get(data, 'notify.content', ''),
            assigned: get(data, 'notify.assigned', []),
        },
        resolver: yupResolver(schema),
    })

    const onsubmit = async (data: NotifyDetailEditForm) => {
        try {
            setSubmitLoading(true)

            if (data) {
                const { creates, updates, deletes } = data.assigned.reduce(
                    (acc, cur) => {
                        if (cur._id) {
                            if (cur.deleted) {
                                acc.deletes.push(cur._id)
                            } else if (!cur.sentMail && cur.user.allowSendMail && cur.user.sendMail && !cur.read) {
                                acc.updates.push(cur)
                            }
                        } else {
                            acc.creates.push(cur.user)
                        }
                        return acc
                    },
                    { creates: [], updates: [], deletes: [] } as {
                        deletes: string[]
                        creates: Array<IUserProfile & { sendMail?: boolean }>
                        updates: {
                            _id?: string
                            sentMail?: boolean
                            read: boolean
                            user?: IUserProfile & { sendMail?: boolean }
                        }[]
                    }
                )
                const refactoredData = {
                    title: data.title,
                    content: data.content,
                    description: data.description,
                    user: {
                        creates,
                        updates,
                        deletes,
                    },
                }
                await axios.put('/notification/assign/' + id, {
                    data: refactoredData,
                    url: import.meta.env.VITE_APP_URL,
                })
                refetch()
                navigate(-1)
                toast.success(t(LANGUAGE.NOTIFY_UPDATE_NOTIFY_SUCCESS))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    // const __users = form.watch('users')

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full w-full flex-col gap-3 md:gap-4'>
            <SubmitWrap hiddenBorder className='sm:rounded-xl sm:bg-white sm:shadow-sm sm:dark:bg-slate-800'>
                <Button color='blue' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.UPDATE)}
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
