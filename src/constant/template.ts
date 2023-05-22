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

const C = ['indigo-500', 'green-500', 'yellow-500', 'blue-500', 'orange-500', 'purple-500', 'pink-500']

const Bg = [
    'rgb(99, 102, 241)',
    'rgb(16, 185, 129)',
    'rgb(245, 158, 11)',
    'rgb(59 130 246)',
    'rgb(249, 115, 22)',
    'rgb(168, 85, 247)',
    'rgb(236, 72, 153)',
]

export const colors = {
    bg: Bg,
    text: C.map((c) => `text-${c}`),
}

export const budgetLongColors = {
    bg: [...Bg].reverse(),
    text: [...C].reverse().map((c) => `text-${c}`),
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
