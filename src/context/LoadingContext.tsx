import React, { createContext, useContext, useState } from 'react'

interface ILoadingContext {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const LoadingContext = createContext<ILoadingContext>({
    loading: false,
    setLoading: () => {},
})

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false)

    const value: ILoadingContext = {
        loading,
        setLoading,
    }
    return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
}

const useLoading = () => {
    const context = useContext(LoadingContext)

    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider. Using SlideOverHOC to wrap parent component')
    }

    return context
}

export { useLoading, LoadingProvider }
