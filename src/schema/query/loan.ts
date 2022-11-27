import groq from 'groq'

export const GET_USER_LOAN = groq`
    *[_type == "userLoan" && user._ref == $userId] | order(countUsed desc)
    {
        _id,
        userName,
        surplus,
        image
    }
`

export const GET_RECENT_LOAN = groq`
    *[_type == "spending" && user._ref == $userId && !paid && kindSpending._ref in [$kindLoan, $kindGetLoan]] | order(_updatedAt desc) [$from...$to]
    {
        _id,
        amount,
        kindSpending-> {
            _id,
            name,
            key
        },
        estimatePaidDate,
        userLoan-> {
            _id,
            userName,
            image
        }
    }
`

export const GET_STATISTIC_LOAN = groq`
    *[_type == "userLoan" && user._ref == $userId] | order(surplus desc) [$from...$to]
    {
        _id,
        userName,
        surplus,
        image
    }
`

export const GET_PAY_DUE_LOAN = groq`
    *[_type == "spending" && user._ref == $userId && estimatePaidDate < $dueDate && !paid && kindSpending._ref in [$kindLoan, $kindGetLoan]] | order(estimatePaidDate asc) [$from...$to]
    {
        _id,
        amount,
        kindSpending-> {
            _id,
            name,
            key
        },
        estimatePaidDate,
        userLoan-> {
            _id,
            userName,
            image
        }
    }

`

export const GET_TRANSACTION_DETAIL = groq`
    *[_type == "spending" && user._ref == $userId && _id == $id]
    {
        _id,
        _createdAt,
        _updatedAt,
        amount,
        description,
        paid,
        surplus,
        realPaid,
        date,
        estimatePaidDate,
        paidDate,
        methodSpending-> {
            _id,
            name,
            surplus
        },
        methodReference-> {
            _id,
            name,
            surplus
        },
        kindSpending-> {
            _id,
            name,
            key
        },
        userLoan-> {
            _id,
            userName,
            image,
            surplus
        }
    }
`
