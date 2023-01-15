import groq from 'groq'

export const GET_CONFIG = groq`
    {
        "kindSpending": *[_type == "kindSpending"] {
            _id,
            key,
            name
        },
        "role": *[_type == "user" && _id == $userId][0] {
            role -> {
                _id,
                name,
                permissions[] -> {
                    _id,
                }
            }
        }
    }
`
