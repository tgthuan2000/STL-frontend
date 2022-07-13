import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { IConfigContext, IKindSpending } from '~/@types/context'
import { KIND_SPENDING } from '~/constant/spending'
import { client } from '~/sanityConfig'
import { GET_CONFIG } from '~/schema/query/config'
import { useLoading } from './LoadingContext'

const ConfigContext = createContext<IConfigContext>({
    kindSpending: [],
    getKindSpendingId: () => '',
})

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [kindSpending, setKindSpending] = useState<IKindSpending[]>([])
    const { setConfigLoading } = useLoading()

    useEffect(() => {
        const getConfig = async () => {
            try {
                setConfigLoading(true)
                const res: IConfigContext = await client.fetch(GET_CONFIG)
                setKindSpending(res.kindSpending)
            } catch (error) {
                console.log(error)
            } finally {
                setConfigLoading(false)
            }
        }
        getConfig()
    }, [])

    const getKindSpendingId = useCallback(
        (KEY: keyof typeof KIND_SPENDING) => {
            return kindSpending.find((kind) => kind.key.toLowerCase() === KIND_SPENDING[KEY])?._id
        },
        [kindSpending]
    )

    const value: IConfigContext = {
        kindSpending,
        getKindSpendingId,
    }
    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

const useConfig = () => {
    const context = useContext(ConfigContext)

    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider')
    }

    return context
}

export { useConfig, ConfigProvider }
