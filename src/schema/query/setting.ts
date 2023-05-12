import groq from 'groq'

export const GET_USER_DEVICE = groq`
    *[_type == "refreshToken" && user._ref == $userId] | order(_createdAt desc) {
        _id,
        _createdAt,
        device,
        lastAccess,
        "thisDevice": token == $token
    }
`
