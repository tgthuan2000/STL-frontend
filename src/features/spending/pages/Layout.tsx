import { isEqual } from 'lodash'
import { useEffect } from 'react'
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { LayoutItem } from '~/@types/context'
import { Box, Button, Transaction } from '~/components'
import { DEFAULT_SPENDING_LAYOUT, LAYOUT_GROUP, SPENDING_LAYOUT } from '~/constant/render-layout'
import { useConfig, useLoading } from '~/context'
import { useDynamicRender, useLayout } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { useProfile } from '~/store/auth'

const Layout = () => {
    const { t } = useTranslation()
    const { refetchLayout } = useConfig()
    const { setSubmitLoading } = useLoading()
    const { userProfile } = useProfile()

    const {
        data: { _id, layouts, group },
    } = useLayout({
        defaultGroupKey: LAYOUT_GROUP.SPENDING_DASHBOARD,
        defaultLayout: DEFAULT_SPENDING_LAYOUT,
        key: 'SPENDING_DASHBOARD',
    })

    const { renderComponent, setElement, updateLayout, reset, push, pop, submit } = useDynamicRender({
        RootLayout: Box.Container,
        ElementsLayout: Box.DraggableWrapContent,
        layouts,
    })

    useEffect(() => {
        setElement({
            [SPENDING_LAYOUT.STATISTIC]: (index) => <Box.SkeletonContent index={index} title={t(LANGUAGE.STATISTIC)} />,
            [SPENDING_LAYOUT.LONG_BUDGET]: (index) => (
                <Box.SkeletonContent index={index} title={t(LANGUAGE.LONG_BUDGET)} />
            ),
            [SPENDING_LAYOUT.BUDGET_CATEGORY]: (index) => (
                <Box.SkeletonContent index={index} title={t(LANGUAGE.BUDGET_BY_CATEGORY)} />
            ),
            [SPENDING_LAYOUT.BUDGET_METHOD]: (index) => (
                <Box.SkeletonContent index={index} title={t(LANGUAGE.BUDGET_BY_METHOD)} />
            ),
            [SPENDING_LAYOUT.TRANSACTION_RECENT]: (index) => (
                <Box.SkeletonContent index={index} title={t(LANGUAGE.TRANSACTION_RECENT)} />
            ),
            [SPENDING_LAYOUT.METHOD_SPENDING]: (index) => (
                <Box.SkeletonContent index={index} title={t(LANGUAGE.METHOD_SPENDING)} />
            ),
        })
    }, [t])

    const handleSave = async (layouts: LayoutItem[]) => {
        try {
            setSubmitLoading(true)
            const transaction = client.transaction()

            const format = (layouts: LayoutItem[]) => {
                return layouts.map(({ layouts }) => ({
                    _type: 'layoutItem',
                    layouts: layouts.map(({ _id }) => ({ _type: 'layout', _ref: _id })),
                }))
            }

            const layoutsFormatted = format(layouts)

            if (_id) {
                const patch = client.patch(_id, { set: { layouts: layoutsFormatted } })
                transaction.patch(patch)
            } else {
                const document = {
                    _type: 'layoutUser',
                    group: { _type: 'reference', _ref: group._id },
                    layouts: layoutsFormatted,
                    user: { _type: 'reference', _ref: userProfile?._id },
                }
                transaction.create(document)
            }

            await transaction.commit({ autoGenerateArrayKeys: true })
            refetchLayout()
            toast.success<string>(t(LANGUAGE.NOTIFY_UPDATE_SUCCESS))
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleDragEnd: OnDragEndResponder = (values) => {
        const { source, destination } = values

        if (!destination) {
            return
        }

        if (isEqual(destination, source)) {
            return
        }

        const from = { id: source.droppableId, index: source.index }
        const to = { id: destination.droppableId, index: destination.index }

        updateLayout(from, to)
    }

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.SPENDING)}>
            {/* Show analytics */}
            <div className='flex flex-col gap-8 rounded-2xl bg-white p-4 dark:bg-slate-800 sm:p-6'>
                <div className='flex flex-wrap justify-end gap-4'>
                    <Button type='button' color='outline-radicalRed' onClick={pop}>
                        {t(LANGUAGE.DELETE)}
                    </Button>
                    <Button type='button' color='green' onClick={push}>
                        {t(LANGUAGE.CREATE)}
                    </Button>
                    <Button type='button' color='blue' onClick={reset}>
                        {t(LANGUAGE.REFRESH)}
                    </Button>
                    <Button type='button' color='indigo' onClick={submit(handleSave)}>
                        {t(LANGUAGE.SAVE)}
                    </Button>
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>{renderComponent}</DragDropContext>
            </div>
        </Transaction>
    )
}

export default Layout
