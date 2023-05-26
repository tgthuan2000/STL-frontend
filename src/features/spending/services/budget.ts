import { Transaction } from '@sanity/client'
import { isEmpty, isEqual } from 'lodash'

type GetChanges = (arr: string[], finds: any[] | undefined, origins: any[] | undefined) => any[]
type Update = (__: Transaction, key: 'methodSpending' | 'categorySpending', finds: any[] | undefined) => void
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
    getChanges: GetChanges
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
    getChanges(arr, finds, origins) {
        const result: any[] = []
        if (!isEmpty(arr)) {
            arr.forEach((item) => {
                const found = finds?.find((i) => i._id === item)
                const origin = origins?.find((i) => i._id === item)
                if (found && origin) {
                    if (isEqual(found, origin)) {
                        return
                    }
                    result.push(found)
                }
            })
        }

        return result
    },
    update(__, key, finds) {
        if (!isEmpty(finds)) {
            finds?.forEach((find) => {
                const { _id, amount } = find
                __.patch(_id, {
                    set: {
                        amount,
                        [key]: { _type: 'reference', _ref: find[key]._id },
                    },
                })
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
