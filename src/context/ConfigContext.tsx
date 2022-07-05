import React, { createContext, useContext, useEffect, useState } from 'react'
import { IConfigContext, IKindSpending } from '~/@types/context'
import { client } from '~/sanityConfig'
import { useLoading } from './LoadingContext'

const ConfigContext = createContext<IConfigContext>({
    kindSpending: [],
})

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [kindSpending, setKindSpending] = useState<IKindSpending[]>([])
    const { setLoading } = useLoading()

    useEffect(() => {
        const getConfig = async () => {
            try {
                setLoading(true)
                const res: IConfigContext = await client.fetch(
                    `
                    *[_type == "config"][0] {
                        kindSpending[]-> {
                            _id,
                            key,
                            name
                        }
                    }
                    `
                )
                setKindSpending(res.kindSpending)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getConfig()
    }, [])

    const value: IConfigContext = {
        kindSpending,
    }
    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

const useConfig = () => {
    const context = useContext(ConfigContext)

    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider. Using SlideOverHOC to wrap parent component')
    }

    return context
}

export { useConfig, ConfigProvider }
