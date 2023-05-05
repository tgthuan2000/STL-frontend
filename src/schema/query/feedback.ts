import groq from 'groq'

const childNum = groq`"childNum": count(*[_type == "feedback" && parent._ref == ^._id && deleted == false]),`

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
        ${childNum}
`

export const GET_PARENT_FEED_BACK = groq`
    {
        "data": *[_type == "feedback" && (feedbackForUser._ref == $userId || user._ref == $userId) && parent._ref == $parentId && deleted == false] | order(_createdAt desc)[0...10]
        {
            ${bodyFeedback}
            "children": *[_type == "feedback" && parent._ref == ^._id && deleted == false] | order(_createdAt desc)[0...1]
                {
                    ${bodyFeedback}
                }
        }
    }
`

export const GET_FEED_BACK_USER_BY_PARENT_ID = groq`
    {
        "data": *[_type == "feedback" && (feedbackForUser._ref == $userId || user._ref == $userId) && parent._ref == $parentId && deleted == false && !(_id in $__excludeIds)] | order(_createdAt desc)[0...10]
        {
            ${bodyFeedback}
            "status": $status,
        }
    }
`

export const GET_FIRST_FEED_BACK_USER_BY_PARENT_ID = groq`
    {
        "data": *[_type == "feedback" && (feedbackForUser._ref == $userId || user._ref == $userId) && parent._ref == $parentId && deleted == false] | order(_createdAt desc)[0...1]
        {
            ${bodyFeedback}
            "status": $status,
        }
    }
`

export const SUBSCRIPTION_FEED_BACK = groq`
    *[_type == "feedback" && (feedbackForUser._ref == $userId || user._ref == $userId)][0] {
    }
`

export const SUBSCRIPTION_TOP_FEED_BACK = groq`
    *[_type == "feedback" && responded == false][0] {
    }
`

export const GET_TOP_FEEDBACK = groq`
    {
        "data":*[_type == "feedback" && deleted == false && responded == false] | order(_createdAt asc){
            _id,
            _createdAt,
            message,
            edited,
            deleted,
            user-> {
                _id,
                userName,
                email,
                image
            }
        }
    }
`

export const GET_TOP_FEEDBACK_BY_ID = groq`
    {
        "data": *[_type == "feedback" && _id == $id && responded == false] [0...1]{
            _id,
            _createdAt,
            message,
            edited,
            deleted,
            user-> {
                _id,
                userName,
                email,
                image
            }
        }
    }
`

export const GET_FEEDBACK_BY_ID = groq`
    {
        "data": *[_type == "feedback" && _id == $feedbackId] {
            _id,
            _createdAt,
            message,
            edited,
            deleted,
            responded,
            ${childNum}
            user -> {
                _id,
                userName,
                email,
                image
            },
            parent -> {
                _id,
                _createdAt,
                message,
                edited,
                deleted,
                responded,
                ${childNum}
                user -> {
                    _id,
                    userName,
                    email,
                    image
                },
                parent -> {
                    _id,
                }
            },
            
        }
    }
`

export const GET_FEEDBACK_PARENT_BY_ID = groq`
    {
        "data": *[_type == "feedback" && _id == $feedbackId] {
            _id,
            _createdAt,
            message,
            edited,
            deleted,
            responded,
            ${childNum}
            user -> {
                _id,
                userName,
                email,
                image
            },
            parent -> {
                _id,
            },
            
        }
    }
`

export const GET_FEED_BACK_BY_PARENT_ID = groq`
    {
        "data": *[_type == "feedback" && parent._ref == $parentId && deleted == false && !(_id in $__excludeIds)] | order(_createdAt desc)[0...10]
        {
            ${bodyFeedback}
            "status": $status,
        }
    }
`

export const GET_FIRST_FEED_BACK_BY_PARENT_ID = groq`
    {
        "data": *[_type == "feedback" && parent._ref == $parentId && deleted == false] | order(_createdAt desc)[0...1]
        {
            ${bodyFeedback}
            "status": $status,
        }
    }
`
