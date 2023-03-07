import { find, flatMapDeep } from 'lodash'
import { localStorageValue } from '~/@types/hook'
import { OptionMode } from '~/@types/utils'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
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
