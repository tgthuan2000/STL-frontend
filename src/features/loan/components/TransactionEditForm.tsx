import { ArrowSmallLeftIcon, TrashIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { TransactionEditFormProps } from '~/@types/loan'
import { Button, FormWrap, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea, UploadImage } from '~/components/_base'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import IconButton from './common/IconButton'
import StatusLoan from './common/StatusLoan'

const useSchema = () => {
    const { t } = useTranslation()

    const schema = useMemo(() => {
        return yup.object().shape({
            amount: yup
                .number()
                .required(t(LANGUAGE.REQUIRED_FIELD) as string)
                .min(1, t(LANGUAGE.AMOUNT_MIN_ZERO) as string)
                .typeError(t(LANGUAGE.REQUIRED_NUMBER) as string),
            methodReference: yup.object().nullable(),
            userLoan: yup
                .object()
                .nullable()
                .required(t(LANGUAGE.REQUIRED_USER_CREDIT) as string),
            estimatePaidDate: yup
                .date()
                .nullable()
                .typeError(t(LANGUAGE.ERROR) as string),
            description: yup.string(),
            image: yup.mixed(),
        })
    }, [t])

    return schema
}

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
    const schema = useSchema()
    const form = useForm<any>({
        defaultValues: {
            paid: transaction.paid,
            description: transaction.description?.split('\n').slice(1).join('\n') || '',
            methodReference: transaction.methodReference ?? null,
            amount: transaction.realPaid ?? transaction.amount,
            estimatePaidDate: transaction.estimatePaidDate ? moment(transaction.estimatePaidDate).toDate() : null,
            userLoan: transaction.userLoan ?? null,
            surplus: transaction.surplus ?? null,
            image: transaction.image ?? null,
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
                    <FormWrap
                        onSubmit={form.handleSubmit(onsubmit)}
                        renderButton={
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
                        }
                    >
                        {/* {!isNil(surplus) &&
                            (() => {
                                const calc =
                                    ([KIND_SPENDING.CREDIT].includes(transaction.kindSpending.key) ? 1 : -1) *
                                        Number(form.watch('amount')) +
                                    surplus
                                return (
                                    <div className='flex justify-between'>
                                        <h4 className='inline-block font-medium'>{t(LANGUAGE.SURPLUS_AT_TIME)}</h4>
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
                            })()} */}
                        <Input name='amount' form={form} type='number' label={t(LANGUAGE.AMOUNT)} />
                        <AutoComplete
                            name='methodReference'
                            form={form}
                            data={methodSpending.data}
                            label={t(LANGUAGE.METHOD_RECEIVE)}
                            loading={methodSpending.loading}
                            addMore={handleAddMoreMethodSpending}
                            onReload={
                                isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')
                            }
                        />
                        <StatusLoan form={form} name='methodReference' />
                        <AutoComplete
                            name='userLoan'
                            form={form}
                            data={userLoan.data}
                            label={t(LANGUAGE.USER_CREDIT)}
                            valueKey='userName'
                            loading={userLoan.loading}
                            onReload={isEmpty(userLoan.data) ? undefined : () => handleReloadData('userLoan')}
                            showImage
                        />
                        <DatePicker name='estimatePaidDate' form={form} label={t(LANGUAGE.ESTIMATE_PAID_DATE)} />
                        <TextArea name='description' form={form} label={t(LANGUAGE.NOTE)} />
                        <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
                    </FormWrap>
                </div>
            </div>
        </div>
    )
}

export default TransactionEditForm
