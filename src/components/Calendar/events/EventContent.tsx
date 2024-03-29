import clsx from 'clsx'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import AnimateWrap from '~/components/AnimateWrap'
import Button from '~/components/Button'
import Image from '~/components/Image'
import LoadingIcon from '~/components/Loading/LoadingIcon'
import Prose from '~/components/Prose'
import { useCheck, useDetailDialog, useFilePreview, useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client, urlFor } from '~/sanityConfig'
import { useCalendarDetail } from '../services/events'
import { toast } from 'react-toastify'

interface Props {
    id: string
}

const EventContent: React.FC<Props> = (props) => {
    const { id } = props
    const { t } = useTranslation()
    const {
        calendar: { data, loading },
    } = useCalendarDetail(id)

    return (
        <AnimateWrap className='h-full text-gray-900 dark:text-slate-200'>
            {loading ? (
                <div className='mb-6 flex justify-center'>
                    <LoadingIcon />
                </div>
            ) : !data ? (
                <span className='px-6 pb-6 text-red-500'>{t(LANGUAGE.EMPTY_DATA)}</span>
            ) : (
                <Content id={id} description={data.description} image={urlFor(data.image)} />
            )}
        </AnimateWrap>
    )
}

interface ContentProp {
    id: string
    description?: string
    image?: string
}

const Content: React.FC<ContentProp> = (props) => {
    const { id, description, image } = props
    const navigate = useNavigate()
    const preview = useFilePreview()
    const { t } = useTranslation()
    const { close } = useDetailDialog()
    const { setSubmitLoading } = useLoading()
    const { needCheckWhenLeave } = useCheck()

    const handleEdit = () => {
        close()
        navigate(`/time/${id}/edit`)
    }

    const handleDelete = async () => {
        const isConfirmed = window.confirm(t(LANGUAGE.CONFIRM_DELETE_SCHEDULE) as string)
        if (!isConfirmed) return
        try {
            setSubmitLoading(true)
            await client.delete(id)
            needCheckWhenLeave()
            close()
            toast.success(t(LANGUAGE.NOTIFY_DELETE_SCHEDULE_SUCCESSFULLY))
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <div className='flex h-full flex-col gap-2'>
            {description && <Prose className='px-6'>{description}</Prose>}
            <div className='flex-1 overflow-hidden'>
                <Image
                    src={image}
                    fallback={<>#{t(LANGUAGE.NO_IMAGE)}</>}
                    className={(error) =>
                        clsx(
                            'flex items-center justify-center object-contain',
                            {
                                'h-full w-full flex-1 cursor-pointer bg-gray-700 transition hover:opacity-90 dark:bg-slate-700':
                                    !error,
                            },
                            { 'mx-6 h-40 w-40 rounded-xl border dark:border-slate-700': error }
                        )
                    }
                    onClick={() => preview({ type: 'image', file: image })}
                />
            </div>
            <div className='flex justify-end gap-2 px-6 pb-6 pt-4'>
                <Button type='button' color='outline-radicalRed' onClick={handleDelete}>
                    {t(LANGUAGE.DELETE)}
                </Button>
                <Button type='button' color='indigo' onClick={handleEdit}>
                    {t(LANGUAGE.UPDATE)}
                </Button>
            </div>
        </div>
    )
}

export default EventContent
