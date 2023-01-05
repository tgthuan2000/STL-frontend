import groq from 'groq'

export const LOGIN_BY_EMAIL_PASSWORD = groq`
    *[_type == "user" && userName == $userName][0] {
        _id,
        userName,
        password,
        email,
        image,
    }
`
