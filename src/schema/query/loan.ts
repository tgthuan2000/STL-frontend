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
    *[_type == "loan" && user._ref == $userId && !paid] | order(payDate desc) [$from...$to]
    {
        _id,
        amount,
        kindLoan-> {
            _id,
            name,
            key
        },
        payDate,
        userLoan-> {
            _id,
            userName,
            image
        }
    }
`

export const GET_STATISTIC_LOAN = groq`
    *[_type == "userLoan" && user._ref == $userId && surplus != 0 && surplus != null] | order(surplus desc) [$from...$to]
    {
        _id,
        userName,
        surplus,
        image
    }
`

export const GET_PAY_DUE_LOAN = groq`
    *[_type == "loan" && user._ref == $userId && payDate < $dueDate && !paid] | order(payDate asc) [$from...$to]
    {
        _id,
        amount,
        kindLoan-> {
            _id,
            name,
            key
        },
        payDate,
        userLoan-> {
            _id,
            userName,
            image
        }
    }

`

export const GET_TRANSACTION_DETAIL = groq`
    *[_type == "loan" && user._ref == $userId && _id == $id]
    {
        _id,
        _createdAt,
        _updatedAt,
        amount,
        description,
        paid,
        methodSpending-> {
            _id,
            name,
            surplus
        },
        kindLoan-> {
            _id,
            name,
            key
        },
        userLoan-> {
            _id,
            userName,
            image
        }
    }
`
