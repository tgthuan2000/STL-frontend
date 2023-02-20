import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowPathIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ICategorySpending, MakeBudgetProps } from '~/@types/spending'
import { Button } from '~/components'
import { AutoComplete, Input } from '~/components/_base'
import LANGUAGE from '~/i18n/language/key'

const Category: React.FC<MakeBudgetProps & { optionData: ICategorySpending[] | undefined; optionLoading: boolean }> = ({
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
        name: 'CategorySpending' as never,
        control: form.control,
    })

    const handleAddItem = () => {
        append({
            amount: '',
            categorySpending: null,
        })
    }

    const handleDeleteItem = (id: string | null | undefined, index: number) => {
        remove(index)
        onDelItem('CategorySpending', id)
    }

    return (
        <>
            <Button
                type='button'
                color='outline-cyan'
                className='mb-2 items-center gap-1 truncate'
                onClick={handleAddItem}
                disabled={loading}
                ref={loadingRef}
            >
                {budgetLoading ? (
                    <ArrowPathIcon className='h-6 w-6 animate-spin' />
                ) : (
                    <>
                        <PlusCircleIcon className='h-6 w-6' />
                        {t(LANGUAGE.CREATE_CATEGORY)}
                    </>
                )}
            </Button>
            <div className='space-y-6' ref={wrapRef}>
                {fields.map((item, index) => (
                    <div key={item.id}>
                        <div className='flex justify-start'>
                            <button
                                type='button'
                                className='cursor-pointer text-radical-red-500 transition-all hover:opacity-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:opacity-100'
                                onClick={() => {
                                    handleDeleteItem(form.getValues(`CategorySpending.${index}._id`), index)
                                }}
                            >
                                <TrashIcon className='h-6 w-6' />
                            </button>
                        </div>
                        <div className='flex gap-3'>
                            <div className='flex-[2]'>
                                <AutoComplete
                                    name={`CategorySpending.${index}.categorySpending`}
                                    form={form}
                                    data={optionData}
                                    label={t(LANGUAGE.CATEGORY)}
                                    loading={optionLoading}
                                />
                            </div>
                            <div className='flex-1'>
                                <Input
                                    name={`CategorySpending.${index}.amount`}
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

export default Category
