import { SanityDocument } from '@sanity/client'
import { get } from 'lodash'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IUserProfile } from '~/@types/auth'
import { IConfig, IConfigContext, IRoleControl } from '~/@types/context'
import axios from '~/axiosConfig'
import { CODE } from '~/constant/code'
import { PERMISSION } from '~/constant/permission'
import { KIND_SPENDING } from '~/constant/spending'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_CONFIG } from '~/schema/query/config'
import { service } from '~/services'
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
        const { accessToken, refreshToken, setToken, removeToken } = useAuth()
        const { userProfile, addUserProfile } = useProfile()
        const { pathname } = useLocation()
        const { t } = useTranslation()

        useEffect(() => {
            if (userProfile !== null || accessToken === null) return
            const getUserProfile = async () => {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                    const { data } = await axios.get<SanityDocument<IUserProfile>>('/auth/profile')
                    if (data) {
                        addUserProfile(data)
                    }
                } catch (error: any) {
                    if (get(error, 'response.data.code') === CODE.ACCESS_TOKEN_EXPIRED) {
                        axios.defaults.headers.common['Authorization'] = null

                        try {
                            const data = (await axios.post('/auth/access-token', {
                                refreshToken,
                            })) as { accessToken: string }

                            if (data) {
                                setToken({ accessToken: data.accessToken })
                            }
                        } catch (error: any) {
                            if (get(error, 'response.data.code') === CODE.REFRESH_TOKEN_EXPIRED) {
                                removeToken()
                                toast.warn(t(LANGUAGE.NOTIFY_EXPIRED_TOKEN))
                            }
                        }
                    }
                }
            }
            getUserProfile()
        }, [accessToken, userProfile, accessToken])

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
                        budgetSpending: { _id: service.getBudgetId(userProfile?._id as string) },
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
