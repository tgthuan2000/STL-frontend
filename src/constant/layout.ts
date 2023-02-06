import {
    ArrowRightOnRectangleIcon,
    ArrowsUpDownIcon,
    BanknotesIcon,
    BellIcon,
    ChatBubbleLeftRightIcon,
    LockClosedIcon,
    UserIcon,
} from '@heroicons/react/24/outline'
import React from 'react'
import { NavigationMobile, NavLinkIconProps, OptionMenu } from '~/@types/layout'
import { ThemeIcon } from '~/components'
import { localStorageValue } from '~/hook/useLocalStorage'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'
import { LOCAL_STORAGE_KEY } from './localStorage'
import { PERMISSION } from './permission'

const AccountNavLink = React.lazy(() => import('~/components/NavLink/AccountNavLink'))
const AnnounceConfigNavLink = React.lazy(() => import('~/components/NavLink/AnnounceConfigNavLink'))
const LoanNavLink = React.lazy(() => import('~/components/NavLink/LoanNavLink'))
const NotifyNavLink = React.lazy(() => import('~/components/NavLink/NotifyNavLink'))
const ProfileNavLink = React.lazy(() => import('~/components/NavLink/ProfileNavLink'))
const SettingNavLink = React.lazy(() => import('~/components/NavLink/SettingNavLink'))
const SpendingNavLink = React.lazy(() => import('~/components/NavLink/SpendingNavLink'))

const { t } = i18n

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
export const navigation: Array<Navigation> = [
    /* CLIENT */
    {
        name: t(LANGUAGE.SPENDING_MANAGEMENT),
        href: '/spending',
        icon: BanknotesIcon,
        permissions: [PERMISSION.SPENDING_READ],
    },
    // {
    //     name: t(LANGUAGE.TIME_KEEPING_MANAGEMENT),
    //     href: '/timekeeping',
    //     icon: CalendarIcon,
    //     permissions: [PERMISSION.TIMEKEEPING_READ],
    // },
    { name: t(LANGUAGE.LOAN_MANAGEMENT), href: '/loan', icon: ArrowsUpDownIcon, permissions: [PERMISSION.LOAN_READ] },

    /* ADMIN */
    {
        name: t(LANGUAGE.NOTIFY_MANAGEMENT),
        href: '/announce-config',
        icon: BellIcon,
        permissions: [PERMISSION.ANNOUNCE_CONFIG],
    },
    {
        name: t(LANGUAGE.ACCOUNT_MANAGEMENT),
        href: '/account',
        icon: UserIcon,
        permissions: [PERMISSION.ACCOUNT_READ],
    },
]

export const navigationMobile: Array<NavigationMobile> = [
    /* ADMIN */
    {
        name: t(LANGUAGE.NOTIFY_MANAGEMENT),
        href: '/announce-config',
        permissions: [PERMISSION.ANNOUNCE_CONFIG],
        component: AnnounceConfigNavLink,
    },
    {
        name: t(LANGUAGE.ACCOUNT_MANAGEMENT),
        href: '/account',
        permissions: [PERMISSION.ACCOUNT_READ],
        component: AccountNavLink,
    },

    /* CLIENT */
    {
        name: t(LANGUAGE.SPENDING_MANAGEMENT),
        href: '/spending',
        permissions: [PERMISSION.SPENDING_READ],
        component: SpendingNavLink,
    },
    // {
    //     name: t(LANGUAGE.TIME_KEEPING_MANAGEMENT),
    //     href: '/timekeeping',
    //     icon: CalendarIcon,
    //     permissions: [PERMISSION.TIMEKEEPING_READ],
    // },
    { name: t(LANGUAGE.LOAN_MANAGEMENT), href: '/loan', permissions: [PERMISSION.LOAN_READ], component: LoanNavLink },
    {
        name: t(LANGUAGE.NOTIFY_MANAGEMENT),
        href: '/notify',
        permissions: [PERMISSION.ANNOUNCE_READ],
        component: NotifyNavLink,
    },
    {
        name: t(LANGUAGE.PROFILE_MANAGEMENT),
        href: '/profile',
        permissions: [PERMISSION.PROFILE_READ],
        component: ProfileNavLink,
    },
    {
        name: t(LANGUAGE.SETTING_MANAGEMENT),
        href: '/setting',
        permissions: [PERMISSION.PROFILE_READ, PERMISSION.PROFILE_WRITE],
        component: SettingNavLink,
    },
]

export const userOptionData: Array<Array<OptionMenu>> = [
    [
        {
            id: 1,
            label: t(LANGUAGE.PROFILE_MANAGEMENT),
            onClick: ({ navigate, closeSidebar }) => {
                navigate('/profile')
                closeSidebar?.()
            },
            icon: UserIcon,
        },
        {
            id: 2,
            label: ({ userProfile }) =>
                userProfile?.isHasPassword ? t(LANGUAGE.CHANGE_PASSWORD) : t(LANGUAGE.SET_PASSWORD),
            onClick: ({ navigate, closeSidebar }) => {
                navigate('/setting/change-password')
                closeSidebar?.()
            },
            icon: LockClosedIcon,
        },
    ],
    [
        {
            id: 3,
            label: ({ theme: [value] }) => (checkDarkTheme(value) ? t(LANGUAGE.LIGHT_MODE) : t(LANGUAGE.DARK_MODE)),
            onClick: ({ theme: [value, set] }) => {
                if (checkDarkTheme(value)) {
                    document.documentElement.classList.remove('dark')
                    set('light')
                } else {
                    document.documentElement.classList.add('dark')
                    set('dark')
                }
            },
            icon: ThemeIcon,
        },
        {
            id: 4,
            label: t(LANGUAGE.FEEDBACK),
            onClick: ({ navigate }) => {
                navigate('/feedback')
            },
            icon: ChatBubbleLeftRightIcon,
        },
        {
            id: 5,
            label: t(LANGUAGE.LOGOUT),
            onClick: ({ logout }) => {
                logout()
            },
            icon: ArrowRightOnRectangleIcon,
        },
    ],
]

const checkDarkTheme = (value: localStorageValue<string>) => {
    return (
        LOCAL_STORAGE_KEY.STL_THEME in localStorage &&
        value === 'dark' &&
        document.documentElement.classList.contains('dark')
    )
}
