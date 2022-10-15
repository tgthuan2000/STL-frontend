import { KIND_SPENDING } from '~/constant/spending'

export const getLinkSpending = (key: KIND_SPENDING, id: string) => {
    switch (key) {
        case KIND_SPENDING.GET_LOAN:
        case KIND_SPENDING.LOAN:
            return `/loan/transaction/${id}/detail`
        default:
            return `/spending/transaction/${id}`
    }
}
