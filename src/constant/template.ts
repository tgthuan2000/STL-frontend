import { DATE_FORMAT } from '.'
import { KIND_SPENDING } from './spending'

export enum E_FILTER_DATE {
    ALL = 0,
    DATE_RANGE = 1,
    DATE = 2,
    MONTH = 4,
    YEAR = 5,
}

export enum E_DATE_RANGE_SUGGESTION {
    THIS_WEEK = 1,
    LAST_WEEK = 2,
}
export interface IFILTER_DATE {
    id: E_FILTER_DATE
    name: string
    labelName: string
    dateName: string | undefined | null
    formatDate: keyof typeof DATE_FORMAT
}

const C = [
    'text-indigo-500',
    'text-green-500',
    'text-yellow-500',
    'text-blue-500',
    'text-orange-500',
    'text-purple-500',
    'text-pink-500',
    'text-sky-500',
    'text-lime-500',
    'text-prussian-blue-500',
    'text-teal-500',
    'text-amber-500',
]

const Bg = [
    'rgb(99, 102, 241)',
    'rgb(16, 185, 129)',
    'rgb(245, 158, 11)',
    'rgb(59, 130, 246)',
    'rgb(249, 115, 22)',
    'rgb(168, 85, 247)',
    'rgb(236, 72, 153)',
    'rgb(14, 165, 233)',
    'rgb(132, 204, 22)',
    'rgb(0, 34, 102)',
    'rgb(20, 184, 166)',
    'rgb(245, 158, 11)',
]

export const colors = {
    bg: Bg,
    text: C,
}

export const budgetLongColors = {
    bg: [...Bg].reverse(),
    text: [...C].reverse(),
}

export const getKindSpendingTextColor = (key: KIND_SPENDING | undefined) => {
    if (!key) {
        return
    }

    switch (key) {
        case KIND_SPENDING.COST:
            return 'text-red-500'
        case KIND_SPENDING.RECEIVE:
            return 'text-green-500'
        case KIND_SPENDING.TRANSFER_FROM:
        case KIND_SPENDING.TRANSFER_TO:
            return 'text-blue-500'
        case KIND_SPENDING.LOAN:
        case KIND_SPENDING.CREDIT:
            return 'text-orange-500'
    }
}

export const getAmountTextColor = (amount: number) => {
    if (amount < 0) {
        return 'text-red-500'
    }
    if (amount > 0) {
        return 'text-green-500'
    }
    return 'text-gray-500'
}
