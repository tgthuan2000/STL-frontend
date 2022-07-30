import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { IConfigContext, IKindSpending } from '~/@types/context'
import { KIND_LOAN } from '~/constant/loan'
import { KIND_SPENDING } from '~/constant/spending'
import { client } from '~/sanityConfig'
import { GET_CONFIG } from '~/schema/query/config'
import { useLoading } from './LoadingContext'

const ConfigContext = createContext<IConfigContext>({
    kindSpending: [],
    getKindSpendingId: () => '',
    kindLoan: [],
    getKindLoanId: () => '',
})
interface IConfig {
    kindSpending: IKindSpending[]
    kindLoan: any[]
}

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<IConfig>({
        kindSpending: [],
        kindLoan: [],
    })
    const { setConfigLoading } = useLoading()

    useEffect(() => {
        const getConfig = async () => {
            try {
                setConfigLoading(true)
                const res: IConfig = await client.fetch(GET_CONFIG)
                setConfig(res)
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
            return config.kindSpending.find((kind) => kind.key.toLowerCase() === KIND_SPENDING[KEY])?._id
        },
        [config.kindSpending]
    )

    const getKindLoanId = useCallback(
        (KEY: keyof typeof KIND_LOAN) => {
            return config.kindLoan.find((kind) => kind.key.toLowerCase() === KIND_LOAN[KEY])?._id
        },
        [config.kindLoan]
    )

    const value: IConfigContext = {
        kindSpending: config.kindSpending,
        kindLoan: config.kindLoan,
        getKindSpendingId,
        getKindLoanId,
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
