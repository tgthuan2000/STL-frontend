import groq from 'groq'

export const GET_METHOD_PROFILE_STATISTIC = groq`
    *[_type == "methodSpending" && user._ref == $userId]
    {
        _id,
        name,
        countUsed,
        "receives": *[_type == "spending" && methodSpending._ref == ^._id && kindSpending._ref in $receiveKindIds].amount,
        "costs": *[_type == "spending" && methodSpending._ref == ^._id && kindSpending._ref in $costKindIds].amount,
    }
`

export const GET_CATEGORY_PROFILE_STATISTIC = groq`
    *[_type == "categorySpending" && user._ref == $userId]
    {
        _id,
        name,
        countUsed,
        kindSpending-> {
            key,
        },
        "receives": *[_type == "spending" && categorySpending._ref == ^._id && kindSpending._ref in $receiveKindIds].amount,
        "costs": *[_type == "spending" && categorySpending._ref == ^._id && kindSpending._ref in $costKindIds].amount,
    }
`

export const GET_BUDGET_PROFILE_STATISTIC = groq`
    *[_type == "budget" && user._ref == $userId]
    {
        _id,
        date,
        "total": *[_type in ["budgetMethodDetail", "budgetCategoryDetail"] && budgetSpending._ref == ^._id].amount,
    }
`

export const GET_METHOD_PROFILE_STATISTIC_FILTER_DATE_RANGE = groq`
    *[_type == "methodSpending" && user._ref == $userId]
    {
        _id,
        name,
        countUsed,
        "receives": *[_type == "spending" && methodSpending._ref == ^._id && kindSpending._ref in $receiveKindIds].amount,
        "costs": *[_type == "spending" && methodSpending._ref == ^._id && kindSpending._ref in $costKindIds].amount,
    }
`

export const GET_CATEGORY_PROFILE_STATISTIC_FILTER_DATE_RANGE = groq`
    *[_type == "categorySpending" && user._ref == $userId]
    {
        _id,
        name,
        countUsed,
        kindSpending-> {
            _id,
        },
        "receives": *[_type == "spending" && categorySpending._ref == ^._id && kindSpending._ref in $receiveKindIds].amount,
        "costs": *[_type == "spending" && categorySpending._ref == ^._id && kindSpending._ref in $costKindIds].amount,
    }
`

export const GET_BUDGET_PROFILE_STATISTIC_FILTER_DATE_RANGE = groq`
    *[_type == "budget" && user._ref == $userId]
    {
        _id,
        date,
        "total": *[_type in ["budgetMethodDetail", "budgetCategoryDetail"] && budgetSpending._ref == ^._id].amount,
    }
`
