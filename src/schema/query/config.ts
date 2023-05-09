import groq from 'groq'

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
            layouts[] {
                group-> {
                    _id,
                    key
                },
                items[] {
                    layout-> {
                        _id,
                        key
                    },
                    index,
                    order
                }
            }
         }
    }
`
