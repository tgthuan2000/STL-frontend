import groq from 'groq'

export const GET_ACCOUNTS = groq`
     *[_type == "user"] | order(_createdAt asc)[$__fromAccount...$__toAccount]{
        _id,
        _createdAt,
        userName,
        email,
        allowSendMail,
        image,
        "isHasPassword": defined(password),
        twoFA,
        role-> {
            _id,
            name,
        }
    }
`
