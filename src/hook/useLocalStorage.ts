import { useState } from 'react'
import { localStorageValue, UseLocalStorageResult, valueSet } from '~/@types/hook'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'

const useLocalStorage = <T>(key: LOCAL_STORAGE_KEY): UseLocalStorageResult<T> => {
    const [value, setValue] = useState<localStorageValue<T>>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : undefined
        } catch (error) {
            console.log(error)
            return undefined
        }
    })

    const setLocalStorageValue = (_value: valueSet<T>) => {
        try {
            const valueToStore = (_value instanceof Function ? _value(value) : _value) as T
            setValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.log(error)
        }
    }

    const removeLocalStorageValue = () => {
        try {
            setValue(undefined)
            window.localStorage.removeItem(key)
        } catch (error) {
            console.log(error)
        }
    }

    return [value, setLocalStorageValue, removeLocalStorageValue]
}

export default useLocalStorage
