import { SanityDocument } from '@sanity/client'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NotifyDetailAdminFormData } from '~/@types/components'
import { NotifyAdminItem, NotifyDetailAdminQueryData } from '~/@types/notify'
import { TAGS } from '~/constant'
import { useLoading } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { GET_NOTIFY_ADMIN } from '~/schema/query/notify'
import LoadingText from '../Loading/LoadingText'

interface Props {
    children: (data: NotifyDetailAdminFormData) => React.ReactElement
}

const Admin: React.FC<Props> = ({ children }) => {
    const { t } = useTranslation()
    const { id } = useParams()
    const { setSubmitLoading } = useLoading()

    const [{ notify }, fetchData] = useQuery<NotifyDetailAdminQueryData>(
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

    const data: NotifyDetailAdminFormData = {
        notify: notify.data as SanityDocument<NotifyAdminItem>,
    }

    if (notify.loading) return <LoadingText />

    if (!notify.data) return <div className='font-normal text-radical-red-500'>{t(LANGUAGE.ERROR)}</div>

    return <>{children(data)}</>
}

export default Admin
