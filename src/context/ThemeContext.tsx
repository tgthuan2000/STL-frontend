import React, { createContext } from 'react'
import { localStorageValue, valueSet } from '~/@types/hook'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import useLocalStorage from '../hook/useLocalStorage'
import { useContext } from 'react'
import { useLayoutEffect } from 'react'
import { checkDarkTheme } from '~/utils'
import { useWindowSize } from '~/hook'
import { ToastContainer } from 'react-toastify'

interface ThemeContext {
    theme: localStorageValue<string>
    isDarkTheme: boolean
    setTheme: (value: valueSet<string>) => void
    removeTheme: () => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContext>({
    theme: 'light',
    isDarkTheme: false,
    setTheme: (value) => {},
    removeTheme: () => {},
    toggleTheme: () => {},
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme, removeTheme] = useLocalStorage<string>(LOCAL_STORAGE_KEY.STL_THEME)

    const isDarkTheme = checkDarkTheme(theme)

    useLayoutEffect(() => {
        isDarkTheme ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
    }, [])

    const toggleTheme = () => {
        if (isDarkTheme) {
            document.documentElement.classList.remove('dark')
            setTheme('light')
        } else {
            document.documentElement.classList.add('dark')
            setTheme('dark')
        }
    }

    const value = { theme, isDarkTheme, setTheme, removeTheme, toggleTheme }

    return (
        <ThemeContext.Provider value={value}>
            <Toast />
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    const context = useContext(ThemeContext)

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context
}

const Toast = () => {
    const { width } = useWindowSize()
    const { isDarkTheme } = useTheme()

    return (
        <ToastContainer
            position={width > 768 ? 'top-center' : 'bottom-center'}
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={isDarkTheme ? 'colored' : 'dark'}
        />
    )
}

export { ThemeProvider, useTheme }
