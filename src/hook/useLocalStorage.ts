import { useState } from 'react'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'

type value<T> = T | undefined
type valueSet<T> = T & ((value: value<T>) => T)
type UseLocalStorageResult<T> = [value: value<T>, set: (value: valueSet<T>) => void, remove: () => void]

const useLocalStorage = <T>(key: LOCAL_STORAGE_KEY): UseLocalStorageResult<T> => {
    const [value, setValue] = useState<value<T>>(() => {
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
