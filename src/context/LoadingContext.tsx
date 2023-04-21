import React, { createContext, useContext, useState } from 'react'
import { ILoadingContext } from '~/@types/context'
import { Loading } from '~/components'

const LoadingContext = createContext<ILoadingContext>({
    loading: {
        config: false,
        submit: false,
    },
    setConfigLoading: () => {},
    setSubmitLoading: () => {},
})

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState({
        config: false,
        submit: false,
    })

    const setConfigLoading = (config: boolean) => {
        setLoading((prev) => ({ ...prev, config }))
    }

    const setSubmitLoading = (submit: boolean) => {
        setLoading((prev) => ({ ...prev, submit }))
    }

    const value: ILoadingContext = {
        loading,
        setConfigLoading,
        setSubmitLoading,
    }
    return (
        <LoadingContext.Provider value={value}>
            <Loading />
            {children}
        </LoadingContext.Provider>
    )
}

const useLoading = () => {
    const context = useContext(LoadingContext)

    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider')
    }

    return context
}

export { useLoading, LoadingProvider }
