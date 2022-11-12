import { ArrowSmLeftIcon, TrashIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ICategorySpending, IMethodSpending, ISpendingData } from '~/@types/spending'
import { AutoComplete, Button, DatePicker, Input, TextArea } from '~/components'
import { KIND_SPENDING } from '~/constant/spending'
import { useLoading } from '~/context'
import { useScrollIntoView } from '~/hook'
import { getColorPrize } from '~/services'
import { Data, DataCategory, IDetailSpendingForm } from '../pages/TransactionDetail'

interface D<T> {
    loading: boolean
    data: T[] | undefined
    query: string
    params?: {} | undefined
}
export interface TransactionDetailFormData {
    onsubmit: SubmitHandler<IDetailSpendingForm>
    title: string
    handleReloadData: (keys: keyof Data) => Promise<void>
    handleReloadDataCategory: (keys: keyof DataCategory) => Promise<void>
    handleAddMoreMethodSpending: (name: string) => Promise<{ _id: string; name: string } | undefined>
    handleAddMoreCategorySpending: (name: string) => Promise<{ _id: string; name: string } | undefined>
    handleDeleteTransaction: () => void
    categorySpending: D<ICategorySpending>
    methodSpending: D<IMethodSpending>
    transaction: ISpendingData
}

interface TransactionDetailFormProps {
    data: TransactionDetailFormData
}
const TransactionDetailForm = ({ data }: TransactionDetailFormProps) => {
    const {
        onsubmit,
        title,
        categorySpending,
        handleAddMoreMethodSpending,
        handleAddMoreCategorySpending,
        handleDeleteTransaction,
        handleReloadData,
        handleReloadDataCategory,
        methodSpending,
        transaction,
    } = data
    const navigate = useNavigate()
    const { loading } = useLoading()
    const wrapRef = useScrollIntoView<HTMLDivElement>()
    const form = useForm<IDetailSpendingForm>({
        defaultValues: {
            amount: transaction.amount,
            categorySpending: transaction.categorySpending,
            methodSpending: transaction.methodSpending,
            methodReference: transaction.methodReference,
            date: moment(transaction.date).toDate(),
            description: transaction.description,
            surplus: transaction.surplus ?? 0,
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
                    <h4 className='xl:text-2xl text-xl font-semibold'>Chi tiết giao dịch</h4>
                </div>
                {[
                    KIND_SPENDING.COST,
                    KIND_SPENDING.RECEIVE,
                    KIND_SPENDING.TRANSFER_FROM,
                    KIND_SPENDING.TRANSFER_TO,
                ].includes(transaction.kindSpending.key) && (
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
                        onSubmit={!isEmpty(categorySpending.data) ? form.handleSubmit(onsubmit) : undefined}
                        className='flex h-full flex-col'
                    >
                        <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                            <div className='flex flex-1 flex-col justify-between'>
                                <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                                    <div className='space-y-6 pt-6 pb-5'>
                                        {!isNil(form.watch('surplus')) &&
                                            (() => {
                                                const surplus = form.watch('surplus')
                                                const calc =
                                                    ([
                                                        KIND_SPENDING.RECEIVE,
                                                        KIND_SPENDING.TRANSFER_TO,
                                                        KIND_SPENDING.GET_LOAN,
                                                    ].includes(transaction.kindSpending.key)
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

                                        {!isEmpty(categorySpending.data) && (
                                            <AutoComplete
                                                name='categorySpending'
                                                form={form}
                                                data={categorySpending.data}
                                                label='Thể loại'
                                                loading={categorySpending.loading}
                                                addMore={handleAddMoreCategorySpending}
                                                rules={{
                                                    required: 'Yêu cầu chọn thể loại!',
                                                }}
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
                                                            ? (transaction.kindSpending.key ===
                                                              KIND_SPENDING.TRANSFER_FROM
                                                                  ? 'Từ'
                                                                  : 'Đến') + ' phương thức thanh toán'
                                                            : 'Phương thức thanh toán'
                                                    }
                                                    loading={methodSpending.loading}
                                                    addMore={handleAddMoreMethodSpending}
                                                    rules={{
                                                        required: 'Yêu cầu chọn phương thức thanh toán!',
                                                    }}
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
                                                            (transaction.kindSpending.key ===
                                                            KIND_SPENDING.TRANSFER_FROM
                                                                ? 'Đến'
                                                                : 'Từ') + ' phương thức thanh toán'
                                                        }
                                                        loading={methodSpending.loading}
                                                        addMore={handleAddMoreMethodSpending}
                                                        rules={{
                                                            required: 'Yêu cầu chọn phương thức thanh toán!',
                                                        }}
                                                        onReload={
                                                            isEmpty(methodSpending.data)
                                                                ? undefined
                                                                : () => handleReloadData('methodSpending')
                                                        }
                                                    />
                                                )}
                                            </div>
                                        )}

                                        <DatePicker
                                            name='date'
                                            form={form}
                                            label='Ngày'
                                            rules={{
                                                required: 'Yêu cầu chọn ngày!',
                                            }}
                                        />

                                        <TextArea name='description' form={form} label='Ghi chú' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!isEmpty(categorySpending.data) && (
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
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TransactionDetailForm
