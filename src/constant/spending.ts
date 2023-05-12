export enum KIND_SPENDING {
    RECEIVE = 'receive',
    COST = 'cost',
    TRANSFER_FROM = 'transfer-from',
    TRANSFER_TO = 'transfer-to',
    LOAN = 'loan',
    CREDIT = 'credit',
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
