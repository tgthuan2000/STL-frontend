import { ArrowSmallLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PaidForm, TransactionDetailFormProps } from '~/@types/loan'
import { AnimateWrap, AvatarUser, Button, Divider, FormWrap, IconButton, SubmitWrap } from '~/components'
import { AutoComplete, Input, Toggle } from '~/components/_base'
import { DATE_FORMAT } from '~/constant'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { urlFor } from '~/sanityConfig'
import Group from './Group'

const TransactionDetailForm: React.FC<TransactionDetailFormProps> = ({ data }) => {
    const { t } = useTranslation()
    const { onsubmit, handleDeleteTransaction, methodSpending, transaction } = data
    const navigate = useNavigate()
    const { loading } = useLoading()
    const form = useForm<PaidForm>({
        defaultValues: {
            paid: transaction.paid,
            methodSpending: transaction.methodSpending ?? transaction.methodReference ?? null,
            amount: transaction.realPaid ?? transaction.amount,
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
                    <h4 className='text-xl font-semibold xl:text-2xl'>{t(LANGUAGE.TRANSACTION_DETAIL)}</h4>
                </div>

                {!transaction.paid && (
                    <div className='flex gap-2'>
                        <IconButton onClick={() => navigate(`/loan/transaction/${transaction._id}/edit`)}>
                            <PencilIcon />
                        </IconButton>
                        <IconButton
                            onClick={() =>
                                window.confirm(t(LANGUAGE.CONFIRM_DELETE_TRANSACTION) as string) &&
                                handleDeleteTransaction()
                            }
                        >
                            <TrashIcon />
                        </IconButton>
                    </div>
                )}
            </div>
            <div className='rounded-xl bg-white py-2 text-gray-900 shadow-lg dark:bg-slate-800 dark:text-slate-200 sm:py-6 lg:py-8'>
                <div className='mx-auto w-full max-w-lg'>
                    <FormWrap
                        onSubmit={transaction.paid ? undefined : form.handleSubmit(onsubmit)}
                        renderButton={
                            <SubmitWrap>
                                {!transaction.paid && (
                                    <Button color='radicalRed' type='submit' disabled={loading.submit}>
                                        {t(LANGUAGE.PAID)}
                                    </Button>
                                )}
                                <Button
                                    color='outline'
                                    type='button'
                                    onClick={() => {
                                        navigate(-1)
                                    }}
                                >
                                    {t(LANGUAGE.BACK)}
                                </Button>
                            </SubmitWrap>
                        }
                    >
                        <Group label={t(LANGUAGE.STATUS)} className='flex-col'>
                            <Toggle
                                form={form}
                                rules={{ required: t(LANGUAGE.CLICK_TO_CHOOSE_METHOD) as string }}
                                name='paid'
                                label={transaction.paid ? t(LANGUAGE.PAID) : t(LANGUAGE.UNPAID)}
                                disabled={transaction.paid}
                            />
                            <AnimateWrap>
                                {form.watch('paid') && (
                                    <div className='mt-2 space-y-4'>
                                        <AutoComplete
                                            name='methodSpending'
                                            form={form}
                                            data={methodSpending.data}
                                            label={t(LANGUAGE.METHOD_SPENDING)}
                                            loading={methodSpending.loading}
                                            rules={{
                                                required: t(LANGUAGE.REQUIRED_METHOD_SPENDING) as string,
                                            }}
                                            disabled={transaction.paid}
                                        />
                                        <Input
                                            name='amount'
                                            form={form}
                                            rules={{
                                                required: t(LANGUAGE.REQUIRED_AMOUNT) as string,
                                                max: {
                                                    value: transaction.amount,
                                                    message: t(LANGUAGE.REAL_MONEY_MUST_BE_LESS_THAN_AMOUNT) as string,
                                                },
                                            }}
                                            type='number'
                                            label={t(LANGUAGE.REAL_AMOUNT)}
                                            disabled={transaction.paid}
                                        />
                                    </div>
                                )}
                            </AnimateWrap>
                        </Group>
                        <Divider />
                        <Group label={t(LANGUAGE.OBJECT)} className='flex-col'>
                            <div className='flex gap-2'>
                                <AvatarUser image={transaction.userLoan?.image} />

                                <div className='flex flex-col'>
                                    <span className='max-w-[150px] truncate'>{transaction.userLoan?.userName}</span>
                                    <span
                                        className={clsx(
                                            'font-normal',
                                            {
                                                'text-green-500':
                                                    transaction.userLoan && transaction.userLoan.surplus > 0,
                                            },
                                            {
                                                'text-red-500':
                                                    transaction.userLoan && transaction.userLoan.surplus < 0,
                                            },
                                            {
                                                'text-gray-500':
                                                    transaction.userLoan && transaction.userLoan.surplus === 0,
                                            }
                                        )}
                                    >
                                        {numeral(transaction.userLoan?.surplus).format()}
                                    </span>
                                </div>
                            </div>
                        </Group>
                        <Group label={t(LANGUAGE.TRANSACTION_KIND)} className='justify-between'>
                            {transaction.kindSpending.name}
                        </Group>
                        <Group label={t(LANGUAGE.AMOUNT)} className='justify-between'>
                            {numeral(transaction.amount).format()}
                        </Group>
                        <Group label={t(LANGUAGE.AMOUNT_RECEIVE_METHOD)} className='justify-between'>
                            {transaction.methodReference?.name || '---'}
                        </Group>
                        {transaction._createdAt && (
                            <Group label={t(LANGUAGE.CREATION_TIME)} className='justify-between'>
                                {moment(transaction._createdAt).format(DATE_FORMAT.D_DATE_TIME)}
                            </Group>
                        )}
                        {transaction._updatedAt && (
                            <Group label={t(LANGUAGE.RECENT_UPDATE)} className='justify-between'>
                                {moment(transaction._updatedAt).format(DATE_FORMAT.D_DATE_TIME)}
                            </Group>
                        )}
                        {transaction.estimatePaidDate && (
                            <Group label={t(LANGUAGE.ESTIMATE_PAID_DATE)} className='justify-between'>
                                {moment(transaction.estimatePaidDate).format(DATE_FORMAT.D_DATE_TIME)}
                            </Group>
                        )}
                        {transaction.paidDate && (
                            <Group label={t(LANGUAGE.PAID_TIME)} className='justify-between'>
                                {moment(transaction.paidDate).format(DATE_FORMAT.D_DATE_TIME)}
                            </Group>
                        )}
                        {transaction.image && (
                            <Group label={t(LANGUAGE.IMAGE)} className='flex-col'>
                                <img
                                    src={urlFor(transaction.image)}
                                    className='h-40 w-full rounded-md bg-gray-200 object-contain dark:bg-slate-700'
                                />
                            </Group>
                        )}
                        {transaction.description && (
                            <Group label={t(LANGUAGE.NOTE)} className='flex-col'>
                                <ul className='ml-3 list-disc'>
                                    {transaction.description.split('\n').map((value) => (
                                        <li key={value}>{value}</li>
                                    ))}
                                </ul>
                            </Group>
                        )}
                    </FormWrap>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailForm
