import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowSmLeftIcon, TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IMethodSpending, ISpendingData } from '~/@types/spending'
import { AutoComplete, AvatarUser, Button, Divider, Input, Toggle } from '~/components'
import { DATE_TIME_FORMAT } from '~/constant'
import { useLoading } from '~/context'
import { Data } from '../transaction-detail'
import Group from './Group'

interface D<T> {
    loading: boolean
    data: T[] | undefined
    query: string
    params?: {} | undefined
}
export interface TransactionDetailFormData {
    onsubmit: SubmitHandler<PaidForm>
    handleReloadData: (keys: keyof Data) => Promise<void>
    handleDeleteTransaction: () => void
    methodSpending: D<IMethodSpending>
    transaction: ISpendingData
}
export interface PaidForm {
    paid: boolean
    methodSpending: IMethodSpending | null
    amount: number
}
interface TransactionDetailFormProps {
    data: TransactionDetailFormData
}
const TransactionDetailForm = ({ data }: TransactionDetailFormProps) => {
    const { onsubmit, handleDeleteTransaction, handleReloadData, methodSpending, transaction } = data
    const navigate = useNavigate()
    const { loading } = useLoading()
    const form = useForm<PaidForm>({
        defaultValues: {
            paid: transaction.paid,
            methodSpending: transaction.methodSpending ?? null,
            amount: transaction.realPaid ?? transaction.amount,
        },
    })
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center text-gray-900 space-x-2 select-none'>
                    <ArrowSmLeftIcon
                        className='h-7 w-7 hover:opacity-50 cursor-pointer'
                        onClick={() => {
                            navigate(-1)
                        }}
                    />
                    <h4 className='xl:text-2xl text-xl font-semibold'>Chi tiết giao dịch</h4>
                </div>

                {!transaction.paid && (
                    <TrashIcon
                        className='h-6 lg:h-8 w-6 lg:w-8 hover:opacity-50 text-gray-700 cursor-pointer'
                        onClick={() =>
                            window.confirm('Bạn có chắc muốn xóa giao dịch này ?') && handleDeleteTransaction()
                        }
                    />
                )}
            </div>
            <div className='bg-white rounded-xl shadow-lg py-2 sm:py-6 lg:py-8'>
                <div className='max-w-lg w-full mx-auto'>
                    <form
                        onSubmit={transaction.paid ? undefined : form.handleSubmit(onsubmit)}
                        className='flex h-full flex-col'
                    >
                        <div className='h-0 flex-1'>
                            <div className='flex flex-1 flex-col justify-between'>
                                <div className='divide-y divide-gray-200 px-4 sm:px-6'>
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
                                                            onReload={
                                                                isEmpty(methodSpending.data) || transaction.paid
                                                                    ? undefined
                                                                    : () => handleReloadData('methodSpending')
                                                            }
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
                                        <Group label='Phương thức giao dịch' className='justify-between'>
                                            {transaction.methodSpending.name}
                                        </Group>
                                        {transaction.date && (
                                            <Group label='Hạn trả' className='justify-between'>
                                                {moment(transaction.date).format(DATE_TIME_FORMAT)}
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
                        <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                            <div className='flex sm:justify-start justify-end space-x-3'>
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
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailForm
