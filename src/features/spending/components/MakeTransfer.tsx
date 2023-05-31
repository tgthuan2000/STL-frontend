import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { IMakeTransferForm, MakeTransferQueryData } from '~/@types/spending'
import { Button, FormWrap, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea, UploadImage } from '~/components/_base'
import { TAGS } from '~/constant'
import { useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useDocument, useQuery, useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            amount: yup
                .number()
                .required(t(LANGUAGE.REQUIRED_TRANSFER_AMOUNT) as string)
                .min(1, t(LANGUAGE.TRANSFER_MIN_ZERO) as string)
                .typeError(t(LANGUAGE.REQUIRED_NUMBER) as string),
            methodSpendingFrom: yup
                .object()
                .nullable()
                .required(t(LANGUAGE.REQUIRED_METHOD) as string),
            methodSpendingTo: yup
                .object()
                .nullable()
                .required(t(LANGUAGE.REQUIRED_METHOD) as string),
            date: yup
                .date()
                .required(t(LANGUAGE.REQUIRED_DATE) as string)
                .typeError(t(LANGUAGE.REQUIRED_DATE) as string),
            description: yup.string(),
            image: yup.mixed(),
        })
    }, [t])
    return schema
}

const MakeTransfer = () => {
    const { t } = useTranslation()
    const { close } = useSlideOver()
    const { userProfile } = useProfile()
    const { deleteCache } = useCache()
    const { loading, setSubmitLoading } = useLoading()
    const { getKindSpendingId } = useConfig()
    const { needCheckWhenLeave } = useCheck()
    const { METHOD_SPENDING_DESC_SURPLUS, RECENT_SPENDING, RECENT_SPENDING_PAGINATE } = useServiceQuery()
    const document = useDocument()
    const schema = useSchema()
    const [{ methodSpending }, fetchData, deleteCacheData, reloadData] = useQuery<MakeTransferQueryData>(
        { methodSpending: GET_METHOD_SPENDING },
        { userId: userProfile?._id as string },
        { methodSpending: TAGS.ENUM }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const form = useForm<IMakeTransferForm>({
        defaultValues: {
            amount: '',
            methodSpendingFrom: null,
            methodSpendingTo: null,
            date: new Date(),
            description: '',
            image: null,
        },
        resolver: yupResolver(schema),
    })

    const onsubmit: SubmitHandler<IMakeTransferForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodSpendingFrom, methodSpendingTo, description, date, image } = data
        let imageId = null
        amount = Number(amount)
        description = description.trim()

        try {
            if (image) {
                const imageFile = await client.assets.upload('image', image)
                imageId = imageFile._id
            }
            // add to database
            const document1 = {
                _type: 'spending',
                amount,
                description: `Đến ${methodSpendingTo?.name}${description ? `\n${description}` : ''}`,
                date: moment(date).format(),
                surplus: methodSpendingFrom?.surplus,
                kindSpending: {
                    _type: 'reference',
                    _ref: getKindSpendingId('TRANSFER_FROM'),
                },
                methodSpending: {
                    _type: 'reference',
                    _ref: methodSpendingFrom?._id,
                },
                methodReference: {
                    _type: 'reference',
                    _ref: methodSpendingTo?._id,
                },
                user: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
                ...(imageId && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } }),
            }

            const document2 = {
                _type: 'spending',
                amount,
                description: `Từ ${methodSpendingFrom?.name}${description ? `\n${description}` : ''}`,
                date: moment(date).format(),
                surplus: methodSpendingTo?.surplus,
                kindSpending: {
                    _type: 'reference',
                    _ref: getKindSpendingId('TRANSFER_TO'),
                },
                methodSpending: {
                    _type: 'reference',
                    _ref: methodSpendingTo?._id,
                },
                methodReference: {
                    _type: 'reference',
                    _ref: methodSpendingFrom?._id,
                },
                user: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
                ...(imageId && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } }),
            }
            const patch1 = client
                .patch(methodSpendingFrom?._id as string)
                .setIfMissing({ surplus: 0, countUsed: 0 })
                .dec({ surplus: amount })
                .inc({ countUsed: 1 })

            const patch2 = client
                .patch(methodSpendingTo?._id as string)
                .setIfMissing({ surplus: 0, countUsed: 0 })
                .inc({ surplus: amount, countUsed: 1 })

            await client.transaction().create(document1).patch(patch1).create(document2).patch(patch2).commit()

            let res: string | null = deleteCache([
                METHOD_SPENDING_DESC_SURPLUS,
                RECENT_SPENDING,
                RECENT_SPENDING_PAGINATE,
            ])
            console.log(res)

            setTimeout(() => {
                res = deleteCacheData('methodSpending')
                console.log(res)

                reloadData()
            }, 0)

            form.reset({ amount: '', methodSpendingFrom, methodSpendingTo, image: null }, { keepDefaultValues: true })
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_TRANSFER_SUCCESS))
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleAddMoreMethodSpending = async (name: string) => {
        const methodDoc = document.createMethod(name)
        try {
            const { _id, name } = await document.create(methodDoc)
            const res = deleteCacheData('methodSpending')
            console.log(res)
            reloadData()
            return { _id, name }
        } catch (error) {
            console.log(error)
        }
    }

    const handleReloadData = async (keys: keyof MakeTransferQueryData) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    return (
        <FormWrap
            onSubmit={form.handleSubmit(onsubmit)}
            renderButton={
                <SubmitWrap>
                    <Button color='blue' type='submit' disabled={loading.submit}>
                        {t(LANGUAGE.TRANSFER)}
                    </Button>
                    <Button color='outline' type='button' onClick={close}>
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </SubmitWrap>
            }
        >
            <Input name='amount' form={form} type='number' label={t(LANGUAGE.AMOUNT)} />
            <AutoComplete
                name='methodSpendingFrom'
                form={form}
                data={methodSpending.data}
                label={t(LANGUAGE.FROM_TRANSFER_METHOD)}
                loading={methodSpending.loading}
                addMore={handleAddMoreMethodSpending}
                onReload={isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')}
            />
            <AutoComplete
                name='methodSpendingTo'
                form={form}
                data={methodSpending.data}
                label={t(LANGUAGE.TO_TRANSFER_METHOD)}
                loading={methodSpending.loading}
                addMore={handleAddMoreMethodSpending}
                onReload={isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')}
            />
            <DatePicker name='date' form={form} label={t(LANGUAGE.DATE)} />
            <TextArea name='description' form={form} label={t(LANGUAGE.NOTE)} />
            <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
        </FormWrap>
    )
}

export default MakeTransfer
