import groq from 'groq'

export const GET_PROFILE_STATISTIC = groq`
    {
        "method": *[_type == "methodSpending" && user._ref == $userId]
        {
            _id,
            name,
            countUsed,
            "receives": *[_type == "spending" && methodSpending._ref == ^._id && kindSpending._ref == $receiveKindId].amount,
            "cost": *[_type == "spending" && methodSpending._ref == ^._id && kindSpending._ref == $costKindId].amount,
        },
        "category": *[_type == "categorySpending" && user._ref == $userId]
        {
            _id,
            name,
            countUsed,
            kindSpending-> {
                _id,
            },
            "receives": *[_type == "spending" && categorySpending._ref == ^._id && kindSpending._ref == $receiveKindId].amount,
            "cost": *[_type == "spending" && categorySpending._ref == ^._id && kindSpending._ref == $costKindId].amount,
        },
        "budget": *[_type == "budgetSpending" && user._ref == $userId]
        {
            _id,
            date,
            "total": *[_type == "budgetDetail" && budgetSpending._ref == ^._id].amount,
        }
    }
`

export const GET_PROFILE_STATISTIC_FILTER_DATE_RANGE = groq`

`
