import groq from 'groq'

export const GETALL_RECENT_SPENDING = groq`
    *[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds] | order(_updatedAt desc)
    {
        _id,
        categorySpending-> {
            name
        },
        methodSpending-> {
            name
        },
        kindSpending-> {
            name,
            key
        },
        description,
        amount,
        realPaid,
        paid,
        date,
        estimatePaidDate
    }
`

export const GET_RECENT_SPENDING_PAGINATE = groq`
    {
        "data": *[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds] | order(_updatedAt desc)[$__fromRecent...$__toRecent]
            {
                _id,
                categorySpending-> {
                    name
                },
                methodSpending-> {
                    name
                },
                kindSpending-> {
                    name,
                    key
                },
                description,
                amount,
                realPaid,
                paid,
                date,
                estimatePaidDate
            },
        "hasNextPage": count(*[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds]) > $__toRecent
    }
`

export const GET_RECENT_SPENDING_FILTER_DATE_RANGE_PAGINATE = groq`
    {
        "data": *[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds && $__startDate <= date && date <= $__endDate] | order(_updatedAt desc)[$__fromRecent...$__toRecent]
            {
                _id,
                categorySpending-> {
                    name
                },
                methodSpending-> {
                    name
                },
                kindSpending-> {
                    name,
                    key
                },
                description,
                amount,
                realPaid,
                paid,
                date,
                estimatePaidDate
            },
        "hasNextPage": count(*[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds && $__startDate <= date && date <= $__endDate]) > $__toRecent
    }
`

export const GET_RECENT_SPENDING_TOTAL = groq`
    *[_type == "kindSpending" && _id in $kindSpendingIds]
    {
        key,
        "data": *[_type == "spending" && user._ref == $userId  && kindSpending._ref == ^._id].amount,
    }
`

export const GET_RECENT_SPENDING_FILTER_DATE_RANGE_TOTAL = groq`
   *[_type == "kindSpending" && _id in $kindSpendingIds]
    {
        key,
        "data": *[_type == "spending" && user._ref == $userId  && kindSpending._ref == ^._id && $__startDate <= date && date <= $__endDate].amount,
    }
`

export const GETALL_RECENT_SPENDING_BY_METHOD = groq`
    *[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds && methodSpending._ref in $methodSpendingIds] | order(_updatedAt desc)
    {
        _id,
        categorySpending-> {
            name
        },
        methodSpending-> {
            name
        },
        kindSpending-> {
            name,
            key
        },
        description,
        amount,
        realPaid,
        paid,
        date,
        estimatePaidDate
    }
`

export const GET_RECENT_SPENDING_BY_METHOD_PAGINATE = groq`
    {
        "data": *[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds && methodSpending._ref in $methodSpendingIds] | order(_updatedAt desc)[$__fromMethod...$__toMethod]
            {
                _id,
                categorySpending-> {
                    name
                },
                methodSpending-> {
                    name
                },
                kindSpending-> {
                    name,
                    key
                },
                description,
                amount,
                realPaid,
                paid,
                date,
                estimatePaidDate
            },
        "hasNextPage": count(*[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds && methodSpending._ref in $methodSpendingIds]) > $__toMethod
    }
`
export const GET_RECENT_SPENDING_BY_METHOD_TOTAL = groq`
    *[_type == "kindSpending" && _id in $kindSpendingIds]
    {
        key,
        "data": *[_type == "spending" && user._ref == $userId  && kindSpending._ref == ^._id && methodSpending._ref in $methodSpendingIds].amount,
    }
`
export const GET_RECENT_SPENDING_BY_METHOD_FILTER_DATE_RANGE_TOTAL = groq`
    *[_type == "kindSpending" && _id in $kindSpendingIds]
    {
        key,
        "data": *[_type == "spending" && user._ref == $userId  && kindSpending._ref == ^._id && methodSpending._ref in $methodSpendingIds && $__startDate <= date && date <= $__endDate].amount,
    }
`
export const GETALL_RECENT_SPENDING_FILTER_DATE_RANGE_BY_METHOD = groq`
    *[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds && methodSpending._ref in $methodSpendingIds && $startDate <= date && date <= $endDate] | order(_updatedAt desc)
    {
        _id,
        categorySpending-> {
            name
        },
        methodSpending-> {
            name
        },
        kindSpending-> {
            name,
            key
        },
        description,
        amount,
        realPaid,
        paid,
        date,
        estimatePaidDate
    }
`

export const GET_RECENT_SPENDING_FILTER_DATE_RANGE_BY_METHOD_PAGINATE = groq`
    {
        "data": *[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds && methodSpending._ref in $methodSpendingIds && $__startDate <= date && date <= $__endDate] | order(_updatedAt desc)[$__fromMethod...$__toMethod]
            {
                _id,
                categorySpending-> {
                    name
                },
                methodSpending-> {
                    name
                },
                kindSpending-> {
                    name,
                    key
                },
                description,
                amount,
                realPaid,
                paid,
                date,
                estimatePaidDate
            },
        "hasNextPage": count(*[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds && methodSpending._ref in $methodSpendingIds && $__startDate <= date && date <= $__endDate]) > $__toMethod
    }
`

export const GET_RECENT_SPENDING = groq`
    *[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds] | order(_updatedAt desc)[$from...$to]
    {
        _id,
        categorySpending-> {
            name
        },
        methodSpending-> {
            name
        },
        kindSpending-> {
            name,
            key
        },
        description,
        amount,
        paid,
        date
    }
`

export const GET_CATEGORY_SPENDING = groq`
    *[_type == "categorySpending" && user._ref == $userId && kindSpending._ref == $kindSpending && display == true] | order(countUsed desc)
    {
        _id,
        name
    }
`
export const GET_CATEGORY = groq`
    *[_type == "categorySpending" && user._ref == $userId] | order(countUsed desc)
    {
        _id,
        kindSpending-> {
            key,
            name
        },
        name,
        display
    }
`
export const GET_METHOD_SPENDING_DESC_SURPLUS = groq`
    *[_type == "methodSpending" && user._ref == $userId && display == true] | order(surplus desc)
    {
        _id,
        surplus,
        name
    }
`
export const GET_METHOD_SPENDING = groq`
    *[_type == "methodSpending" && user._ref == $userId && display == true] | order(countUsed desc)
    {
        _id,
        surplus,
        name
    }
`

export const GET_METHOD = groq`
    *[_type == "methodSpending" && user._ref == $userId] | order(countUsed desc)
    {
        _id,
        surplus,
        name,
        display
    }
`

export const GET_TRANSACTION_DETAIL = groq`
    *[_type == "spending" && user._ref == $userId && _id == $id]
    {
        _id,
        categorySpending-> {
            _id,
            name
        },
        methodSpending-> {
            _id,
            name,
            surplus
        },
        methodReference-> {
            _id,
            name,
            surplus
        },
        kindSpending-> {
            _id,
            name,
            key
        },
        surplus,
        description,
        amount,
        date,
        image
    }
`

export const GET_STATISTIC_SPENDING = groq`
    *[_type == "kindSpending"]
    {
        key,
        "data": *[_type == "spending" && user._ref == $userId  && kindSpending._ref == ^._id && $startDate <= date && date <= $endDate].amount,
    }
`

export const GET_BUDGET_METHOD_DETAIL_BY_MONTH = groq`
    *[_type == 'budgetMethodDetail' && user._ref == $userId && budgetSpending._ref == $budgetId] | order(_createdAt asc)
    {
        _id,
        methodSpending-> {
            _id,
            name,
        },
        amount,
        "amounts": *[_type == "spending" && user._ref == $userId && $startDate <= date && date <= $endDate && kindSpending._ref == $budgetKind && methodSpending._ref == ^.methodSpending._ref].amount
    }
`

export const GET_BUDGET_CATEGORY_DETAIL_BY_MONTH = groq`
    *[_type == 'budgetCategoryDetail' && user._ref == $userId && budgetSpending._ref == $budgetId] | order(_createdAt asc)
    {
        _id,
        categorySpending-> {
            _id,
            name,
        },
        amount,
        "amounts": *[_type == "spending" && user._ref == $userId && $startDate <= date && date <= $endDate && kindSpending._ref == $budgetKind && categorySpending._ref == ^.categorySpending._ref].amount
    }
`

export const GET_BUDGET_CATEGORY_DETAIL_SPENDING_BY_MONTH = groq`
    *[_type == 'budgetCategoryDetail' && user._ref == $userId && _id == $budgetId][0]
    {
        _id,
        categorySpending-> {
            _id,
            name,
        },
        amount,
        "spending": *[_type == "spending" && user._ref == $userId && $startDate <= date && date <= $endDate && kindSpending._ref == $budgetKind && categorySpending._ref == ^.categorySpending._ref] | order(_createdAt desc) {
            _id,
            categorySpending-> {
                _id,
                name,
            },
            methodSpending-> {
                name
            },
            kindSpending-> {
                _id,
                name,
                key
            },
            description,
            amount,
            date
        }
    }
`

export const GET_BUDGET_BY_MONTH = groq`
    *[_type == 'budget' && user._ref == $userId && _id == $budgetId][0]
    {
        _id,
        "MethodSpending": ${GET_BUDGET_METHOD_DETAIL_BY_MONTH},
        "CategorySpending": ${GET_BUDGET_CATEGORY_DETAIL_BY_MONTH}
    }
`

export const GET_LONG_BUDGET = groq`
    *[_type == 'longBudget' && user._ref == $userId] {
        _id,
        title,
        amount,
        "amounts": *[_type == "longBudgetItem" && ^._id == budget._ref].amount
    }
`
