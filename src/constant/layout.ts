import React from 'react'
import { localStorageValue } from '~/@types/hook'
import { NavLinkIconProps, OptionMenu } from '~/@types/layout'
import { LOCAL_STORAGE_KEY } from './localStorage'
import { PERMISSION } from './permission'

const SettingMenuItem = React.lazy(() => import('~/components/MenuItem/SettingMenuItem'))
const ProfileMenuItem = React.lazy(() => import('~/components/MenuItem/ProfileMenuItem'))
const ChangePasswordMenuItem = React.lazy(() => import('~/components/MenuItem/ChangePasswordMenuItem'))
const ModeMenuItem = React.lazy(() => import('~/components/MenuItem/ModeMenuItem'))
const FeedbackMenuItem = React.lazy(() => import('~/components/MenuItem/FeedbackMenuItem'))
const LogoutMenuItem = React.lazy(() => import('~/components/MenuItem/LogoutMenuItem'))

export interface Navigation {
    name: string
    href: string
    icon: any
    permissions: Array<PERMISSION>
}
export interface MobileNavigation {
    name: string
    href: string
    permissions: Array<PERMISSION>
    component: React.FC<NavLinkIconProps>
}

export const userOptionData: Array<Array<OptionMenu>> = [
    [
        {
            id: 'setting',
            component: SettingMenuItem,
            permissions: [PERMISSION.PROFILE_READ, PERMISSION.PROFILE_WRITE],
        },
    ],
    [
        {
            id: 'profile',
            component: ProfileMenuItem,
            permissions: [PERMISSION.PROFILE_READ],
        },
        {
            id: 'change-password',
            component: ChangePasswordMenuItem,
            permissions: [PERMISSION.PROFILE_CHANGE_PASSWORD],
        },
    ],
    [
        {
            id: 'mode',
            component: ModeMenuItem,
            permissions: [PERMISSION.PROFILE_CHANGE_MODE],
        },
        {
            id: 'feedback',
            component: FeedbackMenuItem,
            permissions: [PERMISSION.FEEDBACK],
        },
        {
            id: 'logout',
            component: LogoutMenuItem,
            permissions: [PERMISSION.PROFILE_READ],
        },
    ],
]

export const checkDarkTheme = (value: localStorageValue<string>) => {
    return (
        LOCAL_STORAGE_KEY.STL_THEME in localStorage &&
        value === 'dark' &&
        document.documentElement.classList.contains('dark')
    )
}
