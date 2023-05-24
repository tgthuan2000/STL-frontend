import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button, SlideFormWrap, SubmitWrap } from '~/components'
import { DatePicker, Input, UploadImage } from '~/components/_base'
import { useCache, useCheck, useLoading, useSlideOver } from '~/context'
import { useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { useProfile } from '~/store/auth'

interface Form {
    title: string
    amount: number | string
    duration: Date
    image?: File | null
}

const useSchema = () => {
    const { t } = useTranslation()

    const schema = useMemo(() => {
        return yup.object().shape({
            title: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
            amount: yup
                .number()
                .required(t(LANGUAGE.REQUIRED_AMOUNT) as string)
                .min(1, t(LANGUAGE.RECEIVE_MIN_ZERO) as string)
                .typeError(t(LANGUAGE.REQUIRED_NUMBER) as string),
            duration: yup
                .date()
                .required(t(LANGUAGE.REQUIRED_DATE) as string)
                .typeError(t(LANGUAGE.REQUIRED_DATE) as string),
            image: yup.mixed(),
        })
    }, [t])

    return schema
}

const MakeLongBudget = () => {
    const { t } = useTranslation()
    const { loading, setSubmitLoading } = useLoading()
    const { close } = useSlideOver()
    const schema = useSchema()
    const { userProfile } = useProfile()
    const { deleteCache } = useCache()
    const { LONG_BUDGET_SPENDING } = useServiceQuery()
    const { needCheckWhenLeave } = useCheck()

    const form = useForm<Form>({
        defaultValues: {
            title: '',
            amount: '',
            duration: new Date(),
            image: null,
        },
        resolver: yupResolver(schema),
    })

    const onsubmit: SubmitHandler<Form> = async (data) => {
        setSubmitLoading(true)
        let { amount, duration, title, image } = data
        let imageId = null
        amount = Number(amount)
        try {
            if (image) {
                const response = await client.assets.upload('image', image)
                imageId = response._id
            }

            const document = {
                _type: 'longBudget',
                title,
                amount,
                duration: moment(duration).format(),
                user: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
                ...(imageId && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } }),
            }

            await client.create(document)

            deleteCache([LONG_BUDGET_SPENDING])
            form.reset({ amount: '', title: '', image: null }, { keepDefaultValues: true })
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_LONG_BUDGET_SUCCESS))
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <SlideFormWrap
            onSubmit={form.handleSubmit(onsubmit)}
            buttonZone={
                <SubmitWrap>
                    <Button color='purple' type='submit' disabled={loading.submit}>
                        {t(LANGUAGE.SAVE)}
                    </Button>
                    <Button color='outline' type='button' onClick={close}>
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </SubmitWrap>
            }
        >
            <Input name='title' form={form} type='text' label={t(LANGUAGE.TITLE)} />
            <Input name='amount' form={form} type='number' label={t(LANGUAGE.AMOUNT)} />
            <DatePicker name='duration' form={form} label={t(LANGUAGE.DURATION)} />
            <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
        </SlideFormWrap>
    )
}
export default MakeLongBudget
