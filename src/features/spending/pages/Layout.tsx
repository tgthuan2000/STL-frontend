import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { isEqual } from 'lodash'
import { useEffect } from 'react'
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { Box, Button, Transaction } from '~/components'
import { DEFAULT_SPENDING_LAYOUT, SPENDING_LAYOUT } from '~/constant/render-layout'
import { useConfig } from '~/context'
import { useDynamicRender } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const Layout = () => {
    const { t } = useTranslation()
    const { getLayoutGroup } = useConfig()

    const { renderComponent, setElement, updateLayout } = useDynamicRender({
        RootLayout: Box.Container,
        ElementsLayout: Box.DraggableWrapContent,
        layouts: getLayoutGroup('SPENDING_DASHBOARD')?.items ?? DEFAULT_SPENDING_LAYOUT,
    })

    useEffect(() => {
        setElement({
            [SPENDING_LAYOUT.STATISTIC]: ({ id, order }) => (
                <Box.SkeletonContent id={id} index={order} title={t(LANGUAGE.STATISTIC)} />
            ),
            [SPENDING_LAYOUT.BUDGET_CATEGORY]: ({ id, order }) => (
                <Box.SkeletonContent id={id} index={order} title={t(LANGUAGE.BUDGET_BY_CATEGORY)} />
            ),
            [SPENDING_LAYOUT.BUDGET_METHOD]: ({ id, order }) => (
                <Box.SkeletonContent id={id} index={order} title={t(LANGUAGE.BUDGET_BY_METHOD)} />
            ),
            [SPENDING_LAYOUT.TRANSACTION_RECENT]: ({ id, order }) => (
                <Box.SkeletonContent id={id} index={order} title={t(LANGUAGE.TRANSACTION_RECENT)} />
            ),
            [SPENDING_LAYOUT.METHOD_SPENDING]: ({ id, order }) => (
                <Box.SkeletonContent id={id} index={order} title={t(LANGUAGE.METHOD_SPENDING)} />
            ),
        })
    }, [t])

    const handleAddGroup = () => {}

    const handleSave = () => {}

    const handleReset = () => {}

    const handleDragEnd: OnDragEndResponder = (values, provided) => {
        const { source, destination } = values

        if (!destination) {
            return
        }

        if (isEqual(destination, source)) {
            return
        }

        console.log(values)
        updateLayout(
            { index: +source.droppableId, order: source.index },
            { index: +destination.droppableId, order: destination.index }
        )
    }

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.SPENDING)}>
            {/* Show analytics */}
            <div className='flex flex-col gap-8 rounded-2xl bg-gray-200 p-4 dark:bg-slate-800 sm:p-6'>
                <div className='flex justify-end gap-4'>
                    <Button type='button' color='blue' onClick={handleReset}>
                        {t(LANGUAGE.REFRESH)}
                    </Button>
                    <Button type='button' color='indigo' onClick={handleSave}>
                        {t(LANGUAGE.SAVE)}
                    </Button>
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>{renderComponent}</DragDropContext>
            </div>
        </Transaction>
    )
}

export default Layout
