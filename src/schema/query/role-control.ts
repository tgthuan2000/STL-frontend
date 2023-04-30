import groq from 'groq'

export const GET_ROLES = groq`
    *[_type == "role"] {
        _id,
        name,
        description,
        "parentId": parent->._id,
        permissions[]-> {
            _id
        }
    }
`

export const GET_PERMISSIONS = groq`
    *[_type == "permissionGroup"] | order(name asc) {
        _id,
        name,
        "permissions": *[_type == "permission" && references(^._id)] | order(name asc) {
            _id,
            name,
            description
        }
    }
`
