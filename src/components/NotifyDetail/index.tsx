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
import { useProfile } from '~/store/auth'
import LoadingText from '../Loading/LoadingText'
import NotifyDetailEdit from './Edit'
import NotifyDetailView from './View'

interface NotifyDetailProps {
    isAdmin?: boolean
    children: (data: NotifyDetailFormData) => React.ReactElement
}

const NotifyDetail = ({ isAdmin = false, children }: NotifyDetailProps) => {
    const { t } = useTranslation()
    const { id } = useParams()
    const { userProfile } = useProfile()
    const { setSubmitLoading } = useLoading()
    const { readDetail } = useNotify()

    const [{ notify }, fetchData] = useQuery<NotifyDetailQueryData>(
        { notify: isAdmin ? GET_NOTIFY_ADMIN : GET_NOTIFY_BY_USER },
        { notifyId: id as string, ...(!isAdmin && { userId: userProfile?._id as string }) },
        { notify: TAGS.SHORT }
    )
    console.log(notify)
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

    if (notify.loading) return <LoadingText />

    if (!notify.data) return <div className='font-normal text-radical-red-500'>{t(LANGUAGE.ERROR)}</div>

    return <>{children(data)}</>
}

NotifyDetail.View = NotifyDetailView
NotifyDetail.Edit = NotifyDetailEdit

export default NotifyDetail
