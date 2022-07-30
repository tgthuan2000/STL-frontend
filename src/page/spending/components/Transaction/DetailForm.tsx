import { ArrowSmLeftIcon, TrashIcon } from '@heroicons/react/outline'
import _ from 'lodash'
import moment from 'moment'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ICategorySpending, IMethodSpending, SpendingData } from '~/@types/spending'
import { AutoComplete, Button, DatePicker, Input, TextArea } from '~/components'
import { useLoading } from '~/context'
import { Data, DataCategory } from '../../transaction-detail'

interface IDetailSpendingForm {
    amount: number
    categorySpending: ICategorySpending
    methodSpending: IMethodSpending
    date: Date
    description: string
}
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
    transaction: SpendingData
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
    const { control, handleSubmit } = useForm<IDetailSpendingForm>({
        defaultValues: {
            amount: transaction.amount,
            categorySpending: transaction.categorySpending,
            methodSpending: transaction.methodSpending,
            date: moment(transaction.date).toDate(),
            description: transaction.description,
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
                    <h4 className='xl:text-2xl text-xl font-semibold'>Cập nhật giao dịch</h4>
                </div>
                <TrashIcon
                    className='h-6 lg:h-8 w-6 lg:w-8 hover:opacity-50 text-gray-700 cursor-pointer'
                    onClick={handleDeleteTransaction}
                />
            </div>
            <div className='bg-white rounded-xl shadow-lg py-2 sm:py-6 lg:py-8'>
                <div className='max-w-lg w-full mx-auto'>
                    <form
                        onSubmit={!_.isEmpty(categorySpending.data) ? handleSubmit(onsubmit) : undefined}
                        className='flex h-full flex-col'
                    >
                        <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                            <div className='flex flex-1 flex-col justify-between'>
                                <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                                    <div className='space-y-6 pt-6 pb-5'>
                                        <Controller
                                            name='amount'
                                            control={control}
                                            rules={{
                                                required: 'Yêu cầu nhập chi phí!',
                                                min: {
                                                    value: 0,
                                                    message: 'Chi phí phải lớn hơn 0!',
                                                },
                                            }}
                                            render={({ field, fieldState: { error } }) => (
                                                <Input type='number' label={title} error={error} {...field} />
                                            )}
                                        />
                                        {!_.isEmpty(categorySpending.data) && (
                                            <Controller
                                                name='categorySpending'
                                                control={control}
                                                rules={{
                                                    required: 'Yêu cầu chọn thể loại!',
                                                }}
                                                render={({ field, fieldState: { error } }) => (
                                                    <AutoComplete
                                                        data={categorySpending.data}
                                                        label='Thể loại'
                                                        error={error}
                                                        loading={categorySpending.loading}
                                                        addMore={handleAddMoreCategorySpending}
                                                        onReload={
                                                            _.isEmpty(categorySpending.data)
                                                                ? undefined
                                                                : () => handleReloadDataCategory('categorySpending')
                                                        }
                                                        {...field}
                                                    />
                                                )}
                                            />
                                        )}
                                        <Controller
                                            name='methodSpending'
                                            control={control}
                                            rules={{
                                                required: 'Yêu cầu chọn phương thức thanh toán!',
                                            }}
                                            render={({ field, fieldState: { error } }) => (
                                                <AutoComplete
                                                    data={methodSpending.data}
                                                    label='Phương thức thanh toán'
                                                    error={error}
                                                    loading={methodSpending.loading}
                                                    addMore={handleAddMoreMethodSpending}
                                                    onReload={
                                                        _.isEmpty(methodSpending.data)
                                                            ? undefined
                                                            : () => handleReloadData('methodSpending')
                                                    }
                                                    {...field}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name='date'
                                            control={control}
                                            rules={{
                                                required: 'Yêu cầu chọn ngày!',
                                            }}
                                            render={({ field, fieldState: { error } }) => (
                                                <DatePicker label='Ngày' error={error} {...field} />
                                            )}
                                        />
                                        <Controller
                                            name='description'
                                            control={control}
                                            render={({ field, fieldState: { error } }) => (
                                                <TextArea label='Ghi chú' error={error} {...field} />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!_.isEmpty(categorySpending.data) && (
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