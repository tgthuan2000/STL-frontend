import { get } from 'lodash'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCalendarDetail } from '~/components/Calendar/services/events'
import LoadingText from '~/components/Loading/LoadingText'
import { useCheck, useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { useProfile } from '~/store/auth'
import EditForm, { EditUseForm } from '../components/EditForm'

const Edit = () => {
    const { id } = useParams()
    const { t } = useTranslation()
    const { needCheckWhenLeave } = useCheck()
    const navigate = useNavigate()
    const { setSubmitLoading } = useLoading()
    const { userProfile } = useProfile()
    const {
        calendar: { data, loading },
        clearCache,
        reload,
    } = useCalendarDetail(id)

    const handleSubmit = async (values: EditUseForm) => {
        try {
            setSubmitLoading(true)
            let { _id, bgColor, endDate, loop, startDate, textColor, title, description, image } = values
            title = title.trim()

            let imageId = undefined
            if (image) {
                if (!get(image, 'asset._ref')) {
                    const fileImage = await client.assets.upload('image', image as any)
                    imageId = fileImage._id
                }
            } else {
                imageId = null
            }

            const patch = client.patch(_id, {
                set: {
                    title,
                    description,
                    startDate: moment(startDate).format(),
                    endDate: moment(endDate).format(),
                    loop: {
                        _type: 'reference',
                        _ref: loop?._id,
                    },
                    textColor,
                    bgColor,
                    user: {
                        _type: 'reference',
                        _ref: userProfile?._id,
                    },
                    ...(imageId && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } }),
                },
            })

            if (imageId === null) {
                patch.unset(['image'])
            }

            await patch.commit()

            clearCache()
            toast.success<string>(t(LANGUAGE.NOTIFY_UPDATE_SCHEDULE_SUCCESSFULLY))
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleDelete = async () => {
        const isConfirmed = window.confirm(t(LANGUAGE.CONFIRM_DELETE_SCHEDULE) as string)
        if (!isConfirmed) return
        try {
            setSubmitLoading(true)
            if (!id) return
            await client.delete(id)
            toast.success(t(LANGUAGE.NOTIFY_DELETE_SCHEDULE_SUCCESSFULLY))
            clearCache()
            navigate(-1)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    if (loading) return <LoadingText />

    if (!data) return <span className='text-red-500'>{t(LANGUAGE.EMPTY_DATA)}</span>

    return <EditForm data={data} onDelete={handleDelete} onSubmit={handleSubmit} />
}

export default Edit
