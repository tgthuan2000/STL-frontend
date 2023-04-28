import groq from 'groq'

export const GET_SCHEDULE_LOOPS = groq`
    *[_type == "scheduleLoop"] | order(_createdAt asc) {
        _id,
        name
    }
`

export const GET_SCHEDULE = groq`
    {
        "data": *[_type == "schedule" && user._ref == $userId && (($__startDate <= startDate && startDate <= $__endDate) ||  ($__startDate <= endDate && endDate <= $__endDate) || (startDate <= $__startDate && $__endDate <= endDate)) && !(_id in $__excludeIds)] | order(startDate asc) {
            _id,
            title,
            startDate,
            endDate,
            textColor,
            bgColor,
            loop -> {
                _id,
                key,
                name
            },
        }
    }
`

export const GET_DETAIL_SCHEDULE = groq`
    *[_type == "schedule" && _id == $id && user._ref == $userId][0] {
        _id,
        title,
        startDate,
        endDate,
        textColor,
        bgColor,
        loop -> {
            _id,
            key,
            name
        },
        description,
        image,
    }
`
