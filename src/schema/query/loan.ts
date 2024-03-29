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
    *[_type == "spending" && user._ref == $userId && !paid && kindSpending._ref in [$kindLoan, $kindCredit]] | order(_updatedAt desc) [$from...$to]
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
    *[_type == "spending" && user._ref == $userId && estimatePaidDate < $dueDate && !paid && kindSpending._ref in [$kindLoan, $kindCredit]] | order(estimatePaidDate asc) [$from...$to]
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
        image,
        categorySpending-> {
            _id,
            name
        },
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

export const GET_MEMBER_LOAN_BY_ID = groq`
    *[_type == "userLoan" && _id == $id && user._ref == $userId][0] {
        _id,
        _createdAt,
        userName,
        image,
        "spending": *[_type == "spending" && userLoan._ref == ^._id] {
            _id,
            amount,
            date,
            description,
            estimatePaidDate,
            kindSpending-> {
                _id,
                name,
                key
            },
            methodSpending-> {
                _id,
                name,
                surplus
            },
            paid
        }
    }
`
