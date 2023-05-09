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

export const DEFAULT_SPENDING_LAYOUT = [
    { layout: { key: SPENDING_LAYOUT.STATISTIC }, index: 1, order: 1 },
    { layout: { key: SPENDING_LAYOUT.BUDGET_CATEGORY }, index: 1, order: 2 },
    { layout: { key: SPENDING_LAYOUT.BUDGET_METHOD }, index: 1, order: 3 },
    { layout: { key: SPENDING_LAYOUT.TRANSACTION_RECENT }, index: 2, order: 1 },
    { layout: { key: SPENDING_LAYOUT.METHOD_SPENDING }, index: 2, order: 2 },
]
