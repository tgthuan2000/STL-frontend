import { get, isEmpty } from 'lodash'
import numeral from 'numeral'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimateWrap, Button, Paper, ProgressLine } from '~/components'
import Title from '~/components/Box/Title'
import LoadingText from '~/components/Loading/LoadingText'
import Atom from '~/components/_atomic/Atom'
import Template from '~/components/_atomic/Template'
import { useDetailDialog } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import useChartTool from '../../hook/useChartTool'
import useLongBudgetChart from '../../hook/useLongBudgetChart'
import { LongBudgetDetail, LongBudgetDetailItem } from '../../hook/useLongBudgetDetail'
import { useParams } from 'react-router-dom'

const DetailTran = React.lazy(() => import('./DetailTran'))

interface Props {
    data: LongBudgetDetail | undefined
    loading: boolean
    reload(): void
    clearCache(): void
}

const Content: React.FC<Props> = (props) => {
    const { data, loading, reload, clearCache } = props
    const { t } = useTranslation()
    const { chartTypes, chartType, setChartType } = useChartTool()
    const { progress, amounts, statistic, charts, notes } = useLongBudgetChart(data)
    const { set } = useDetailDialog()
    const { id } = useParams()

    const dataChart = useMemo(() => {
        if (charts) {
            switch (chartType) {
                case 'bar': {
                    return charts.daily
                }
                case 'line': {
                    return charts.total
                }
            }
        }
    }, [chartType, charts])

    const handleDetailTran = (item: LongBudgetDetailItem) => {
        set({
            title: t(LANGUAGE.TRANSACTION_DETAIL),
            content: <DetailTran data={item} clearCache={clearCache} />,
            fallback: <LoadingText />,
        })
    }

    const handleCreateTran = () => {
        set({
            title: t(LANGUAGE.CREATE_NEW),
            content: <DetailTran clearCache={clearCache} budgetId={id} />,
            fallback: <LoadingText />,
        })
    }

    return (
        <div className='mt-5 flex flex-col gap-8 sm:gap-4 lg:flex-row'>
            <div className='flex-[1.25]'>
                <div className='sticky top-20'>
                    <Title title={t(LANGUAGE.PROGRESS)} onReload={reload} loading={loading} />
                    <Paper>
                        <AnimateWrap className='-mx-2 -mt-3 -mb-2'>
                            <Template.BudgetProgressList
                                data={progress}
                                loading={loading}
                                fallback={<Atom.EmptyList />}
                                loadingFallback={<Atom.BudgetListSkeleton elNumber={1} />}
                                getItemKey={(item) => get(item, '_id')}
                                renderAmount={(item) => (
                                    <Atom.Amount amount={get(item, 'amount')} className={get(item, 'color')} />
                                )}
                                renderProgress={(item) => (
                                    <ProgressLine
                                        data={get(item, 'items', []).map((item: any) => ({
                                            color: get(item, 'bgColor'),
                                            percent: get(item, 'percent'),
                                        }))}
                                        background={get(item, 'bgColor')}
                                    />
                                )}
                                renderTitle={(item) => <Atom.Title title={get(item, 'title')} />}
                            />
                        </AnimateWrap>

                        <AnimateWrap className='mt-2 mb-4'>
                            <Template.ChartNote
                                data={notes}
                                loading={loading}
                                fallback={<></>}
                                loadingFallback={<></>}
                                getItemKey={(item) => get(item, 'id')}
                                renderNoteTitle={(item) => <Atom.Title title={get(item, 'methodName')} />}
                                renderNoteSquare={(item) => (
                                    <Atom.Square style={{ background: get(item, 'bgColor') }} />
                                )}
                            />
                        </AnimateWrap>

                        <AnimateWrap>
                            <Template.SmallStatisticList
                                data={statistic}
                                loading={loading}
                                fallback={<Atom.EmptyList />}
                                loadingFallback={<Atom.SmallStatisticListSkeleton elNumber={6} />}
                                getItemKey={(item) => get(item, 'id')}
                                getClassName={(item) => get(item, 'className')}
                                getIcon={(item) => get(item, 'Icon')}
                                renderAmount={(item) => <CustomAmount data={item} />}
                                renderTitle={(item) => get(item, 'title')}
                            />
                        </AnimateWrap>
                        <AnimateWrap className='mt-5'>
                            <Button
                                type='button'
                                color='pink'
                                className='w-full'
                                onClick={handleCreateTran}
                                disabled={loading}
                            >
                                {t(LANGUAGE.CREATE_NEW)}
                            </Button>
                        </AnimateWrap>
                    </Paper>
                    <Paper disabledPadding className='mt-2 sm:mt-5'>
                        <Template.TransactionChart
                            renderTitle={
                                <Atom.ChartTitle
                                    title={t(LANGUAGE.TRANSACTION)}
                                    subTitle={
                                        <Atom.SlashTitle
                                            hidden={!data?.amount}
                                            title={numeral(amounts).format()}
                                            subTitle={numeral(data?.amount).format()}
                                        />
                                    }
                                />
                            }
                            renderTool={
                                <AnimateWrap>
                                    <Atom.ChartTool
                                        hidden={isEmpty(dataChart)}
                                        data={chartTypes}
                                        onSubmit={({ chartType }) => setChartType(chartType.id)}
                                    />
                                </AnimateWrap>
                            }
                            renderChart={
                                <Template.Chart
                                    getSeries={dataChart}
                                    loading={loading}
                                    type={chartType}
                                    annotations={{}}
                                />
                            }
                        />
                    </Paper>
                </div>
            </div>
            <div className='flex-1'>
                <Title title={t(LANGUAGE.TRANSACTION)} onReload={reload} loading={loading} />
                <Paper disabledPadding>
                    <AnimateWrap>
                        <Template.RecentList
                            data={data?.items}
                            loading={loading}
                            fallback={<Atom.EmptyList />}
                            loadingFallback={<Atom.RecentListSkeleton elNumber={7} />}
                            onItemClick={handleDetailTran}
                            getItemKey={(item) => get(item, '_id')}
                            renderDate={(item) => <Atom.Date date={get(item, '_createdAt')} fallback={<></>} />}
                            renderMethod={(item) => <Atom.Title title={get(item, 'method.name')} fallback={<></>} />}
                            renderAmount={(item) => (
                                <Atom.Amount amount={get(item, 'amount')} className='text-pink-500' />
                            )}
                            renderDescription={(item) => <Atom.Description data={get(item, 'description')} />}
                        />
                    </AnimateWrap>
                </Paper>
            </div>
        </div>
    )
}

const CustomAmount = (props: { data: any }) => {
    const { data } = props

    switch (get(data, 'type')) {
        case 'number': {
            return <Atom.Amount amount={get(data, 'value')} suffix={<Atom.Suffix suffix={get(data, 'suffix')} />} />
        }
        case 'date': {
            return <Atom.Date date={get(data, 'value')} />
        }
        default:
            return <></>
    }
}

export default memo(Content)
