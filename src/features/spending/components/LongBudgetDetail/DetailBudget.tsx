import { yupResolver } from '@hookform/resolvers/yup'
import { SanityImageAssetDocument } from '@sanity/client'
import { get } from 'lodash'
import moment from 'moment'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button } from '~/components'
import { DatePicker, Input, UploadImage } from '~/components/_base'
import { useCache, useCheck, useDetailDialog, useLoading } from '~/context'
import { useAxios, useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { LongBudgetDetail } from '../../hook/useLongBudgetDetail'

interface Props {
    data: LongBudgetDetail
    clearCache(): void
}

interface Form {
    title: string
    amount: number
    duration: Date
    image: SanityImageAssetDocument | File
}

const useSchema = () => {
    const { t } = useTranslation()

    const schema = useMemo(() => {
        return yup.object().shape({
            amount: yup
                .number()
                .required(t(LANGUAGE.REQUIRED_AMOUNT) as string)
                .min(1, t(LANGUAGE.AMOUNT_MIN_ZERO) as string)
                .typeError(t(LANGUAGE.REQUIRED_NUMBER) as string),
        })
    }, [t])

    return schema
}

const DetailBudget: React.FC<Props> = (props) => {
    const { clearCache, data } = props
    const { _id, amount, duration, image, title } = data
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { deleteCache } = useCache()
    const { close } = useDetailDialog()
    const { needCheckWhenLeave } = useCheck()
    const { loading, setSubmitLoading } = useLoading()
    const { LONG_BUDGET_SPENDING } = useServiceQuery()
    const schema = useSchema()
    const axios = useAxios()

    const form = useForm<Form>({
        defaultValues: {
            title,
            amount,
            duration: moment(duration).toDate(),
            image,
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (formData: Form) => {
        try {
            setSubmitLoading(true)

            let { title, amount, duration, image } = formData
            title = title.trim()
            amount = Number(amount)

            let imageId = undefined
            if (image) {
                if (!get(image, 'asset._ref')) {
                    const fileImage = await client.assets.upload('image', image as File)
                    imageId = fileImage._id
                }
            } else {
                imageId = null
            }

            const transaction = client.transaction()

            const patch = client.patch(data._id).set({
                title,
                amount,
                duration: moment(duration).format(),
                ...(imageId && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } }),
            })

            if (imageId === null) {
                patch.unset(['image'])
            }

            transaction.patch(patch)
            await transaction.commit()
            toast.success<string>(t(LANGUAGE.NOTIFY_UPDATE_SUCCESS))
            onClose()
        } catch (error) {
            console.log(error)
            toast.error<string>(t(LANGUAGE.NOTIFY_ERROR))
        } finally {
            setSubmitLoading(false)
        }
    }

    const onClose = () => {
        needCheckWhenLeave()
        clearCache()
        close()
    }

    const handleDelete = async () => {
        if (!window.confirm(t(LANGUAGE.CONFIRM_DELETE_LONG_BUDGET) as string)) {
            return
        }
        try {
            setSubmitLoading(true)
            await axios.delete('/spending/long-budget', { data: { id: data._id } })
            toast.success<string>(t(LANGUAGE.NOTIFY_DELETE_SUCCESS))
            deleteCache([LONG_BUDGET_SPENDING])
            onClose()
            navigate('/spending', { replace: true })
        } catch (error) {
            console.log(error)
            toast.error<string>(t(LANGUAGE.NOTIFY_ERROR))
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex h-full flex-col gap-2'>
            <div className='flex flex-1 flex-col gap-4 px-6 pb-6 pt-4'>
                <Input name='title' form={form} type='text' label={t(LANGUAGE.TITLE)} />
                <Input name='amount' form={form} type='number' label={t(LANGUAGE.AMOUNT)} />
                <DatePicker name='duration' form={form} label={t(LANGUAGE.DURATION)} />
                <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
            </div>
            <div className='flex justify-end gap-2 px-6 pb-6 pt-4'>
                <Button type='button' color='outline-radicalRed' onClick={handleDelete} disabled={loading.submit}>
                    {t(LANGUAGE.DELETE)}
                </Button>
                <Button type='submit' color='pink' disabled={loading.submit}>
                    {t(LANGUAGE.UPDATE)}
                </Button>
            </div>
        </form>
    )
}

export default DetailBudget
