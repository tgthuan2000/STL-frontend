import { lazy } from 'react'

const Template = {
    BudgetProgressList: lazy(() => import('./BudgetProgressList')),
    Chart: lazy(() => import('./Chart')),
    ChartNote: lazy(() => import('./ChartNote')),
    RecentList: lazy(() => import('./RecentList')),
    SimpleList: lazy(() => import('./SimpleList')),
    CardInfo: lazy(() => import('./CardInfo')),
    TransactionChart: lazy(() => import('./TransactionChart')),
}

export default Template
