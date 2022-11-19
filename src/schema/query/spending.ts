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
        date
    }
`

export const GETALL_RECENT_SPENDING_FILTER_DATE_RANGE = groq`
    *[_type == "spending" && user._ref == $userId && kindSpending._ref in $kindSpendingIds && $startDate <= date && date <= $endDate] | order(_updatedAt desc)
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
        date
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
    *[_type == "categorySpending" && user._ref == $userId && kindSpending._ref == $kindSpending] | order(countUsed desc)
    {
        _id,
        name
    }
`
export const GET_METHOD_SPENDING_DESC_SURPLUS = groq`
    *[_type == "methodSpending" && user._ref == $userId] | order(surplus desc)
    {
        _id,
        surplus,
        name
    }
`
export const GET_METHOD_SPENDING = groq`
    *[_type == "methodSpending" && user._ref == $userId] | order(countUsed desc)
    {
        _id,
        surplus,
        name
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
        date
    }
`

export const GET_STATISTIC_SPENDING = groq`
    *[_type == "kindSpending"]
    {
        key,
        "data": *[_type == "spending" && user._ref == $userId  && kindSpending._ref == ^._id && $startDate <= date && date <= $endDate].amount,
    }
`
