import groq from 'groq'

export const TRACKING_INCOME = groq`
    *[_type == 'spending' && user._ref == $userId && amount == $amount && categorySpending._ref == $categorySpending && methodSpending._ref == $methodSpending && description match $description][0] {
        amount,
        categorySpending->{
            _id,
            name
        },
        methodSpending->{
            _id,
            name
        },
        description,
    }
`
