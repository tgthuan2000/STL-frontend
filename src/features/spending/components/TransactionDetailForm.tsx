import { ArrowSmallLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { IDetailSpendingForm, TransactionDetailFormProps } from '~/@types/spending'
import { Button, FormWrap, IconButton, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea, UploadImage } from '~/components/_base'
import { KIND_SPENDING } from '~/constant/spending'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const useSchema = () => {
    const { t } = useTranslation()

    const schema = useMemo(() => {
        return yup.object().shape({
            amount: yup
                .number()
                .required(t(LANGUAGE.REQUIRED_FIELD) as string)
                .min(1, t(LANGUAGE.AMOUNT_MIN_ZERO) as string)
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

const TransactionDetailForm: React.FC<TransactionDetailFormProps> = ({ data }) => {
    const {
        onsubmit,
        categorySpending,
        handleAddMoreMethodSpending,
        handleAddMoreCategorySpending,
        handleDeleteTransaction,
        handleReloadData,
        handleReloadDataCategory,
        methodSpending,
        transaction,
    } = data
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { loading } = useLoading()
    const schema = useSchema()
    const form = useForm<IDetailSpendingForm>({
        defaultValues: {
            amount: transaction.amount,
            categorySpending: transaction.categorySpending,
            methodSpending: transaction.methodSpending,
            methodReference: transaction.methodReference,
            date: moment(transaction.date).toDate(),
            description: transaction.description,
            surplus: transaction.surplus ?? 0,
            image: transaction.image,
        },
        resolver: yupResolver(schema),
    })

    // const surplus = form.watch('surplus')

    return (
        <div>
            <div className='mb-4 flex items-center justify-between'>
                <div className='flex select-none items-center space-x-2 text-gray-900 dark:text-slate-200'>
                    <ArrowSmallLeftIcon
                        className='h-7 w-7 cursor-pointer hover:opacity-50'
                        onClick={() => {
                            navigate(-1)
                        }}
                    />
                    <h4 className='text-xl font-semibold xl:text-2xl'>{t(LANGUAGE.TRANSACTION_DETAIL)}</h4>
                </div>
                {[
                    KIND_SPENDING.COST,
                    KIND_SPENDING.RECEIVE,
                    KIND_SPENDING.TRANSFER_FROM,
                    KIND_SPENDING.TRANSFER_TO,
                ].includes(transaction.kindSpending.key) && (
                    <IconButton
                        onClick={() =>
                            window.confirm(t(LANGUAGE.CONFIRM_DELETE_TRANSACTION) as string) &&
                            handleDeleteTransaction()
                        }
                    >
                        <TrashIcon />
                    </IconButton>
                )}
            </div>
            <div className='rounded-xl bg-white py-2 shadow-lg dark:bg-slate-800 sm:py-6 lg:py-8'>
                <div className='mx-auto w-full max-w-lg'>
                    <FormWrap
                        onSubmit={!isEmpty(categorySpending.data) ? form.handleSubmit(onsubmit) : undefined}
                        renderButton={
                            !isEmpty(categorySpending.data) && (
                                <SubmitWrap>
                                    <Button color='blue' type='submit' disabled={loading.submit}>
                                        {t(LANGUAGE.UPDATE)}
                                    </Button>
                                    <Button
                                        color='outline'
                                        type='button'
                                        onClick={() => {
                                            navigate(-1)
                                        }}
                                    >
                                        {t(LANGUAGE.CANCEL)}
                                    </Button>
                                </SubmitWrap>
                            )
                        }
                    >
                        {/* {!isNil(surplus) &&
                            (() => {
                                const calc =
                                    ([KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO, KIND_SPENDING.CREDIT].includes(
                                        transaction.kindSpending.key
                                    )
                                        ? 1
                                        : -1) *
                                        Number(form.watch('amount')) +
                                    surplus
                                return (
                                    <div className='flex justify-between'>
                                        <h4 className='inline-block font-medium text-gray-900 dark:text-slate-200'>
                                            {t(LANGUAGE.SURPLUS_AT_TIME)}
                                        </h4>
                                        <div className='flex items-center space-x-2 font-normal'>
                                            <span className={clsx(...service.getColorPrize(calc))}>
                                                {numeral(calc).format()}
                                            </span>
                                            <span className='inline-block h-full w-px border border-gray-400 dark:border-slate-700' />
                                            <span className={clsx(...service.getColorPrize(surplus))}>
                                                {numeral(surplus).format()}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })()} */}

                        <Input name='amount' form={form} type='number' label={t(LANGUAGE.AMOUNT)} />

                        {!isEmpty(categorySpending.data) && (
                            <AutoComplete
                                name='categorySpending'
                                form={form}
                                data={categorySpending.data}
                                label={t(LANGUAGE.CATEGORY)}
                                loading={categorySpending.loading}
                                addMore={handleAddMoreCategorySpending}
                                onReload={
                                    isEmpty(categorySpending.data)
                                        ? undefined
                                        : () => handleReloadDataCategory('categorySpending')
                                }
                            />
                        )}

                        {transaction.methodSpending && (
                            <div
                                className={clsx(
                                    'flex gap-y-6',
                                    transaction.kindSpending.key === KIND_SPENDING.TRANSFER_TO
                                        ? 'flex-col-reverse'
                                        : 'flex-col'
                                )}
                            >
                                <AutoComplete
                                    name='methodSpending'
                                    form={form}
                                    data={methodSpending.data}
                                    label={
                                        transaction.methodReference
                                            ? transaction.kindSpending.key === KIND_SPENDING.TRANSFER_FROM
                                                ? t(LANGUAGE.FROM_METHOD_SPENDING)
                                                : t(LANGUAGE.TO_METHOD_SPENDING)
                                            : t(LANGUAGE.METHOD_SPENDING)
                                    }
                                    loading={methodSpending.loading}
                                    addMore={handleAddMoreMethodSpending}
                                    onReload={
                                        isEmpty(methodSpending.data)
                                            ? undefined
                                            : () => handleReloadData('methodSpending')
                                    }
                                    onChange={(item) => {
                                        if (transaction.methodSpending._id !== item._id) {
                                            form.setValue('surplus', item.surplus)
                                        } else {
                                            form.setValue('surplus', transaction.surplus)
                                        }
                                    }}
                                />

                                {transaction.methodReference && (
                                    <AutoComplete
                                        name='methodReference'
                                        form={form}
                                        data={methodSpending.data}
                                        label={
                                            transaction.kindSpending.key === KIND_SPENDING.TRANSFER_FROM
                                                ? t(LANGUAGE.TO_METHOD_SPENDING)
                                                : t(LANGUAGE.FROM_METHOD_SPENDING)
                                        }
                                        loading={methodSpending.loading}
                                        addMore={handleAddMoreMethodSpending}
                                        onReload={
                                            isEmpty(methodSpending.data)
                                                ? undefined
                                                : () => handleReloadData('methodSpending')
                                        }
                                    />
                                )}
                            </div>
                        )}

                        <DatePicker name='date' form={form} label={t(LANGUAGE.DATE)} />
                        <TextArea name='description' form={form} label={t(LANGUAGE.NOTE)} />
                        <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
                    </FormWrap>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailForm
