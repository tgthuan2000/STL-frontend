import groq from 'groq'

export const GET_NOTIFY_PAGINATE = groq`
    {
        "notify": *[_type == "assignNotify" && user._ref == $userId] | order(_createdAt desc)[$__fromNotify...$__toNotify]
        {
            _id,
            _createdAt,
            _updatedAt,
            read,
            user-> {
                _id,
            },
            notify-> {
                _id,
                _createdAt,
                _updatedAt,
                title,
                description,
                content,
                "viewers": count(viewers)
            }
        },
        "total": count(*[_type == "assignNotify" && user._ref == $userId && read == false]),
        "hasNextPage": count(*[_type == "assignNotify" && user._ref == $userId]) > $__toNotify      
    }
`

export const SUBSCRIPTION_NOTIFY = groq`
    *[_type == "assignNotify" && user._ref == $userId]
`

export const GET_NOTIFY = groq`
    *[_type == "assignNotify" && _id == $notifyId][0] {
        _id,
        _createdAt,
        _updatedAt,
        read,
        user-> {
            _id,
        },
        notify-> {
            _id,
            _createdAt,
            _updatedAt,
            title,
            description,
            content,
            "viewers": count(viewers)
        }
    }
`
