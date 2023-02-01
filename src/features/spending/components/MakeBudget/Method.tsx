import { useAutoAnimate } from '@formkit/auto-animate/react'
import { PlusCircleIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IMethodSpending, MakeBudgetProps } from '~/@types/spending'
import { Button } from '~/components'
import { AutoComplete, Input } from '~/components/_base'
import LANGUAGE from '~/i18n/language/key'

const Method: React.FC<MakeBudgetProps & { optionData: IMethodSpending[] | undefined; optionLoading: boolean }> = ({
    form,
    budgetLoading,
    optionData,
    onDelItem,
    loading,
    optionLoading,
}) => {
    const { t } = useTranslation()
    const [wrapRef] = useAutoAnimate<HTMLDivElement>()
    const [loadingRef] = useAutoAnimate<HTMLButtonElement>()

    const { fields, append, remove } = useFieldArray({
        name: 'MethodSpending' as never,
        control: form.control,
    })

    const handleAddItem = () => {
        append({
            amount: '',
            methodSpending: null,
        })
    }

    const handleDeleteItem = (id: string | null | undefined, index: number) => {
        remove(index)
        onDelItem('MethodSpending', id)
    }

    return (
        <>
            <Button
                type='button'
                color='outline-cyan'
                className='items-center gap-1 truncate mb-2'
                onClick={handleAddItem}
                disabled={loading}
                ref={loadingRef}
            >
                {budgetLoading ? (
                    <RefreshIcon className='h-6 w-6 animate-spin -scale-100' />
                ) : (
                    <>
                        <PlusCircleIcon className='h-6 w-6' />
                        {t(LANGUAGE.CREATE_METHOD)}
                    </>
                )}
            </Button>
            <div className='space-y-6' ref={wrapRef}>
                {fields.map((item, index) => (
                    <div key={item.id}>
                        <div className='flex justify-start'>
                            <button
                                type='button'
                                className='text-radical-red-500 disabled:text-gray-300 cursor-pointer hover:opacity-50 disabled:hover:opacity-100 disabled:cursor-not-allowed transition-all'
                                onClick={() => {
                                    handleDeleteItem(form.getValues(`MethodSpending.${index}._id`), index)
                                }}
                            >
                                <TrashIcon className='h-6 w-6' />
                            </button>
                        </div>
                        <div className='flex gap-3'>
                            <div className='flex-[2]'>
                                <AutoComplete
                                    name={`MethodSpending.${index}.methodSpending`}
                                    form={form}
                                    data={optionData}
                                    label={t(LANGUAGE.METHOD)}
                                    loading={optionLoading}
                                />
                            </div>
                            <div className='flex-1'>
                                <Input
                                    name={`MethodSpending.${index}.amount`}
                                    form={form}
                                    type='number'
                                    label={t(LANGUAGE.LIMIT_AMOUNT)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Method
