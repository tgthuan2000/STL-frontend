/** NEED REFACTOR */
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty, isUndefined } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { IAddIncomeForm, MakeIncomeQueryData } from '~/@types/spending'
import { Button, FormWrap, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea, UploadImage } from '~/components/_base'
import { TAGS } from '~/constant'
import { useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useDocument, useQuery, useServiceQuery, useTracking } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_CATEGORY_SPENDING, GET_METHOD_SPENDING } from '~/schema/query/spending'
import { TRACKING_INCOME } from '~/schema/query/tracking'
import { useProfile } from '~/store/auth'

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            amount: yup
                .number()
                .required(t(LANGUAGE.REQUIRED_RECEIVE) as string)
                .min(1, t(LANGUAGE.RECEIVE_MIN_ZERO) as string)
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

const MakeIncome = () => {
    const { t } = useTranslation()
    const { close } = useSlideOver()
    const { userProfile } = useProfile()
    const { deleteCache } = useCache()
    const { getKindSpendingId } = useConfig()
    const { needCheckWhenLeave } = useCheck()
    const { loading, setSubmitLoading } = useLoading()
    const { METHOD_SPENDING_DESC_SURPLUS, RECENT_SPENDING, RECENT_SPENDING_PAGINATE, STATISTIC_SPENDING } =
        useServiceQuery()
    const document = useDocument()

    const kindSpendingId = useMemo(() => {
        return getKindSpendingId('RECEIVE')
    }, [])

    const [{ categorySpending, methodSpending }, fetchData, deleteCacheData, reloadData] =
        useQuery<MakeIncomeQueryData>(
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

    const schema = useSchema()
    const form = useForm<IAddIncomeForm>({
        defaultValues: {
            amount: '',
            categorySpending: null,
            methodSpending: null,
            date: new Date(),
            description: '',
            image: null,
        },
        resolver: yupResolver(schema),
    })

    const { tracking, value } = useTracking<IAddIncomeForm>(form, TRACKING_INCOME)

    const onsubmit: SubmitHandler<IAddIncomeForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodSpending, categorySpending, description, date, image } = data
        let imageId = null
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
                methodSpending: {
                    _type: 'reference',
                    _ref: methodSpending?._id,
                },
                categorySpending: {
                    _type: 'reference',
                    _ref: categorySpending?._id,
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
                .inc({ surplus: amount, countUsed: 1 })

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
            ])
            console.log(res)

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
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_RECEIVE_SUCCESS))
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleAddMoreCategorySpending = async (name: string) => {
        const categoryDoc = document.createCategory(name, kindSpendingId as string)
        try {
            const { _id, name } = await document.create(categoryDoc)
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

    const handleReloadData = async (keys: keyof MakeIncomeQueryData) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    return (
        <FormWrap
            onSubmit={form.handleSubmit(onsubmit)}
            renderButton={
                <SubmitWrap>
                    <Button color='green' type='submit' disabled={loading.submit}>
                        {t(LANGUAGE.SAVE)}
                    </Button>
                    <Button color='outline' type='button' onClick={close}>
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </SubmitWrap>
            }
        >
            <Input name='amount' form={form} tracking={tracking} type='number' label={t(LANGUAGE.RECEIVE)} />
            <AutoComplete
                name='categorySpending'
                form={form}
                tracking={tracking}
                data={categorySpending.data}
                label={t(LANGUAGE.CATEGORY)}
                loading={categorySpending.loading}
                addMore={handleAddMoreCategorySpending}
                onReload={isEmpty(categorySpending.data) ? undefined : () => handleReloadData('categorySpending')}
            />
            <AutoComplete
                name='methodSpending'
                tracking={tracking}
                form={form}
                data={methodSpending.data}
                label={t(LANGUAGE.METHOD_SPENDING)}
                loading={methodSpending.loading}
                addMore={handleAddMoreMethodSpending}
                onReload={isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')}
            />
            <DatePicker name='date' form={form} tracking={tracking} label={t(LANGUAGE.DATE)} />
            <TextArea name='description' form={form} tracking={tracking} label={t(LANGUAGE.NOTE)} />
            <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
        </FormWrap>
    )
}

export default MakeIncome
