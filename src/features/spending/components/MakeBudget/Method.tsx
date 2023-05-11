import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { IMethodSpending, MakeBudgetProps } from '~/@types/spending'
import { AnimateWrap, Button } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { AutoComplete, Input } from '~/components/_base'
import { useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const AddMethod = React.lazy(() => import('../AddMethod'))

const Method: React.FC<MakeBudgetProps & { optionData: IMethodSpending[] | undefined; optionLoading: boolean }> = ({
    form,
    optionData,
    onDelItem,
    loading,
    optionLoading,
}) => {
    const { t } = useTranslation()

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
                className='mb-4 items-center gap-1 truncate'
                onClick={handleAddItem}
                disabled={loading}
            >
                <PlusCircleIcon className='h-6 w-6' />
                {t(LANGUAGE.CREATE_METHOD)}
            </Button>
            <div className='space-y-4'>
                {fields.map((item, index) => (
                    <div key={item.id}>
                        <div className='mb-2 flex justify-start'>
                            <button
                                type='button'
                                className='cursor-pointer text-radical-red-500 transition-all hover:opacity-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:opacity-100'
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
                                    EmptyOptionFallback={<EmptyOptionFallback />}
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

const EmptyOptionFallback = () => {
    const { t } = useTranslation()
    const [, setSearchParams] = useSearchParams()
    const { set } = useSlideOver()

    const handleClick = () => {
        setSearchParams((prev) => {
            const url = new URLSearchParams(prev)
            url.set('slide', 'add-method')
            return url
        })

        set({
            title: t(LANGUAGE.CREATE_METHOD),
            content: <AddMethod />,
            slide: 'add-method',
            fallback: <LoadingText />,
        })
    }

    return (
        <button
            type='button'
            className='font-normal text-indigo-600 hover:opacity-70 dark:text-cyan-500'
            onClick={handleClick}
        >
            {t(LANGUAGE.CREATE_NEW)}
        </button>
    )
}

export default Method
