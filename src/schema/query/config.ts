import groq from 'groq'

export const GET_CONFIG = groq`
    {
        "kindSpending": *[_type == "kindSpending"] {
            _id,
            key,
            name
        }
    }
`
