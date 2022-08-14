import groq from 'groq'

export const GET_USER_LOAN = groq`
    *[_type == "userLoan" && user._ref == $userId] | order(_createdAt desc)
    {
        _id,
        userName,
        image
    }
`

export const GET_USER_LOAN_DESC_COUNT_USED = groq`
    *[_type == "userLoan" && user._ref == $userId] | order(countUsed desc)
    {
        _id,
        userName,
        image
    }
`
