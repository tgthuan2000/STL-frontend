import { ArrowSmallLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { TransactionEditFormProps } from '~/@types/loan'
import { Button, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea, UploadImage } from '~/components/_base'
import { KIND_SPENDING } from '~/constant/spending'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { service } from '~/services'
import IconButton from './common/IconButton'
import StatusLoan from './common/StatusLoan'

const TransactionEditForm: React.FC<TransactionEditFormProps> = ({ data }) => {
    const {
        onsubmit,
        handleDeleteTransaction,
        handleAddMoreMethodSpending,
        handleReloadData,
        methodSpending,
        transaction,
        userLoan,
    } = data
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { loading } = useLoading()
    const form = useForm<any>({
        defaultValues: {
            paid: transaction.paid,
            description: transaction.description?.split('\n').slice(1).join('\n') || '',
            methodReference: transaction.methodReference ?? null,
            amount: transaction.realPaid ?? transaction.amount,
            estimatePaidDate: moment(transaction.estimatePaidDate).toDate(),
            userLoan: transaction.userLoan ?? null,
            surplus: transaction.surplus ?? null,
            image: transaction.image ?? null,
        },
    })

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
                    <h4 className='text-xl font-semibold xl:text-2xl'>{t(LANGUAGE.TRANSACTION)}</h4>
                </div>

                {!transaction.paid && (
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
            <div className='rounded-xl bg-white py-2 text-gray-900 shadow-lg dark:bg-slate-800 dark:text-slate-200 sm:py-6 lg:py-8'>
                <div className='mx-auto w-full max-w-lg'>
                    <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
                        <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                            <div className='flex flex-1 flex-col justify-between'>
                                <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                                    <div className='space-y-6 pt-6 pb-5'>
                                        {!isNil(form.watch('surplus')) &&
                                            (() => {
                                                const surplus = form.watch('surplus')
                                                const calc =
                                                    ([KIND_SPENDING.GET_LOAN].includes(transaction.kindSpending.key)
                                                        ? 1
                                                        : -1) *
                                                        Number(form.watch('amount')) +
                                                    surplus
                                                return (
                                                    <div className='flex justify-between'>
                                                        <h4 className='inline-block font-medium'>
                                                            {t(LANGUAGE.SURPLUS_AT_TIME)}
                                                        </h4>
                                                        <div className='flex items-center space-x-2 font-normal'>
                                                            <span className={clsx(...service.getColorPrize(calc))}>
                                                                {numeral(calc).format()}
                                                            </span>
                                                            <span className='inline-block h-full w-px border border-gray-400' />
                                                            <span className={clsx(...service.getColorPrize(surplus))}>
                                                                {numeral(surplus).format()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })()}

                                        <Input
                                            name='amount'
                                            form={form}
                                            type='number'
                                            label={t(LANGUAGE.AMOUNT)}
                                            rules={{
                                                required: t(LANGUAGE.REQUIRED_AMOUNT) as any,
                                                min: {
                                                    value: 0,
                                                    message: t(LANGUAGE.AMOUNT_MIN_ZERO),
                                                },
                                            }}
                                        />

                                        <AutoComplete
                                            name='methodReference'
                                            form={form}
                                            data={methodSpending.data}
                                            label={t(LANGUAGE.METHOD_RECEIVE)}
                                            loading={methodSpending.loading}
                                            addMore={handleAddMoreMethodSpending}
                                            onReload={
                                                isEmpty(methodSpending.data)
                                                    ? undefined
                                                    : () => handleReloadData('methodSpending')
                                            }
                                        />

                                        <StatusLoan form={form} name='methodReference' />

                                        <AutoComplete
                                            name='userLoan'
                                            form={form}
                                            rules={{
                                                required: t(LANGUAGE.REQUIRED_USER_GET_LOAN) as any,
                                            }}
                                            data={userLoan.data}
                                            label={t(LANGUAGE.USER_GET_LOAN)}
                                            valueKey='userName'
                                            loading={userLoan.loading}
                                            onReload={
                                                isEmpty(userLoan.data) ? undefined : () => handleReloadData('userLoan')
                                            }
                                            showImage
                                        />

                                        <DatePicker
                                            name='estimatePaidDate'
                                            form={form}
                                            label={t(LANGUAGE.ESTIMATE_PAID_DATE)}
                                        />

                                        <TextArea name='description' form={form} label={t(LANGUAGE.NOTE)} />

                                        <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TransactionEditForm
