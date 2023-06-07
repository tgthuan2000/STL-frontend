import { yupResolver } from '@hookform/resolvers/yup'
import { SanityAssetDocument } from '@sanity/client'
import { get } from 'lodash'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button } from '~/components'
import { Input, UploadImage } from '~/components/_base'
import { useCheck, useDetailDialog, useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { Member } from '../pages/MemberDetail'

interface Props {
    clearCache: () => void
    data: Member
}

interface Form {
    userName: string
    image: File | SanityAssetDocument
}

const useSchema = () => {
    const { t } = useTranslation()

    const schema = useMemo(() => {
        return yup.object().shape({
            userName: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
        })
    }, [t])

    return schema
}

const EditDialog: React.FC<Props> = (props) => {
    const { clearCache, data } = props
    const { t } = useTranslation()
    const { loading, setSubmitLoading } = useLoading()
    const { close } = useDetailDialog()
    const { needCheckWhenLeave } = useCheck()
    const schema = useSchema()

    const form = useForm<Form>({
        defaultValues: {
            userName: data.userName,
            image: data.image,
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (formData: Form) => {
        try {
            setSubmitLoading(true)

            let { image, userName } = formData
            userName = userName.trim()
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
                userName,
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

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex h-full flex-col gap-2'>
            <div className='flex flex-1 flex-col gap-4 px-6 pb-6 pt-4'>
                <Input form={form} type='text' name='userName' label={t(LANGUAGE.FULL_NAME)} />
                <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
            </div>
            <div className='flex justify-end gap-2 px-6 pb-6 pt-4'>
                <Button type='submit' color='cyan' disabled={loading.submit}>
                    {t(LANGUAGE.UPDATE)}
                </Button>
            </div>
        </form>
    )
}

export default EditDialog
