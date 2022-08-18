import { ArrowSmLeftIcon, TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ILoanData } from '~/@types/loan'
import { ICategorySpending, IMethodSpending, ISpendingData } from '~/@types/spending'
import { AutoComplete, AvatarUser, Button, DatePicker, Divider, Input, TextArea, Toggle, UserSvg } from '~/components'
import { KIND_SPENDING } from '~/constant/spending'
import { useLoading } from '~/context'
import { urlFor } from '~/sanityConfig'
import { getColorPrize } from '~/util'
import { Data } from '../transaction-detail'
import Group from './Group'

interface D<T> {
    loading: boolean
    data: T[] | undefined
    query: string
    params?: {} | undefined
}
export interface TransactionDetailFormData {
    onsubmit: SubmitHandler<any>
    title: string
    handleReloadData: (keys: keyof Data) => Promise<void>
    handleDeleteTransaction: () => void
    handlePaidTransaction: () => void
    methodSpending: D<IMethodSpending>
    transaction: ILoanData
}

interface TransactionDetailFormProps {
    data: TransactionDetailFormData
}
const TransactionDetailForm = ({ data }: TransactionDetailFormProps) => {
    const {
        onsubmit,
        title,
        handleDeleteTransaction,
        handlePaidTransaction,
        handleReloadData,
        methodSpending,
        transaction,
    } = data
    const navigate = useNavigate()
    const { loading } = useLoading()
    const form = useForm({
        defaultValues: {
            paid: transaction.paid,
        },
    })

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

                <TrashIcon
                    className='h-6 lg:h-8 w-6 lg:w-8 hover:opacity-50 text-gray-700 cursor-pointer'
                    onClick={() => window.confirm('Bạn có chắc muốn xóa giao dịch này ?') && handleDeleteTransaction()}
                />
            </div>
            <div className='bg-white rounded-xl shadow-lg py-2 sm:py-6 lg:py-8'>
                <div className='max-w-lg w-full mx-auto'>
                    <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
                        <div className='h-0 flex-1'>
                            <div className='flex flex-1 flex-col justify-between'>
                                <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                                    <div className='space-y-6 pt-6 pb-5'>
                                        <Group label='Trạng thái' className='flex-col'>
                                            <span className='inline-flex items-center gap-2'>
                                                <Toggle /> Chưa trả
                                            </span>
                                            <div className='mt-2'>
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
                                                        isEmpty(methodSpending.data)
                                                            ? undefined
                                                            : () => handleReloadData('methodSpending')
                                                    }
                                                />
                                            </div>
                                        </Group>
                                        <Divider />
                                        <Group label='Đối tượng vay' className='flex-col'>
                                            <div className='flex gap-2'>
                                                <AvatarUser image={transaction.userLoan?.image} />

                                                <div className='flex flex-col'>
                                                    <span className='truncate max-w-[150px]'>
                                                        {transaction.userLoan.userName}
                                                    </span>
                                                    <span
                                                        className={clsx(
                                                            'font-normal',
                                                            transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                                                        )}
                                                    >
                                                        {numeral(transaction.amount).format()}
                                                    </span>
                                                </div>
                                            </div>
                                        </Group>
                                        <Group label='Số tiền' className='justify-between'>
                                            {numeral(transaction.amount).format()}
                                        </Group>
                                        <Group label='Phương thức giao dịch' className='justify-between'>
                                            {transaction.methodSpending.name}
                                        </Group>
                                        {transaction.payDate && (
                                            <Group label='Ngày trả' className='justify-between'>
                                                {transaction.payDate}
                                            </Group>
                                        )}

                                        {transaction.description && (
                                            <Group label='Ghi chú' className='flex-col'>
                                                {transaction.description}
                                            </Group>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                            <div className='flex sm:justify-start justify-end space-x-3'>
                                <Button color='radicalRed' type='submit' disabled={loading.submit}>
                                    Trả
                                </Button>
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
