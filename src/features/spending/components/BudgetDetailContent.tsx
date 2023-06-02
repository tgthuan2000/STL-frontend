import { get, isEmpty } from 'lodash'
import numeral from 'numeral'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimateWrap, Paper, ProgressLine } from '~/components'
import Title from '~/components/Box/Title'
import * as Atom from '~/components/_atomic/Atom'
import * as Template from '~/components/_atomic/Template'
import LANGUAGE from '~/i18n/language/key'
import { getLinkSpending } from '~/utils'
import useBudgetChart from '../hook/useBudgetChart'
import { BudgetCategoryDetail, BudgetMethodDetail } from '../hook/useBudgetDetail'
import useChartTool from '../hook/useChartTool'

interface Props {
    type: 'categorySpending' | 'methodSpending'
    data: BudgetCategoryDetail | BudgetMethodDetail | undefined
    loading: boolean
    reload: () => void
}

const BudgetDetailContent: React.FC<Props> = (props) => {
    const { type, data, loading, reload } = props
    const { t } = useTranslation()
    const { chartTypes, chartType, setChartType } = useChartTool()
    const { amounts, annotations, charts, progress, statistic } = useBudgetChart(data)

    const generateDataChart = useMemo(() => {
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

    const dataAnnotation = useMemo(() => {
        switch (chartType) {
            case 'bar': {
                return annotations.avg ?? {}
            }
            case 'line': {
                return annotations.total ?? {}
            }
        }
    }, [chartType, annotations])

    return (
        <div className='mt-5 flex flex-col gap-8 sm:gap-4 lg:flex-row'>
            <div className='flex-[1.25]'>
                <div className='sticky top-20'>
                    <Title title={t(LANGUAGE.PROGRESS)} onReload={reload} loading={loading} />
                    <Paper className='space-y-2 sm:space-y-2'>
                        <AnimateWrap className='-mx-2 -mt-3'>
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
                                        data={[{ color: get(item, 'bgColor'), percent: get(item, 'percent') }]}
                                        background={get(item, 'bgColor')}
                                    />
                                )}
                                renderTitle={(item) => <Atom.Title title={get(item, `${type}.name`)} />}
                            />
                        </AnimateWrap>

                        <AnimateWrap>
                            <Template.CardInfo
                                data={statistic}
                                loading={loading}
                                fallback={<Atom.EmptyList />}
                                loadingFallback={<Atom.CardInfoSkeleton elNumber={6} />}
                                getItemKey={(item) => get(item, 'id')}
                                getClassName={(item) => get(item, 'className')}
                                renderIcon={(item) => <Atom.CardIcon Icon={get(item, 'Icon')} />}
                                renderTitle={(item) => get(item, 'title')}
                                renderSubTitle={(item) => (
                                    <Atom.Amount
                                        amount={get(item, 'amount')}
                                        suffix={<Atom.Suffix suffix={get(item, 'suffix')} />}
                                    />
                                )}
                            />
                        </AnimateWrap>
                    </Paper>
                    <Paper disabledPadding className='mt-2 sm:mt-5'>
                        <Template.TransactionChart
                            renderTitle={
                                <Atom.TransactionTitle
                                    title={t(LANGUAGE.TRANSACTION)}
                                    subTitle={
                                        <Atom.Content
                                            hidden={!data?.amount}
                                            title={numeral(amounts).format()}
                                            subTitle={'/' + numeral(data?.amount).format()}
                                        />
                                    }
                                />
                            }
                            renderTool={
                                <AnimateWrap>
                                    <Atom.ChartTool
                                        hidden={isEmpty(generateDataChart?.())}
                                        data={chartTypes}
                                        onSubmit={({ chartType }) => setChartType(chartType.id)}
                                    />
                                </AnimateWrap>
                            }
                            renderChart={
                                <Template.Chart
                                    getSeries={generateDataChart}
                                    loading={loading}
                                    type={chartType}
                                    annotations={dataAnnotation}
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
                            data={data?.spending}
                            loading={loading}
                            fallback={<Atom.EmptyList />}
                            loadingFallback={<Atom.RecentListSkeleton elNumber={7} />}
                            getItemKey={(item) => get(item, '_id')}
                            getItemLink={(item) => getLinkSpending(get(item, 'kindSpending.key'), get(item, '_id'))}
                            renderDate={(item) => <Atom.Date date={get(item, 'date')} fallback={<></>} />}
                            renderMethod={(item) => (
                                <Atom.Title title={get(item, 'methodSpending.name')} fallback={<></>} />
                            )}
                            renderAmount={(item) => (
                                <Atom.Amount amount={get(item, 'amount')} className='text-red-500' />
                            )}
                            renderCategory={(item) => <Atom.Title title={get(item, 'categorySpending.name')} />}
                            renderDescription={(item) => <Atom.Description data={get(item, 'description')} />}
                        />
                    </AnimateWrap>
                </Paper>
            </div>
        </div>
    )
}

export default memo(BudgetDetailContent)
