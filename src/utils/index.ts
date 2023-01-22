import { find, flatMapDeep } from 'lodash'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { KIND_SPENDING } from '~/constant/spending'
import { localStorageValue } from '~/hook/useLocalStorage'

export const getLinkSpending = (key: KIND_SPENDING, id: string) => {
    switch (key) {
        case KIND_SPENDING.GET_LOAN:
        case KIND_SPENDING.LOAN:
            return `/loan/transaction/${id}/detail`
        default:
            return `/spending/transaction/${id}`
    }
}

interface OptionMode<T> {
    id: T
    name: string
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
