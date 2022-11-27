import { ArrowSmLeftIcon, TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { TransactionEditFormProps } from '~/@types/loan'
import { Button } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea } from '~/components/_base'
import { KIND_SPENDING } from '~/constant/spending'
import { useLoading } from '~/context'
import { useScrollIntoView } from '~/hook'
import { getColorPrize } from '~/services'
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
        title,
    } = data
    const navigate = useNavigate()
    const { loading } = useLoading()
    const wrapRef = useScrollIntoView<HTMLDivElement>()
    const form = useForm<any>({
        defaultValues: {
            paid: transaction.paid,
            description: transaction.description?.split('\n').slice(1).join('\n') || '',
            methodReference: transaction.methodReference ?? null,
            amount: transaction.realPaid ?? transaction.amount,
            estimatePaidDate: moment(transaction.estimatePaidDate).toDate(),
            userLoan: transaction.userLoan ?? null,
            surplus: transaction.surplus ?? null,
        },
    })

    return (
        <div ref={wrapRef}>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center text-gray-900 space-x-2 select-none'>
                    <ArrowSmLeftIcon
                        className='h-7 w-7 hover:opacity-50 cursor-pointer'
                        onClick={() => {
                            navigate(-1)
                        }}
                    />
                    <h4 className='xl:text-2xl text-xl font-semibold'>Cập nhật giao dịch</h4>
                </div>

                {!transaction.paid && (
                    <IconButton
                        onClick={() =>
                            window.confirm('Bạn có chắc muốn xóa giao dịch này ?') && handleDeleteTransaction()
                        }
                    >
                        <TrashIcon />
                    </IconButton>
                )}
            </div>
            <div className='bg-white rounded-xl shadow-lg py-2 sm:py-6 lg:py-8'>
                <div className='max-w-lg w-full mx-auto'>
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
                                                        <h4 className='inline-block font-medium text-gray-900'>
                                                            Số dư tại thời điểm
                                                        </h4>
                                                        <div className='flex items-center space-x-2 font-normal'>
                                                            <span className={clsx(...getColorPrize(calc))}>
                                                                {numeral(calc).format()}
                                                            </span>
                                                            <span className='inline-block w-px h-full border border-gray-400' />
                                                            <span className={clsx(...getColorPrize(surplus))}>
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
                                            label={title}
                                            rules={{
                                                required: 'Yêu cầu nhập chi phí!',
                                                min: {
                                                    value: 0,
                                                    message: 'Chi phí phải lớn hơn 0!',
                                                },
                                            }}
                                        />

                                        <AutoComplete
                                            name='methodReference'
                                            form={form}
                                            data={methodSpending.data}
                                            label='Phương thức nhận tiền'
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
                                                required: 'Yêu cầu chọn đối tượng vay!',
                                            }}
                                            data={userLoan.data}
                                            label='Đối tượng vay'
                                            valueKey='userName'
                                            loading={userLoan.loading}
                                            onReload={
                                                isEmpty(userLoan.data) ? undefined : () => handleReloadData('userLoan')
                                            }
                                            showImage
                                        />

                                        <DatePicker name='estimatePaidDate' form={form} label='Hạn trả' />

                                        <TextArea name='description' form={form} label='Ghi chú' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                            <div className='flex sm:justify-start justify-end space-x-3'>
                                <Button color='blue' type='submit' disabled={loading.submit}>
                                    Cập nhật
                                </Button>
                                <Button
                                    color='outline'
                                    type='button'
                                    onClick={() => {
                                        navigate(-1)
                                    }}
                                >
                                    Hủy bỏ
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TransactionEditForm
