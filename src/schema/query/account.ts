import groq from 'groq'

export const GET_ACCOUNTS = groq`
     *[_type == "user"] | order(_createdAt desc)[$__fromAccount...$__toAccount]{
        _id,
        userName,
        email,
        allowSendMail,
        image,
        isHasPassword,
        twoFA,
        role-> {
            _id,
            name,
        }
    }
`
