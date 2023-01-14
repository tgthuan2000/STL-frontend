import moment from 'moment'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { IConfig, IConfigContext, IRoleControl } from '~/@types/context'
import { PERMISSION } from '~/constant/permission'
import { KIND_SPENDING } from '~/constant/spending'
import { client } from '~/sanityConfig'
import { GET_CONFIG } from '~/schema/query/config'
import useAuth from '~/store/auth'
import { useLoading } from './LoadingContext'

const ConfigContext = createContext<IConfigContext>({
    kindSpending: [],
    budgetSpending: { _id: null },
    role: null,
    getKindSpendingId: () => '',
    getKindSpendingIds: () => [''],
    hasPermissions: () => false,
    ok: false,
})

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const { userProfile } = useAuth()
    const [config, setConfig] = useState<Omit<IConfig, 'role'> & { role: IRoleControl | null }>({
        kindSpending: [],
        budgetSpending: { _id: null },
        role: null,
    })
    const [ok, setOk] = useState(false)

    const { setConfigLoading } = useLoading()

    useEffect(() => {
        const getConfig = async () => {
            try {
                setConfigLoading(true)
                const { budgetSpending, kindSpending, role }: IConfig = await client.fetch(GET_CONFIG, {
                    date: moment().format('YYYY-MM-01'),
                    userId: userProfile?._id as string,
                })
                setConfig({
                    budgetSpending,
                    kindSpending,
                    role: role?.role as IRoleControl,
                })
                setOk(true)
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

    const getKindSpendingIds = useCallback(
        (...KEYS: (keyof typeof KIND_SPENDING)[]) => {
            const result: string[] = []
            KEYS.forEach((KEY) => {
                const item = config.kindSpending.find((kind) => kind.key.toLowerCase() === KIND_SPENDING[KEY])
                if (item) {
                    result.push(item._id)
                }
            })
            return result
        },
        [config.kindSpending]
    )

    const hasPermissions = useCallback(
        (permissions: Array<PERMISSION>) => {
            if (!config.role) {
                return false
            }
            return config.role.permissions.some((item) => permissions.includes(item._id))
        },
        [config.role]
    )

    const value: IConfigContext = {
        ok,
        kindSpending: config.kindSpending,
        budgetSpending: config.budgetSpending,
        role: config.role,
        getKindSpendingId,
        getKindSpendingIds,
        hasPermissions,
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
