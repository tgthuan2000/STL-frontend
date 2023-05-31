import { isEmpty, isUndefined } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { IAddCostForm, MakeCostQueryData } from '~/@types/spending'
import { Button, FormWrap, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea, UploadImage } from '~/components/_base'
import { TAGS } from '~/constant'
import { useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useDocument, useQuery, useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_CATEGORY_SPENDING, GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            amount: yup
                .number()
                .required(t(LANGUAGE.REQUIRED_COST) as string)
                .min(1, t(LANGUAGE.COST_MIN_ZERO) as string)
                .typeError(t(LANGUAGE.REQUIRED_NUMBER) as string),
            categorySpending: yup
                .object()
                .nullable()
                .required(t(LANGUAGE.REQUIRED_CATEGORY) as string),
            methodSpending: yup
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

const MakeCost = () => {
    const { t } = useTranslation()
    const { close } = useSlideOver()
    const { userProfile } = useProfile()
    const { deleteCache } = useCache()
    const { loading, setSubmitLoading } = useLoading()
    const { getKindSpendingId } = useConfig()
    const { needCheckWhenLeave } = useCheck()
    const {
        METHOD_SPENDING_DESC_SURPLUS,
        RECENT_SPENDING,
        RECENT_SPENDING_PAGINATE,
        STATISTIC_SPENDING,
        BUDGET_SPENDING,
    } = useServiceQuery()
    const document = useDocument()
    const schema = useSchema()
    const kindSpendingId = useMemo(() => {
        return getKindSpendingId('COST')
    }, [getKindSpendingId])

    const [{ categorySpending, methodSpending }, fetchData, deleteCacheData, reloadData] = useQuery<MakeCostQueryData>(
        {
            methodSpending: GET_METHOD_SPENDING,
            categorySpending: GET_CATEGORY_SPENDING,
        },
        {
            userId: userProfile?._id as string,
            kindSpending: kindSpendingId as string,
        },
        {
            categorySpending: TAGS.ENUM,
            methodSpending: TAGS.ENUM,
        }
    )

    useEffect(() => {
        if (!isUndefined(kindSpendingId)) {
            fetchData()
        }
    }, [kindSpendingId])

    const form = useForm<IAddCostForm>({
        defaultValues: {
            amount: '',
            categorySpending: null,
            methodSpending: null,
            description: '',
            date: new Date(),
            image: null,
        },
        resolver: yupResolver(schema),
    })

    const onsubmit: SubmitHandler<IAddCostForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodSpending, categorySpending, description, date, image } = data
        let imageId = null
        // transfer amount to number
        amount = Number(amount)
        description = description.trim()

        try {
            if (image) {
                const response = await client.assets.upload('image', image)
                imageId = response._id
            }

            // add to database
            const document = {
                _type: 'spending',
                amount,
                description,
                date: moment(date).format(),
                surplus: methodSpending?.surplus,
                kindSpending: {
                    _type: 'reference',
                    _ref: kindSpendingId,
                },
                categorySpending: {
                    _type: 'reference',
                    _ref: categorySpending?._id,
                },
                methodSpending: {
                    _type: 'reference',
                    _ref: methodSpending?._id,
                },
                user: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
                ...(imageId && { image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } }),
            }

            const patchMethod = client
                .patch(methodSpending?._id as string)
                .setIfMissing({ surplus: 0, countUsed: 0 })
                .dec({ surplus: amount })
                .inc({ countUsed: 1 })

            const patchCategory = client
                .patch(categorySpending?._id as string)
                .setIfMissing({ countUsed: 0 })
                .inc({ countUsed: 1 })

            await client.transaction().create(document).patch(patchMethod).patch(patchCategory).commit()
            // navigate to dashboard
            let res: string | null = deleteCache([
                METHOD_SPENDING_DESC_SURPLUS,
                RECENT_SPENDING,
                RECENT_SPENDING_PAGINATE,
                STATISTIC_SPENDING,
                BUDGET_SPENDING,
            ])

            setTimeout(() => {
                res = deleteCacheData('methodSpending', 'categorySpending')
                console.log(res)

                reloadData()
            }, 0)

            form.reset(
                {
                    amount: '',
                    categorySpending,
                    methodSpending,
                    image: null,
                },
                {
                    keepDefaultValues: true,
                }
            )
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_COST_SUCCESS))
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleAddMoreCategorySpending = async (name: string) => {
        const categoryDocument = document.createCategory(name, kindSpendingId as string)

        try {
            const { _id, name } = await document.create(categoryDocument)
            const res = deleteCacheData('categorySpending')
            console.log(res)
            reloadData()
            return { _id, name }
        } catch (error) {
            console.log(error)
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

    const handleReloadData = async (keys: keyof MakeCostQueryData) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    return (
        <FormWrap
            onSubmit={form.handleSubmit(onsubmit)}
            renderButton={
                <SubmitWrap>
                    <Button color='radicalRed' type='submit' disabled={loading.submit}>
                        {t(LANGUAGE.SAVE)}
                    </Button>
                    <Button color='outline' type='button' onClick={close}>
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </SubmitWrap>
            }
        >
            <Input name='amount' form={form} type='number' label={t(LANGUAGE.COST)} />
            <AutoComplete
                name='categorySpending'
                form={form}
                data={categorySpending.data}
                label={t(LANGUAGE.CATEGORY)}
                loading={categorySpending.loading}
                addMore={handleAddMoreCategorySpending}
                onReload={isEmpty(categorySpending.data) ? undefined : () => handleReloadData('categorySpending')}
            />
            <AutoComplete
                name='methodSpending'
                form={form}
                data={methodSpending.data}
                label={t(LANGUAGE.METHOD_SPENDING)}
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

export default MakeCost
