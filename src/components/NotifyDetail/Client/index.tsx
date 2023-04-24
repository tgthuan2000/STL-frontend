import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ClientNotifyData, ClientNotifyDataType } from '~/@types/notify'
import { TAGS } from '~/constant'
import { useLoading, useNotify } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { GET_NOTIFY_BY_USER } from '~/schema/query/notify'
import { useProfile } from '~/store/auth'
import LoadingText from '../../Loading/LoadingText'
import NotifyDetailView from './View'

interface Props {
    children: (data: ClientNotifyData) => React.ReactElement
}

const Client = ({ children }: Props) => {
    const { t } = useTranslation()
    const { id } = useParams()
    const { userProfile } = useProfile()
    const { setSubmitLoading } = useLoading()
    const { readDetail } = useNotify()

    const [{ notify }, fetchData] = useQuery<ClientNotifyData>(
        { notify: GET_NOTIFY_BY_USER },
        { notifyId: id as string, userId: userProfile?._id as string },
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

    const data: ClientNotifyData = {
        notify: notify.data as ClientNotifyDataType,
    }

    if (notify.loading) return <LoadingText />

    if (!notify.data) return <div className='font-normal text-radical-red-500'>{t(LANGUAGE.ERROR)}</div>

    return <>{children(data)}</>
}

Client.View = NotifyDetailView

export default Client
