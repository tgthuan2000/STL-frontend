import { LayoutItem } from '~/@types/context'

export enum LAYOUT_GROUP {
    SPENDING_DASHBOARD = 'spending-dashboard',
}

export enum SPENDING_LAYOUT {
    STATISTIC = 'spending-statistic',
    LONG_BUDGET = 'spending-long-budget',
    BUDGET_CATEGORY = 'spending-budget-category',
    BUDGET_METHOD = 'spending-budget-method',
    TRANSACTION_RECENT = 'spending-transaction-recent',
    METHOD_SPENDING = 'spending-method-spending',
}

export const DEFAULT_SPENDING_LAYOUT: LayoutItem[] = [
    {
        layouts: [
            { _id: SPENDING_LAYOUT.STATISTIC },
            { _id: SPENDING_LAYOUT.LONG_BUDGET },
            { _id: SPENDING_LAYOUT.BUDGET_CATEGORY },
            { _id: SPENDING_LAYOUT.BUDGET_METHOD },
        ],
    },
    {
        layouts: [{ _id: SPENDING_LAYOUT.TRANSACTION_RECENT }, { _id: SPENDING_LAYOUT.METHOD_SPENDING }],
    },
]
