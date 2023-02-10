import { SanityDocument } from '@sanity/client'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NotifyDetailFormData } from '~/@types/components'
import { NotifyDetailQueryData, NotifyItem } from '~/@types/notify'
import { TAGS } from '~/constant'
import { useLoading, useNotify } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { GET_NOTIFY_ADMIN, GET_NOTIFY_BY_USER } from '~/schema/query/notify'
import useAuth from '~/store/auth'
import NotifyDetailForm from './Form'

interface NotifyDetailProps {
    isAdmin?: boolean
}

const NotifyDetail: React.FC<NotifyDetailProps> = ({ isAdmin = false }) => {
    const { t } = useTranslation()
    const { id } = useParams()
    const { userProfile } = useAuth()
    const { setSubmitLoading } = useLoading()
    const { readDetail } = useNotify()

    const [{ notify }, fetchData] = useQuery<NotifyDetailQueryData>(
        { notify: isAdmin ? GET_NOTIFY_ADMIN : GET_NOTIFY_BY_USER },
        { notifyId: id as string, ...(!isAdmin && { userId: userProfile?._id as string }) },
        { notify: TAGS.SHORT }
    )

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [id])

    useEffect(() => {
        return () => {
            const readDetailNotify = async () => {
                if (notify.data) {
                    return await readDetail(notify.data)
                }
            }
            readDetailNotify()
        }
    }, [notify.data, readDetail])

    const data: NotifyDetailFormData = {
        notify: notify.data as SanityDocument<NotifyItem>,
    }

    if (notify.loading) return <div className='text-gray-900 dark:text-slate-200'>{t(LANGUAGE.LOADING)}</div>

    if (!notify.data) return <div className='text-radical-red-500 font-normal'>{t(LANGUAGE.ERROR)}</div>

    return <NotifyDetailForm data={data} />
}

export default NotifyDetail
