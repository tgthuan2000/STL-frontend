import { useAutoAnimate } from '@formkit/auto-animate/react'
import { PlusCircleIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import { isEmpty } from 'lodash'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { ICategorySpending, MakeBudgetProps } from '~/@types/spending'
import { Button, Chip } from '~/components'
import { AutoComplete, Input } from '~/components/_base'

const Category: React.FC<MakeBudgetProps & { optionData: ICategorySpending[] | undefined; optionLoading: boolean }> = ({
    form,
    budgetLoading,
    optionData,
    onDelItem,
    loading,
    optionLoading,
}) => {
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
                        Thêm thể loại
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
                                    label='Thể loại'
                                    loading={optionLoading}
                                />
                            </div>
                            <div className='flex-1'>
                                <Input
                                    name={`CategorySpending.${index}.amount`}
                                    form={form}
                                    type='number'
                                    label='Hạn mức'
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
