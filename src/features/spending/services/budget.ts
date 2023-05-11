import { Transaction } from '@sanity/client'
import { isEmpty } from 'lodash'

type Update = (
    __: Transaction,
    key: 'methodSpending' | 'categorySpending',
    arr: string[],
    finds: any[] | undefined
) => void
type Delete = (__: Transaction, arr: string[]) => void
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

interface ServicesBudget {
    create: Create
    update: Update
    delete: Delete
}

export const servicesBudget: ServicesBudget = {
    create(__, key, _id, arr, userId) {
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
    },
    update(__, key, arr, finds) {
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
    },
    delete(__, arr) {
        if (!isEmpty(arr)) {
            arr.forEach((item) => {
                __.delete(item)
            })
        }
    },
}
