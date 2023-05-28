import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ICategorySpending, IMakeBudgetForm, IMethodSpending } from '~/@types/spending'
import { AutoComplete, Input } from '~/components/_base'
import LANGUAGE from '~/i18n/language/key'

interface ItemProps {
    form: UseFormReturn<IMakeBudgetForm, object>
    index: number
    fieldName: 'MethodSpending' | 'CategorySpending'
    onAvgAmountChange: (index: number, value: number) => void
    onAmountChange: (index: number, value: number) => void
    onDeleteItem: (id: string | null | undefined, index: number) => void
    optionData: Array<IMethodSpending | ICategorySpending>
    optionLoading: boolean
    EmptyOptionFallback: React.ReactNode
    option: {
        label: string
        autocompleteName: 'categorySpending' | 'methodSpending'
    }
}

const Item: React.FC<ItemProps> = (props) => {
    const {
        form,
        fieldName,
        index,
        optionData,
        optionLoading,
        onAmountChange,
        onAvgAmountChange,
        onDeleteItem,
        EmptyOptionFallback,
        option,
    } = props
    const { t } = useTranslation()
    const w_date = form.watch('date')

    useEffect(() => {
        let timeout: NodeJS.Timeout
        const amount = form.getValues(`${fieldName}.${index}.amount`)

        if (amount) {
            timeout = setTimeout(() => {
                if (amount) {
                    onAmountChange(index, amount)
                }
            }, 1000)
        }

        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [w_date])

    return (
        <div>
            <div className='mb-2 flex justify-start'>
                <button
                    type='button'
                    className='cursor-pointer text-radical-red-500 transition-all hover:opacity-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:opacity-100'
                    onClick={() => {
                        onDeleteItem(form.getValues(`${fieldName}.${index}._id`), index)
                    }}
                >
                    <TrashIcon className='h-6 w-6' />
                </button>
            </div>
            <AutoComplete
                name={`${fieldName}.${index}.${option.autocompleteName}`}
                form={form}
                data={optionData}
                label={option.label}
                loading={optionLoading}
                EmptyOptionFallback={EmptyOptionFallback}
            />
            <div className='mt-3 flex gap-3'>
                <div className='flex-1'>
                    <Input
                        name={`${fieldName}.${index}.avgAmount`}
                        form={form}
                        type='number'
                        label={t(LANGUAGE.AVERAGE_EACH_DAY_OF_MONTH_AMOUNT)}
                        onChange={(value) => onAvgAmountChange(index, Number(value))}
                        autoFocus={false}
                    />
                </div>
                <div className='flex-1'>
                    <Input
                        name={`${fieldName}.${index}.amount`}
                        form={form}
                        type='number'
                        label={t(LANGUAGE.LIMIT_AMOUNT)}
                        onChange={(value) => onAmountChange(index, Number(value))}
                        autoFocus={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default Item
