import { Transaction } from '@sanity/client'
import { isEmpty } from 'lodash'

type Update = (
    __: Transaction,
    key: 'methodSpending' | 'categorySpending',
    arr: string[],
    finds: any[] | undefined
) => void

export const __update__: Update = (__, key, arr, finds) => {
    if (!isEmpty(arr)) {
        arr.forEach((item) => {
            const found = finds?.find((i) => i._id === item)
            if (found) {
                const { amount } = found
                __.patch(item, {
                    set: {
                        amount,
                        [key]: { _type: 'reference', _ref: found[key]._id },
                    },
                })
            }
        })
    }
}

type Delete = (__: Transaction, arr: string[]) => void

export const __delete__: Delete = (__, arr) => {
    if (!isEmpty(arr)) {
        arr.forEach((item) => {
            __.delete(item)
        })
    }
}

type Create = (
    __: Transaction,
    key: 'methodSpending' | 'categorySpending',
    _id: string,
    arr: any[] | undefined,
    userId: string
) => void

const typeCreate = {
    methodSpending: 'budgetMethodDetail',
    categorySpending: 'budgetCategoryDetail',
}

export const __create__: Create = (__, key, _id, arr, userId) => {
    if (arr && !isEmpty(arr)) {
        arr.forEach((item) => {
            const { amount } = item
            if (amount) {
                __.create({
                    _type: typeCreate[key],
                    amount: Number(amount),
                    [key]: { _type: 'reference', _ref: item[key]._id },
                    budgetSpending: { _type: 'reference', _ref: _id },
                    user: { _type: 'reference', _ref: userId },
                })
            }
        })
    }
}
