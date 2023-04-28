import { useTranslation } from 'react-i18next'
import { Box, Divider, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { BudgetCategory, BudgetMethod, Method, MobileMenu, Recent, Statistic } from '../components'
import useDashboard from '../hook/useDashboard'

const Dashboard = () => {
    const { t } = useTranslation()
    const [{ method, recent, statistic, budget }, handleReload, dataStatistic] = useDashboard()

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.SPENDING)}>
            <MobileMenu />

            <Divider className='py-6 xl:hidden' dashed />

            {/* Show analytics */}
            <Box>
                <Box.Content
                    className='col-span-1 xl:col-span-2 xl:col-start-1 xl:row-start-1'
                    title={dataStatistic?.dateRange.join(' - ') || ' '}
                    onReload={handleReload}
                    loading={statistic.loading}
                    seeMore={false}
                    fullWidth
                >
                    <Statistic data={dataStatistic?.data} loading={statistic.loading} />
                </Box.Content>

                <div className='col-span-1 flex flex-col gap-4 xl:col-start-1 xl:row-start-2 xl:gap-6'>
                    <Box.Content
                        title={t(LANGUAGE.BUDGET_BY_CATEGORY)}
                        onReload={handleReload}
                        loading={budget?.loading}
                        fullWidth
                        seeMore={false}
                    >
                        <BudgetCategory data={budget?.data} loading={Boolean(budget?.loading)} />
                    </Box.Content>

                    <Box.Content
                        title={t(LANGUAGE.BUDGET_BY_METHOD)}
                        onReload={handleReload}
                        loading={budget?.loading}
                        fullWidth
                        seeMore={false}
                    >
                        <BudgetMethod data={budget?.data} loading={Boolean(budget?.loading)} />
                    </Box.Content>
                </div>

                <div className='col-span-1 flex flex-col gap-4 xl:col-start-2 xl:row-start-2 xl:gap-6'>
                    <Box.Content
                        title={t(LANGUAGE.TRANSACTION_RECENT)}
                        to='transaction'
                        onReload={handleReload}
                        loading={recent.loading}
                        fullWidth
                    >
                        <Recent data={recent.data} loading={recent.loading} />
                    </Box.Content>

                    <Box.Content
                        title={t(LANGUAGE.METHOD_SPENDING)}
                        to='method'
                        onReload={handleReload}
                        loading={method.loading}
                        fullWidth
                    >
                        <Method data={method.data} loading={method.loading} />
                    </Box.Content>
                </div>
            </Box>
        </Transaction>
    )
}

export default Dashboard
