import groq from 'groq'

export const GET_PARENT_FEED_BACK = groq`
    {
        "data": *[_type == "feedback" && feedbackForUser._ref == $userId && parentId == $parentId && deleted == false] | order(_createdAt desc)[$__fromFeedback...$__toFeedback]
        {
            _id,
            _createdAt,
            message,
            parentId,
            user-> {
                _id,
                userName,
                email,
                image
            },
            edited,
            deleted,
            "childNum": count(*[_type == "feedback" && parentId == ^._id && deleted == false]),
            "children": *[_type == "feedback" && parentId == ^._id && deleted == false] | order(_createdAt desc)[0...1]
                {
                    _id,
                    _createdAt,
                    message,
                    parentId,
                    user-> {
                        _id,
                        userName,
                        email,
                        image
                    },
                    edited,
                    deleted,
                    "childNum": count(*[_type == "feedback" && parentId == ^._id && deleted == false])
                }
        }
    }
`

export const GET_FEED_BACK_BY_PARENT_ID = groq`
    {
        "data": *[_type == "feedback" && feedbackForUser._ref == $userId && parentId == $parentId && deleted == false] | order(_createdAt desc)[$__fromFeedback...$__toFeedback]
        {
            _id,
            _createdAt,
            message,
            parentId,
            user-> {
                _id,
                userName,
                email,
                image
            },
            edited,
            deleted,
            "status": $status,
            "childNum": count(*[_type == "feedback" && parentId == ^._id && deleted == false])
        }
    }
`

export const SUBSCRIPTION_FEED_BACK = groq`
    *[_type == "feedback" && feedbackForUser._ref == $userId][0] {
        _id,
        edited,
        deleted,
        message
    }
`
