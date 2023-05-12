import groq from 'groq'

export const GET_GROUP_LAYOUT_BY_KEY = groq`
    *[_type == "groupLayout" && key == $key][0] {
        _id,
        "layouts": *[_type == "layout" && group._ref == ^._id] {
            _id,
            key
        }
    }
`
