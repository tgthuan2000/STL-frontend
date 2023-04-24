import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { AdminNotifyData, AdminNotifyDataType } from '~/@types/notify'
import { TAGS } from '~/constant'
import { useLoading } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { GET_NOTIFY_ADMIN } from '~/schema/query/notify'
import LoadingText from '../../Loading/LoadingText'
import NotifyDetailEdit from './Edit'
import NotifyDetailView from './View'

interface Props {
    children: (data: AdminNotifyData, refetch: () => void) => React.ReactElement
}

const Admin = ({ children }: Props) => {
    const { t } = useTranslation()
    const { id } = useParams()
    const { setSubmitLoading } = useLoading()

    const [{ notify }, fetchData, deleteCache, reloadData] = useQuery<AdminNotifyData>(
        { notify: GET_NOTIFY_ADMIN },
        { notifyId: id as string },
        { notify: TAGS.SHORT }
    )

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [id])

    const refetch = () => {
        deleteCache('notify')
    }

    const data: AdminNotifyData = {
        notify: notify.data as AdminNotifyDataType,
    }

    if (notify.loading) return <LoadingText />

    if (!notify.data) return <div className='font-normal text-radical-red-500'>{t(LANGUAGE.ERROR)}</div>

    return <>{children(data, refetch)}</>
}

Admin.Edit = NotifyDetailEdit
Admin.View = NotifyDetailView

export default Admin
