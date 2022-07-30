import groq from 'groq'

export const GET_USER_LOAN = groq`
    *[_type == "userLoan" && user._ref == $userId] | order(_createdAt desc)
    {
        _id,
        userName,
        image
    }
`
