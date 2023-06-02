import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { IMethodSpending, MakeBudgetProps } from '~/@types/spending'
import { Button } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import Item from './Item'
import useFieldMakeBudget from './service'

const AddMethod = lazy(() => import('../AddMethod'))

type Props = MakeBudgetProps & { optionData: IMethodSpending[] | undefined; optionLoading: boolean }

const Method: React.FC<Props> = (props) => {
    const { form, optionData, onDelItem, loading, optionLoading } = props
    const { t } = useTranslation()

    const { fields, handleAddItem, handleDeleteItem, handleAvgAmountChange, handleAmountChange } = useFieldMakeBudget({
        form,
        name: 'MethodSpending',
        appendOption: { amount: '', avgAmount: '', methodSpending: null },
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
                {t(LANGUAGE.CREATE_METHOD)}
            </Button>
            <div className='space-y-4'>
                {optionData &&
                    fields.map(({ id }, index) => (
                        <Item
                            key={id}
                            form={form}
                            index={index}
                            fieldName='MethodSpending'
                            optionData={optionData}
                            optionLoading={optionLoading}
                            onAvgAmountChange={handleAvgAmountChange}
                            onAmountChange={handleAmountChange}
                            onDeleteItem={handleDeleteItem}
                            EmptyOptionFallback={<EmptyOptionFallback />}
                            option={{
                                label: t(LANGUAGE.METHOD),
                                autocompleteName: 'methodSpending',
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
