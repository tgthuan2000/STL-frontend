import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Divider, Transaction } from '~/components'
import { DEFAULT_SPENDING_LAYOUT, LAYOUT_GROUP, SPENDING_LAYOUT } from '~/constant/render-layout'
import { useDynamicRender, useLayout } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { BudgetCategory, BudgetMethod } from '../components/Budget'
import LongBudget from '../components/LongBudget'
import Method from '../components/Method'
import MobileMenu from '../components/MobileMenu'
import Recent from '../components/Recent'
import Statistic from '../components/Statistic'
import useDashboard from '../hook/useDashboard'

const Dashboard = () => {
    const { t } = useTranslation()
    const [data, onReload, dataStatistic] = useDashboard()

    const {
        data: { layouts },
    } = useLayout({
        defaultGroupKey: LAYOUT_GROUP.SPENDING_DASHBOARD,
        defaultLayout: DEFAULT_SPENDING_LAYOUT,
        key: 'SPENDING_DASHBOARD',
    })

    const { renderComponent, setElement } = useDynamicRender({
        RootLayout: Box.Container,
        ElementsLayout: Box.WrapContent,
        layouts,
    })

    useEffect(() => {
        const { method, recent, statistic, budget, longBudget } = data

        setElement({
            [SPENDING_LAYOUT.STATISTIC]: (
                <Box.Content
                    title={dataStatistic?.dateRange.join(' - ') || ' '}
                    onReload={onReload}
                    loading={statistic.loading}
                >
                    <Statistic data={dataStatistic?.data} loading={statistic.loading} />
                </Box.Content>
            ),
            [SPENDING_LAYOUT.LONG_BUDGET]: (
                <Box.Content title={t(LANGUAGE.LONG_BUDGET)} onReload={onReload} loading={longBudget?.loading}>
                    <LongBudget data={longBudget?.data} loading={Boolean(longBudget?.loading)} />
                </Box.Content>
            ),
            [SPENDING_LAYOUT.BUDGET_CATEGORY]: (
                <Box.Content title={t(LANGUAGE.BUDGET_BY_CATEGORY)} onReload={onReload} loading={budget?.loading}>
                    <BudgetCategory data={budget?.data} loading={Boolean(budget?.loading)} />
                </Box.Content>
            ),
            [SPENDING_LAYOUT.BUDGET_METHOD]: (
                <Box.Content title={t(LANGUAGE.BUDGET_BY_METHOD)} onReload={onReload} loading={budget?.loading}>
                    <BudgetMethod data={budget?.data} loading={Boolean(budget?.loading)} />
                </Box.Content>
            ),
            [SPENDING_LAYOUT.TRANSACTION_RECENT]: (
                <Box.Content
                    title={t(LANGUAGE.TRANSACTION_RECENT)}
                    to='transaction'
                    onReload={onReload}
                    loading={recent.loading}
                >
                    <Recent data={recent.data} loading={recent.loading} />
                </Box.Content>
            ),
            [SPENDING_LAYOUT.METHOD_SPENDING]: (
                <Box.Content
                    title={t(LANGUAGE.METHOD_SPENDING)}
                    // to='method'
                    onReload={onReload}
                    loading={method.loading}
                >
                    <Method data={method.data} loading={method.loading} />
                </Box.Content>
            ),
        })
    }, [data, t])

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.SPENDING)}>
            <MobileMenu />

            <Divider className='pt-6 xl:hidden' dashed />

            {/* Show analytics */}
            {renderComponent}
        </Transaction>
    )
}

export default Dashboard
