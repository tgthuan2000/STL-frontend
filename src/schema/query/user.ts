import groq from 'groq'

export const SEARCH_USER_PAGINATE = groq`
    {
        "data": *[_type == "user" && email match $search] | order(_createdAt desc)[$__fromUser...$__toUser]
        {
            _id,
            userName,
            email,
            image,
        },
        "hasNextPage": count(*[_type == "notify"]) > $__toUser      
    }
`

export const GET_USERS_ID = groq`
    *[_type == "user"]{
        _id,
    }
`
