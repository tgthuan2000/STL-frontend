import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowSmallLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { PaidForm, TransactionDetailFormProps } from '~/@types/loan'
import { AvatarUser, Button, Divider, SubmitWrap } from '~/components'
import { AutoComplete, Input, Toggle } from '~/components/_base'
import { DATE_FORMAT } from '~/constant'
import { useLoading } from '~/context'
import IconButton from './common/IconButton'
import Group from './Group'

const TransactionDetailForm: React.FC<TransactionDetailFormProps> = ({ data }) => {
    const { onsubmit, handleDeleteTransaction, methodSpending, transaction } = data
    const navigate = useNavigate()
    const { loading } = useLoading()
    const form = useForm<PaidForm>({
        defaultValues: {
            paid: transaction.paid,
            methodSpending: transaction.methodSpending ?? transaction.methodReference ?? null,
            amount: transaction.realPaid ?? transaction.amount,
        },
    })
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center text-gray-900 dark:text-slate-200 space-x-2 select-none'>
                    <ArrowSmallLeftIcon
                        className='h-7 w-7 hover:opacity-50 cursor-pointer'
                        onClick={() => {
                            navigate(-1)
                        }}
                    />
                    <h4 className='xl:text-2xl text-xl font-semibold'>Chi tiết giao dịch</h4>
                </div>

                {!transaction.paid && (
                    <div className='flex gap-2'>
                        <IconButton onClick={() => navigate(`/loan/transaction/${transaction._id}/edit`)}>
                            <PencilIcon />
                        </IconButton>
                        <IconButton
                            onClick={() =>
                                window.confirm('Bạn có chắc muốn xóa giao dịch này ?') && handleDeleteTransaction()
                            }
                        >
                            <TrashIcon />
                        </IconButton>
                    </div>
                )}
            </div>
            <div className='bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-200 rounded-xl shadow-lg py-2 sm:py-6 lg:py-8'>
                <div className='max-w-lg w-full mx-auto'>
                    <form
                        onSubmit={transaction.paid ? undefined : form.handleSubmit(onsubmit)}
                        className='flex h-full flex-col'
                    >
                        <div className='h-0 flex-1'>
                            <div className='flex flex-1 flex-col justify-between'>
                                <div className='divide-y divide-gray-200 dark:divide-slate-500 px-4 sm:px-6'>
                                    <div className='space-y-4 pt-6 pb-5'>
                                        <Group label='Trạng thái' className='flex-col'>
                                            <Toggle
                                                form={form}
                                                rules={{ required: 'Nhấn để chọn phương thức thanh toán' }}
                                                name='paid'
                                                label={transaction.paid ? 'Đã trả' : 'Chưa trả'}
                                                disabled={transaction.paid}
                                            />
                                            <div ref={parent}>
                                                {form.watch('paid') && (
                                                    <div className='mt-2 space-y-4'>
                                                        <AutoComplete
                                                            name='methodSpending'
                                                            form={form}
                                                            data={methodSpending.data}
                                                            label='Phương thức thanh toán'
                                                            loading={methodSpending.loading}
                                                            rules={{
                                                                required: 'Yêu cầu chọn phương thức thanh toán!',
                                                            }}
                                                            disabled={transaction.paid}
                                                        />
                                                        <Input
                                                            name='amount'
                                                            form={form}
                                                            rules={{
                                                                required: 'Yêu cầu nhập số tiền thực trả!',
                                                                max: {
                                                                    value: transaction.amount,
                                                                    message:
                                                                        'Số tiền thực trả không được lớn hơn số tiền cần trả!',
                                                                },
                                                            }}
                                                            type='number'
                                                            label='Số tiền thực trả'
                                                            disabled={transaction.paid}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </Group>
                                        <Divider />
                                        <Group label='Đối tượng' className='flex-col'>
                                            <div className='flex gap-2'>
                                                <AvatarUser image={transaction.userLoan?.image} />

                                                <div className='flex flex-col'>
                                                    <span className='truncate max-w-[150px]'>
                                                        {transaction.userLoan?.userName}
                                                    </span>
                                                    <span
                                                        className={clsx(
                                                            'font-normal',
                                                            {
                                                                'text-green-500':
                                                                    transaction.userLoan &&
                                                                    transaction.userLoan.surplus > 0,
                                                            },
                                                            {
                                                                'text-red-500':
                                                                    transaction.userLoan &&
                                                                    transaction.userLoan.surplus < 0,
                                                            },
                                                            {
                                                                'text-gray-500':
                                                                    transaction.userLoan &&
                                                                    transaction.userLoan.surplus === 0,
                                                            }
                                                        )}
                                                    >
                                                        {numeral(transaction.userLoan?.surplus).format()}
                                                    </span>
                                                </div>
                                            </div>
                                        </Group>
                                        <Group label='Loại giao dịch' className='justify-between'>
                                            {transaction.kindSpending.name}
                                        </Group>
                                        <Group label='Số tiền' className='justify-between'>
                                            {numeral(transaction.amount).format()}
                                        </Group>
                                        <Group label='Phương thức nhận tiền' className='justify-between'>
                                            {transaction.methodReference?.name || 'Không có'}
                                        </Group>
                                        {transaction._createdAt && (
                                            <Group label='Thời điểm tạo' className='justify-between'>
                                                {moment(transaction._createdAt).format(DATE_FORMAT.D_DATE_TIME)}
                                            </Group>
                                        )}
                                        {transaction._updatedAt && (
                                            <Group label='Cập nhật gần nhất' className='justify-between'>
                                                {moment(transaction._updatedAt).format(DATE_FORMAT.D_DATE_TIME)}
                                            </Group>
                                        )}
                                        {transaction.estimatePaidDate && (
                                            <Group label='Hạn trả' className='justify-between'>
                                                {moment(transaction.estimatePaidDate).format(DATE_FORMAT.D_DATE_TIME)}
                                            </Group>
                                        )}
                                        {transaction.paidDate && (
                                            <Group label='Thời điểm trả' className='justify-between'>
                                                {moment(transaction.paidDate).format(DATE_FORMAT.D_DATE_TIME)}
                                            </Group>
                                        )}

                                        {transaction.description && (
                                            <Group label='Ghi chú' className='flex-col'>
                                                <ul className='list-disc ml-3'>
                                                    {transaction.description.split('\n').map((value) => (
                                                        <li key={value}>{value}</li>
                                                    ))}
                                                </ul>
                                            </Group>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SubmitWrap>
                            {!transaction.paid && (
                                <Button color='radicalRed' type='submit' disabled={loading.submit}>
                                    Trả
                                </Button>
                            )}
                            <Button
                                color='outline'
                                type='button'
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                Quay lại
                            </Button>
                        </SubmitWrap>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailForm
