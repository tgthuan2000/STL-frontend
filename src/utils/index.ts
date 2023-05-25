import { find, flatMapDeep, isEmpty } from 'lodash'
import moment from 'moment'
import { localStorageValue } from '~/@types/hook'
import { OptionMode } from '~/@types/utils'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { KIND_SPENDING } from '~/constant/spending'

export const getLinkSpending = (key: KIND_SPENDING, id: string) => {
    switch (key) {
        case KIND_SPENDING.CREDIT:
        case KIND_SPENDING.LOAN:
            return `/loan/transaction/${id}/detail`
        default:
            return `/spending/transaction/${id}`
    }
}

export const getDefaultMode = <T extends number>(array: OptionMode<T>[][], mode: number | undefined) => {
    return mode ? (find(flatMapDeep(array), { id: mode }) as OptionMode<T>) : array[0][0]
}

export const checkDarkTheme = (value: localStorageValue<string>) => {
    return (
        value === 'dark' ||
        (!(LOCAL_STORAGE_KEY.STL_THEME in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
}

export const getImageReference = (imageId: string | null | undefined) => {
    if (!imageId) return null
    return { image: { _type: 'image', asset: { _type: 'reference', _ref: imageId } } }
}

const initialMonths = () => {
    let months = {}

    const getMonths = () => {
        if (isEmpty(months)) {
            months = Array.from(Array(moment().daysInMonth())).reduce((result, item, index) => {
                const month = moment()
                    .date(index + 1)
                    .format('YYYY-MM-DD')
                result[month] = []

                return result
            }, {})
        }

        return months
    }
    return getMonths
}

export const getMonths = initialMonths()

export const getBudgetProgressColor = (percent: number) => {
    if (percent >= 100) {
        return { color: 'text-purple-500', bgColor: 'rgb(168, 85, 247)' }
    }
    if (percent > 75) {
        return { color: 'text-red-500', bgColor: 'red' }
    }
    if (percent > 50) {
        return { color: 'text-orange-500', bgColor: 'rgb(249, 115, 22)' }
    }
    if (percent > 30) {
        return { color: 'text-yellow-500', bgColor: 'rgb(245, 158, 11)' }
    }
    return { color: 'text-green-500', bgColor: 'rgb(16, 185, 129)' }
}
