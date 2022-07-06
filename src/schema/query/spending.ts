import groq from 'groq'
import { IKindSpending } from '~/@types/context'

export const GET_RECENT_SPENDING = groq`
    *[_type == "spending" && user._ref == $userId] | order(_createdAt desc)[0...5]
    {
        _id,
        _createdAt,
        name,
        categorySpending-> {
            _id,
            name
        },
        methodSpending-> {
            _id,
            name
        },
        kindSpending-> {
            _id,
            name,
            key
        },
        description,
        amount,
        date
    }
`
export const F_GET_METHOD_SPENDING = (kindSpending: IKindSpending[]) => groq`
    *[_type == "methodSpending" && user._ref == $userId]
    {
        _id,
        name,
        ${kindSpending
            .map(
                ({ _id, key }) =>
                    `"${key}": *[_type == "spending" && user._ref == $userId && method._ref == ^._id && kindSpending._ref == "${_id}"].amount`
            )
            .join(',')}
    }    
`
export const GET_CATEGORY_SPENDING = groq`
    *[_type == "categorySpending" && user._ref == $userId && kindSpending._ref == $kindSpending] | order(_createdAt desc)
    {
        _id,
        name,
        kindSpending-> {
            _id,
            name,
            key
        }
    }
`
export const GET_METHOD_SPENDING = groq`
    *[_type == "methodSpending" && user._ref == $userId] | order(_createdAt desc)
    {
        _id,
        name
    }
`
