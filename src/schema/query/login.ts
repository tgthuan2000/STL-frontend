import groq from 'groq'

export const GET_PASSWORD_BY_ID = groq`
    *[_type == "user" && _id == $_id][0] {
        password,
    }
`

export const GET_DATA_BY_EMAIL = groq`
    *[_type == "user" && email == $email] {
        _id,
        _createdAt,
        userName,
        email,
        image,
        google,
        "isHasPassword": defined(password),
    }
`

export const GET_DATA_USER_BY_ID = groq`
    *[_type == "user" && _id == $_id][0] {
        _id,
        _createdAt,
        userName,
        email,
        image,
        google,
        "isHasPassword": defined(password),
    }
`