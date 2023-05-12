import { LayoutItem } from '~/@types/context'

export enum LAYOUT_GROUP {
    SPENDING_DASHBOARD = 'spending-dashboard',
}

export enum SPENDING_LAYOUT {
    STATISTIC = 'spending-statistic',
    BUDGET_CATEGORY = 'spending-budget-category',
    BUDGET_METHOD = 'spending-budget-method',
    TRANSACTION_RECENT = 'spending-transaction-recent',
    METHOD_SPENDING = 'spending-method-spending',
}

export const DEFAULT_SPENDING_LAYOUT: LayoutItem[] = [
    {
        layouts: [
            { key: SPENDING_LAYOUT.STATISTIC },
            { key: SPENDING_LAYOUT.BUDGET_CATEGORY },
            { key: SPENDING_LAYOUT.BUDGET_METHOD },
        ],
    },
    {
        layouts: [{ key: SPENDING_LAYOUT.TRANSACTION_RECENT }, { key: SPENDING_LAYOUT.METHOD_SPENDING }],
    },
]
