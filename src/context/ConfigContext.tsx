import { SanityDocument } from '@sanity/client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IUserProfile } from '~/@types/auth'
import { IConfig, IConfigContext } from '~/@types/context'
import axios from '~/axiosConfig'
import LoadingText from '~/components/Loading/LoadingText'
import { CODE } from '~/constant/code'
import { PERMISSION } from '~/constant/permission'
import { KIND_SPENDING } from '~/constant/spending'
import { useAxios, useLogout } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_CONFIG } from '~/schema/query/config'
import { service } from '~/services'
import { useAuth, useProfile } from '~/store/auth'
import { useFlashScreen } from './FlashScreenContext'
import { IRoleControl } from '~/@types/role-control'

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
        const { showFlashScreen, hiddenFlashScreen } = useFlashScreen()
        const { accessToken, refreshToken, setToken } = useAuth()
        const { userProfile, addUserProfile } = useProfile()
        const { pathname } = useLocation()
        const { t } = useTranslation()
        const logout = useLogout()
        const _axios = useAxios()

        useEffect(() => {
            if (userProfile !== null || accessToken === null) {
                return
            }
            const getUserProfile = async () => {
                try {
                    showFlashScreen(
                        <LoadingText
                            text={t(LANGUAGE.LOADING_PROFILE)}
                            className='text-md whitespace-nowrap sm:text-lg'
                        />
                    )
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                    const { data } = await _axios.get<SanityDocument<IUserProfile>>('/auth/profile')
                    if (data) {
                        addUserProfile(data)
                    }
                } catch (error: any) {
                    showFlashScreen(
                        <LoadingText
                            text={t(LANGUAGE.RELOADING_PROFILE)}
                            className='text-md whitespace-nowrap sm:text-lg'
                        />
                    )
                    axios.defaults.headers.common['Authorization'] = null
                    switch (error.message) {
                        case CODE.ACCESS_TOKEN_EXPIRED: {
                            try {
                                const { data } = await _axios.post<{ accessToken: string }>('/auth/access-token', {
                                    refreshToken,
                                })

                                if (data?.accessToken) {
                                    setToken({ accessToken: data.accessToken })
                                }
                            } catch (error: any) {
                                hiddenFlashScreen()
                                switch (error.message) {
                                    case CODE.REFRESH_TOKEN_EXPIRED: {
                                        await logout()
                                        toast.warn(t(LANGUAGE.NOTIFY_EXPIRED_TOKEN))
                                        break
                                    }
                                    case CODE.TOKEN_REVOKED: {
                                        toast.warn(t(LANGUAGE.NOTIFY_TOKEN_REVOKED))
                                        await logout()
                                        break
                                    }
                                    default: {
                                        toast.error(error.message)
                                        await logout()
                                    }
                                }
                            }
                            break
                        }
                        case CODE.INACTIVE_ACCOUNT: {
                            toast.error(t(LANGUAGE.NOTIFY_INACTIVE_ACCOUNT))
                            hiddenFlashScreen()
                            await logout()
                            break
                        }
                        default: {
                            toast.error(error.message)
                            await logout()
                        }
                    }
                }
            }
            getUserProfile()
        }, [accessToken, userProfile])

        if (!accessToken) return <Navigate to='/auth' replace={true} state={{ url: pathname }} />

        if (userProfile === null) {
            return <></>
        }

        return <Component>{children}</Component>
    }
}

const ConfigProvider = configHOC(({ children }) => {
    const { userProfile } = useProfile()
    const { showFlashScreen, hiddenFlashScreen } = useFlashScreen()
    const [config, setConfig] = useState<Omit<IConfig, 'role'> & { role: IRoleControl | null }>({
        kindSpending: [],
        budgetSpending: { _id: null },
        role: null,
    })
    const { t } = useTranslation()
    const [ok, setOk] = useState(false)

    useEffect(() => {
        const getConfig = async () => {
            try {
                if (userProfile?._id && config.role === null) {
                    showFlashScreen(
                        <LoadingText
                            text={t(LANGUAGE.LOADING_CONFIG)}
                            className='text-md whitespace-nowrap sm:text-lg'
                        />
                    )
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
                hiddenFlashScreen()
            }
        }
        getConfig()
    }, [userProfile, config])

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
        return <></>
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
