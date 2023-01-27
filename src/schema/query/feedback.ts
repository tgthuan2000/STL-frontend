import groq from 'groq'

export const GET_PARENT_FEED_BACK = groq`
    {
        "data": *[_type == "feedback" && feedbackForUser._ref == $userId && parentId == $parentId] | order(_createdAt desc)[$__fromFeedback...$__toFeedback]
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
            edit,
            "childNum": count(*[_type == "feedback" && parentId == ^._id]),
            "children": *[_type == "feedback" && parentId == ^._id] | order(_createdAt desc)[0...1]
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
                    "childNum": count(*[_type == "feedback" && parentId == ^._id])
                }
        }
    }
`

export const GET_FEED_BACK_BY_PARENT_ID = groq`
    {
        "data": *[_type == "feedback" && feedbackForUser._ref == $userId && parentId == $parentId] | order(_createdAt desc)[$__fromFeedback...$__toFeedback]
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
            edit,
            "status": $status,
            "childNum": count(*[_type == "feedback" && parentId == ^._id])
        }
    }
`

export const SUBSCRIPTION_FEED_BACK = groq`
    *[_type == "feedback" && feedbackForUser._ref == $userId][0] {
        _id,
        edit,
        message
    }
`
