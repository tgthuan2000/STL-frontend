import groq from 'groq'
import { IKindSpending } from '~/@types/context'

export const GET_RECENT_SPENDING = groq`
    *[_type == "spending" && user._ref == $userId] | order(_createdAt desc)[0...5]
    {
        _id,
        _createdAt,
        name,
        category-> {
            _id,
            name
        },
        method-> {
            _id,
            name
        },
        kind-> {
            _id,
            name,
            key
        },
        description,
        amount,
        date
    }
`
export const GET_METHOD_SPENDING = (kindSpending: IKindSpending[]) => groq`
    *[_type == "methodSpending" && user._ref == $userId]
    {
        _id,
        name,
        ${kindSpending
            .map(
                ({ _id, key }) =>
                    `"${key}": *[_type == "spending" && user._ref == $userId && method._ref == ^._id && kind._ref == "${_id}"].amount`
            )
            .join(',')}
    }    
`
