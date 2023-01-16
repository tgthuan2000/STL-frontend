import { get, sum } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { BudgetProfile, CategoryProfile, MethodProfile, profileOptionFn } from '~/@types/profile'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'

type CategoryRespond = Array<Omit<MethodProfile, 'costs' | 'receives'> & { costs: number; receives: number }>
interface MethodResult {
    maxCost: { costs: number }
    maxReceive: { receives: number }
    maxUsed: { countUsed: number }
}

interface CategoryResult {
    maxCostUsed?: { countUsed: number }
    maxReceiveUsed?: { countUsed: number }
    maxCost?: { costs: number }
    maxReceive?: { receives: number }
}

interface BudgetResult {
    maxTotal: { total: number }
}

interface __ {
    method: (method: MethodProfile[] | undefined) => MethodResult | undefined
    category: (category: CategoryProfile[] | undefined) => CategoryResult | undefined
    budget: (budget: BudgetProfile[] | undefined) => BudgetResult | undefined
}

const __: __ = {
    method: (method) => {
        // sum costs and receives
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
        const map = budget?.map((b) => ({ ...b, total: sum(b.total) }))

        // get max total
        const res = map?.reduce(
            (res, acc) => {
                // get max total
                if (acc.total > res.maxTotal.total) {
                    res.maxTotal = acc
                }
                return res
            },
            { maxTotal: { total: 0 } }
        )

        return res
    },
}

export const getProfileOptions: profileOptionFn = ({ method, budget, category }) => {
    const _method = __.method(method)
    const _category = __.category(category)
    const _budget = __.budget(budget)
    console.log(_category)
    return [
        {
            id: 1,
            title: 'Phương thức thanh toán',
            className: 'xl:row-start-2 xl:col-start-2 xl:col-span-1 xl:row-span-2',
            values: [
                {
                    id: 1,
                    hidden: !get(_method, 'maxUsed._id'),
                    title: 'Sử dụng nhiều nhất',
                    data: (
                        <div className='flex items-end justify-between font-normal'>
                            <p className='line-clamp-2 text-left text-gray-700'>{get(_method, 'maxUsed.name')}</p>
                            <span className='text-cyan-400'>{get(_method, 'maxUsed.countUsed')}</span>
                        </div>
                    ),
                },
                {
                    id: 2,
                    hidden: !get(_method, 'maxReceive._id'),
                    title: 'Thu nhập nhiều nhất',
                    data: (
                        <div className='flex items-end justify-between font-normal'>
                            <p className='line-clamp-2 text-left text-gray-700'>{get(_method, 'maxReceive.name')}</p>
                            <span className='text-green-400'>
                                {numeral(get(_method, 'maxReceive.receives')).format()}
                            </span>
                        </div>
                    ),
                },
                {
                    id: 3,
                    hidden: !get(_method, 'maxCost._id'),
                    title: 'Chi phí nhiều nhất',
                    data: (
                        <div className='flex items-end justify-between font-normal'>
                            <p className='line-clamp-2 text-left text-gray-700'>{get(_method, 'maxCost.name')}</p>
                            <span className='text-radical-red-400'>
                                {numeral(get(_method, 'maxCost.costs')).format()}
                            </span>
                        </div>
                    ),
                },
            ],
        },
        {
            id: 2,
            title: 'Thể loại',
            className: 'xl:row-start-1 xl:col-start-1 xl:col-span-1 xl:row-span-3',
            values: [
                {
                    id: 1,
                    hidden: !get(_category, 'maxCostUsed._id'),
                    title: 'Chi phí sử dụng nhiều nhất',
                    data: (
                        <div className='flex items-end justify-between font-normal'>
                            <p className='line-clamp-2 text-left text-gray-700'>{get(_category, 'maxCostUsed.name')}</p>
                            <span className='text-cyan-400'>
                                {numeral(get(_category, 'maxCostUsed.countUsed')).format()}
                            </span>
                        </div>
                    ),
                },
                {
                    id: 2,
                    hidden: !get(_category, 'maxReceiveUsed._id'),
                    title: 'Thu nhập sử dụng nhiều nhất',
                    data: (
                        <div className='flex items-end justify-between font-normal'>
                            <p className='line-clamp-2 text-left text-gray-700'>
                                {get(_category, 'maxReceiveUsed.name')}
                            </p>
                            <span className='text-cyan-400'>
                                {numeral(get(_category, 'maxReceiveUsed.countUsed')).format()}
                            </span>
                        </div>
                    ),
                },
                {
                    id: 3,
                    hidden: !get(_category, 'maxCost._id'),
                    title: 'Tổng chi phí nhiều nhất',
                    data: (
                        <div className='flex items-end justify-between font-normal'>
                            <p className='line-clamp-2 text-left text-gray-700'>{get(_category, 'maxCost.name')}</p>
                            <span className='text-radical-red-400'>
                                {numeral(get(_category, 'maxCost.costs')).format()}
                            </span>
                        </div>
                    ),
                },
                {
                    id: 4,
                    hidden: !get(_category, 'maxReceive._id'),
                    title: 'Tổng thu nhập nhiều nhất',
                    data: (
                        <div className='flex items-end justify-between font-normal'>
                            <p className='line-clamp-2 text-left text-gray-700'>{get(_category, 'maxReceive.name')}</p>
                            <span className='text-green-400'>
                                {numeral(get(_category, 'maxReceive.receives')).format()}
                            </span>
                        </div>
                    ),
                },
            ],
        },
        {
            id: 3,
            title: 'Ngân sách',
            className: 'xl:row-start-1 xl:col-start-2 xl:col-span-1 xl:row-span-1',
            values: [
                {
                    id: 1,
                    hidden: !get(_budget, 'maxTotal._id'),
                    title: 'Tháng có số tiền cao nhất',
                    data: (
                        <div className='flex items-end justify-between font-normal'>
                            <p className='line-clamp-2 text-left text-gray-700'>
                                {moment(get(_budget, '_maxTotal.date')).format(DATE_FORMAT.MONTH)}
                            </p>
                            <span className='text-yellow-400'>{numeral(get(_budget, 'maxTotal.total')).format()}</span>
                        </div>
                    ),
                },
            ],
        },
    ]
}
