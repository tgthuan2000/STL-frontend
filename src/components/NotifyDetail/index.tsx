import { SanityDocument } from '@sanity/client'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { NotifyDetailQueryData, NotifyItem } from '~/@types/notify'
import { TAGS } from '~/constant'
import { TEMPLATE } from '~/constant/template'
import { useLoading } from '~/context'
import { useQuery } from '~/hook'
import { GET_NOTIFY_ADMIN, GET_NOTIFY_BY_USER } from '~/schema/query/notify'
import useAuth from '~/store/auth'
import NotifyDetailForm, { DetailFormData } from './Form'

interface NotifyDetailProps {
    isAdmin?: boolean
}

const NotifyDetail: React.FC<NotifyDetailProps> = ({ isAdmin = false }) => {
    const { id } = useParams()
    const { userProfile } = useAuth()
    const { setSubmitLoading } = useLoading()

    const [{ notify }, fetchData] = useQuery<NotifyDetailQueryData>(
        { notify: isAdmin ? GET_NOTIFY_ADMIN : GET_NOTIFY_BY_USER },
        { notifyId: id as string, ...(isAdmin && { userId: userProfile?._id as string }) },
        { notify: TAGS.ALTERNATE }
    )

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().then(() => {
            setSubmitLoading(false)
        })
    }, [id])

    const data: DetailFormData = {
        notify: notify.data as SanityDocument<NotifyItem>,
    }

    if (notify.loading) return <div>{TEMPLATE.LOADING}</div>

    if (!notify.data) return <div className='text-radical-red-500 font-normal'>{TEMPLATE.ERROR}</div>

    return <NotifyDetailForm data={data} />
}

export default NotifyDetail
