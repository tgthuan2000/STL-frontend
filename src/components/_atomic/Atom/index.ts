import { lazy } from 'react'

const Atom = {
    Amount: lazy(() => import('./Amount')),
    BudgetListSkeleton: lazy(() => import('./BudgetListSkeleton')),
    CardIcon: lazy(() => import('./CardIcon')),
    CardInfoSkeleton: lazy(() => import('./CardInfoSkeleton')),
    ChartTool: lazy(() => import('./ChartTool')),
    Content: lazy(() => import('./Content')),
    Date: lazy(() => import('./Date')),
    Description: lazy(() => import('./Description')),
    Dot: lazy(() => import('./Dot')),
    EmptyList: lazy(() => import('./EmptyList')),
    RecentListSkeleton: lazy(() => import('./RecentListSkeleton')),
    SimpleListSkeleton: lazy(() => import('./SimpleListSkeleton')),
    SmallIcon: lazy(() => import('./SmallIcon')),
    Square: lazy(() => import('./Square')),
    Suffix: lazy(() => import('./Suffix')),
    Title: lazy(() => import('./Title')),
    ChartTitle: lazy(() => import('./TransactionTitle')),
}

export default Atom
