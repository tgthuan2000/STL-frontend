import groq from 'groq'

const bodyFeedback = groq`
        _id,
        _createdAt,
        message,
        parent-> {
            _id,
        },
        user-> {
            _id,
            userName,
            email,
            image
        },
        edited,
        deleted,
        responded,
        "childNum": count(*[_type == "feedback" && parent._ref == ^._id && deleted == false]),
`

export const GET_PARENT_FEED_BACK = groq`
    {
        "data": *[_type == "feedback" && feedbackForUser._ref == $userId && parent._ref == $parentId && deleted == false] | order(_createdAt desc)[$__fromFeedback...$__toFeedback]
        {
            ${bodyFeedback}
            "children": *[_type == "feedback" && parent._ref == ^._id && deleted == false] | order(_createdAt desc)[0...1]
                {
                    ${bodyFeedback}
                }
        }
    }
`

export const GET_FEED_BACK_BY_PARENT_ID = groq`
    {
        "data": *[_type == "feedback" && feedbackForUser._ref == $userId && parent._ref == $parentId && deleted == false] | order(_createdAt desc)[$__fromFeedback...$__toFeedback]
        {
            ${bodyFeedback}
            "status": $status,
        }
    }
`

export const SUBSCRIPTION_FEED_BACK = groq`
    *[_type == "feedback" && feedbackForUser._ref == $userId][0] {
    }
`

export const GET_TOP_FEEDBACK = groq`
    *[_type == "feedback" && deleted == false] {
        _id,
        _createdAt,
        message,
        user-> {
            _id,
            userName,
            email,
            image
        }
    }
`

export const GET_FEEDBACK_BY_ID = groq`
    *[_type == "feedback" && _id == $feedbackId] {
        _id,
        _createdAt,
        message,
        parent -> {
            _id,
            _createdAt,
            message,
            user -> {
                _id,
                userName,
                email,
                image
            }
        },
        user -> {
            _id,
            userName,
            email,
            image
        },
    }
`
