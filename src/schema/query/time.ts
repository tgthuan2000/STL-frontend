import groq from 'groq'

export const GET_SCHEDULE_LOOPS = groq`
    *[_type == "scheduleLoop"] | order(_createdAt asc) {
        _id,
        name
    }
`

export const GET_SCHEDULE = groq`
    *[_type == "schedule" && user._ref == $userId && startDate >= $fromDate || endDate <= $toDate] | order(startDate asc) {
        _id,
        title,
        startDate,
        endDate,
        textColor,
        bgColor,
        image,
        loop -> {
            _id,
            name
        },
    }
`
