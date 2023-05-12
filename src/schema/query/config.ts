import groq from 'groq'

export const GET_USER_LAYOUT = groq`
    *[_type == "layoutUser" && user._ref == $userId] {
        _id,
        group-> {
            _id,
            key
        },
        layouts[] {
            layouts[]-> {
                _id,
                key
            }
        }
    }
`

export const GET_CONFIG = groq`
    {
        "kindSpending": *[_type == "kindSpending"] {
            _id,
            key,
            name
        },
         "user": *[_type == "user" && _id == $userId][0] {
            role -> {
                _id,
                name,
                permissions[] -> {
                    _id,
                }
            },
         },
        "layouts": ${GET_USER_LAYOUT}
    }
`
