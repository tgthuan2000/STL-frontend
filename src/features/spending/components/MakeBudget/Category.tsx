import { PlusCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { ICategorySpending, MakeBudgetProps } from '~/@types/spending'
import { Button } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import Item from './Item'
import useFieldMakeBudget from './service'

const AddCategory = React.lazy(() => import('../AddCategory'))

type Props = MakeBudgetProps & { optionData: ICategorySpending[] | undefined; optionLoading: boolean }

const Category: React.FC<Props> = (props) => {
    const { form, optionData, onDelItem, loading, optionLoading } = props
    const { t } = useTranslation()

    const { fields, handleAddItem, handleDeleteItem, handleAvgAmountChange, handleAmountChange } = useFieldMakeBudget({
        form,
        name: 'CategorySpending',
        appendOption: { amount: '', avgAmount: '', categorySpending: null },
        onDelItem,
    })

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
                {t(LANGUAGE.CREATE_CATEGORY)}
            </Button>
            <div className='space-y-4'>
                {optionData &&
                    fields.map(({ id }, index) => (
                        <Item
                            key={id}
                            form={form}
                            index={index}
                            fieldName='CategorySpending'
                            optionData={optionData}
                            optionLoading={optionLoading}
                            onAvgAmountChange={handleAvgAmountChange}
                            onAmountChange={handleAmountChange}
                            onDeleteItem={handleDeleteItem}
                            EmptyOptionFallback={<EmptyOptionFallback />}
                            option={{
                                label: t(LANGUAGE.CATEGORY),
                                autocompleteName: 'categorySpending',
                            }}
                        />
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
            url.set('slide', 'add-category')
            return url
        })

        set({
            title: t(LANGUAGE.CREATE_CATEGORY),
            content: <AddCategory />,
            slide: 'add-category',
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

export default Category
