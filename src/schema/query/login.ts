import groq from 'groq'

export const GET_PASSWORD_BY_EMAIL = groq`
    *[_type == "user" && email == $email][0] {
        password,
    }
`

export const GET_DATA_BY_EMAIL = groq`
    *[_type == "user" && email == $email][0] {
        _id,
        userName,
        email,
        image,
    }
`
