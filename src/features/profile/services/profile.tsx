import { sum } from 'lodash'
import { BudgetProfile, CategoryProfile, CategoryRespond, ProfileService } from '~/@types/profile'
import { KIND_SPENDING } from '~/constant/spending'

export const ProfileServices: ProfileService = {
    method: (method) => {
        // sum costs and receives
        if (!Array.isArray(method)) {
            return {
                maxCost: {
                    costs: 0,
                },
                maxReceive: {
                    receives: 0,
                },
                maxUsed: {
                    countUsed: 0,
                },
            }
        }
        const map = method?.map((m) => ({ ...m, costs: sum(m.costs), receives: sum(m.receives) }))

        // get max costs, receives, used
        const res = map?.reduce(
            (acc, cur) => {
                // get max costs
                if (cur.costs > acc.maxCost.costs) {
                    acc.maxCost = cur
                }
                // get max receives
                if (cur.receives > acc.maxReceive.receives) {
                    acc.maxReceive = cur
                }
                // get max uses
                if (cur.countUsed > acc.maxUsed.countUsed) {
                    acc.maxUsed = cur
                }
                return acc
            },
            { maxCost: { costs: 0 }, maxReceive: { receives: 0 }, maxUsed: { countUsed: 0 } }
        )
        return res
    },
    category: (category: CategoryProfile[] | undefined) => {
        // divide by kind & sum costs and receives
        const reduce = category
            ?.map((c) => ({ ...c, costs: sum(c.costs), receives: sum(c.receives) }))
            .reduce(
                (acc, cur) => {
                    const { kindSpending, ...rest } = cur
                    switch (kindSpending.key) {
                        case KIND_SPENDING.COST:
                            acc[KIND_SPENDING.COST].push(rest)
                            break
                        case KIND_SPENDING.RECEIVE:
                            acc[KIND_SPENDING.RECEIVE].push(rest)
                            break
                        default:
                            break
                    }

                    return acc
                },
                {
                    [KIND_SPENDING.COST]: [] as CategoryRespond,
                    [KIND_SPENDING.RECEIVE]: [] as CategoryRespond,
                }
            )

        // get max costs, used of cost's kind
        const kindCost = reduce?.[KIND_SPENDING.COST].reduce(
            (acc, cur) => {
                // get max costs
                if (cur.costs > acc.maxCost.costs) {
                    acc.maxCost = cur
                }
                // get max uses
                if (cur.countUsed > acc.maxCostUsed.countUsed) {
                    acc.maxCostUsed = cur
                }
                return acc
            },
            { maxCost: { costs: 0 }, maxCostUsed: { countUsed: 0 } }
        )

        // get max costs, used of receive's kind
        const kindReceive = reduce?.[KIND_SPENDING.RECEIVE].reduce(
            (acc, cur) => {
                // get max receives
                if (cur.receives > acc.maxReceive.receives) {
                    acc.maxReceive = cur
                }
                // get max uses
                if (cur.countUsed > acc.maxReceiveUsed.countUsed) {
                    acc.maxReceiveUsed = cur
                }
                return acc
            },
            { maxReceive: { receives: 0 }, maxReceiveUsed: { countUsed: 0 } }
        )
        return Object.assign({}, kindCost, kindReceive)
    },
    budget: (budget: BudgetProfile[] | undefined) => {
        // sum costs and receives
        const map = budget?.map((b) => ({ ...b, totalMethod: sum(b.totalMethod), totalCategory: sum(b.totalCategory) }))

        // get max total
        const res = map?.reduce(
            (res, acc) => {
                // get max total method
                if (acc.totalMethod > res.maxTotalMethod.totalMethod) {
                    res.maxTotalMethod = acc
                }
                // get max total category
                if (acc.totalCategory > res.maxTotalCategory.totalCategory) {
                    res.maxTotalCategory = acc
                }
                return res
            },
            { maxTotalMethod: { totalMethod: 0 }, maxTotalCategory: { totalCategory: 0 } }
        )

        return res
    },
}
