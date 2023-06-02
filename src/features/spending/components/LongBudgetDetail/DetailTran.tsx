import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { IMethodSpending } from '~/@types/spending'
import { Button } from '~/components'
import { AutoComplete, Input, TextArea } from '~/components/_base'
import { TAGS } from '~/constant'
import { useCheck, useDetailDialog, useLoading } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'
import { LongBudgetDetailItem } from '../../hook/useLongBudgetDetail'

interface Props {
    data?: LongBudgetDetailItem
    clearCache(): void
    budgetId?: string
}

interface Form {
    amount: number | string
    method: { _id: string; name: string } | null
    description: string
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
            method: yup
                .object()
                .nullable()
                .required(t(LANGUAGE.REQUIRED_METHOD) as string),
            description: yup.string().nullable(),
        })
    }, [t])

    return schema
}

const DetailTran: React.FC<Props> = (props) => {
    const { data, budgetId, clearCache } = props
    const { t } = useTranslation()
    const { loading, setSubmitLoading } = useLoading()
    const { close } = useDetailDialog()
    const { needCheckWhenLeave } = useCheck()
    const { userProfile } = useProfile()
    const schema = useSchema()
    const isEditMode = !!data

    const [{ methodSpending }, fetchData, deleteCache, reload] = useQuery<{ methodSpending: IMethodSpending[] }>(
        { methodSpending: GET_METHOD_SPENDING },
        { userId: userProfile?._id as string },
        { methodSpending: TAGS.ENUM }
    )

    const handleReload = () => {
        deleteCache('methodSpending')
        reload()
    }

    useEffect(() => {
        fetchData()
    }, [])

    const form = useForm<Form>({
        defaultValues: {
            amount: data?.amount ?? '',
            description: data?.description ?? '',
            method: data?.method ?? null,
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = async (formData: Form) => {
        try {
            setSubmitLoading(true)

            let { amount, description, method } = formData
            description = description.trim()
            amount = Number(amount)

            const transaction = client.transaction()
            if (data) {
                /** UPDATE */
                transaction.patch(data._id, {
                    set: {
                        amount,
                        description,
                        method: {
                            _type: 'reference',
                            _ref: method?._id,
                        },
                    },
                })
            } else {
                /** CREATE */
                if (budgetId) {
                    transaction.create({
                        _type: 'longBudgetItem',
                        amount,
                        description,
                        method: {
                            _type: 'reference',
                            _ref: method?._id,
                        },
                        budget: {
                            _type: 'reference',
                            _ref: budgetId,
                        },
                    })
                } else {
                    throw new Error('Need `budgetId` props')
                }
            }

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

    const handleDelete = async () => {
        if (!data || !window.confirm(t(LANGUAGE.CONFIRM_DELETE_TRANSACTION) as string)) {
            return
        }

        try {
            setSubmitLoading(true)
            await client.delete(data._id)
            toast.success<string>(t(LANGUAGE.NOTIFY_DELETE_SUCCESS))
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
                <Input form={form} type='number' name='amount' label={t(LANGUAGE.AMOUNT)} />
                <AutoComplete
                    form={form}
                    name='method'
                    label={t(LANGUAGE.METHOD)}
                    data={methodSpending.data}
                    loading={methodSpending.loading}
                    onReload={handleReload}
                />
                <TextArea form={form} name='description' label={t(LANGUAGE.SHORT_DESCRIPTION)} />
            </div>
            <div className='flex justify-end gap-2 px-6 pb-6 pt-4'>
                {isEditMode && (
                    <Button type='button' color='outline-radicalRed' onClick={handleDelete} disabled={loading.submit}>
                        {t(LANGUAGE.DELETE)}
                    </Button>
                )}
                <Button type='submit' color='pink' disabled={loading.submit}>
                    {t(isEditMode ? LANGUAGE.UPDATE : LANGUAGE.CREATE)}
                </Button>
            </div>
        </form>
    )
}

export default DetailTran
