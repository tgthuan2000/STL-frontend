import { SanityDocument } from '@sanity/client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { IUserProfile } from '~/@types/auth'
import { IConfig, IConfigContext, IRoleControl } from '~/@types/context'
import axios from '~/axiosConfig'
import { PERMISSION } from '~/constant/permission'
import { KIND_SPENDING } from '~/constant/spending'
import { client } from '~/sanityConfig'
import { GET_CONFIG } from '~/schema/query/config'
import { getBudgetId } from '~/services'
import { useAuth, useProfile } from '~/store/auth'
import { useLoading } from './LoadingContext'

interface IConfigProps {
    children: React.ReactNode
}

const ConfigContext = createContext<IConfigContext>({
    kindSpending: [],
    budgetSpending: { _id: null },
    role: null,
    getKindSpendingId: () => '',
    getKindSpendingIds: () => [''],
    hasPermissions: () => false,
})

const configHOC = (Component: React.FC<IConfigProps>) => {
    return ({ children }: IConfigProps) => {
        const { accessToken } = useAuth()
        const { userProfile, addUserProfile } = useProfile()
        const { pathname } = useLocation()

        useEffect(() => {
            if (userProfile !== null || accessToken === null) return
            const getUserProfile = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                    const { data } = await axios.get<SanityDocument<IUserProfile>>('/auth/profile')
                    if (data) {
                        addUserProfile(data)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            getUserProfile()
        }, [accessToken, userProfile])

        if (!accessToken) return <Navigate to='/auth' replace={true} state={{ url: pathname }} />

        if (userProfile === null) return null

        return <Component>{children}</Component>
    }
}

const ConfigProvider = configHOC(({ children }) => {
    const { userProfile } = useProfile()
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
                if (userProfile?._id) {
                    const { kindSpending, role }: IConfig = await client.fetch(GET_CONFIG, {
                        userId: userProfile?._id as string,
                    })
                    setConfig((prev) => ({
                        ...prev,
                        kindSpending,
                        budgetSpending: { _id: getBudgetId(userProfile?._id as string) },
                        role: role?.role as IRoleControl,
                    }))
                    setOk(true)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setConfigLoading(false)
            }
        }
        getConfig()
    }, [userProfile])

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
        kindSpending: config.kindSpending,
        budgetSpending: config.budgetSpending,
        role: config.role,
        getKindSpendingId,
        getKindSpendingIds,
        hasPermissions,
    }

    if (!ok) {
        return null
    }

    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
})

const useConfig = () => {
    const context = useContext(ConfigContext)

    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider')
    }

    return context
}

export { useConfig, ConfigProvider }
