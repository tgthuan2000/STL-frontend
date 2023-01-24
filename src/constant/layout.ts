import { BellIcon, CashIcon, LockClosedIcon, LogoutIcon, SwitchVerticalIcon, UserIcon } from '@heroicons/react/outline'
import React from 'react'
import { NavigationMobile, OptionMenu } from '~/@types/layout'
import { ThemeIcon } from '~/components'
import { localStorageValue } from '~/hook/useLocalStorage'
import { LOCAL_STORAGE_KEY } from './localStorage'
import { PERMISSION } from './permission'

const AccountNavLink = React.lazy(() => import('~/components/NavLink/AccountNavLink'))
const AnnounceConfigNavLink = React.lazy(() => import('~/components/NavLink/AnnounceConfigNavLink'))
const LoanNavLink = React.lazy(() => import('~/components/NavLink/LoanNavLink'))
const NotifyNavLink = React.lazy(() => import('~/components/NavLink/NotifyNavLink'))
const ProfileNavLink = React.lazy(() => import('~/components/NavLink/ProfileNavLink'))
const SettingNavLink = React.lazy(() => import('~/components/NavLink/SettingNavLink'))
const SpendingNavLink = React.lazy(() => import('~/components/NavLink/SpendingNavLink'))

export interface Navigation {
    name: string
    href: string
    icon: any
    permissions: Array<PERMISSION>
}
export const navigation: Array<Navigation> = [
    /* CLIENT */
    { name: 'Quản lý chi tiêu', href: '/spending', icon: CashIcon, permissions: [PERMISSION.SPENDING_READ] },
    // {
    //     name: 'Quản lý chấm công',
    //     href: '/timekeeping',
    //     icon: CalendarIcon,
    //     permissions: [PERMISSION.TIMEKEEPING_READ],
    // },
    { name: 'Quản lý vay / cho vay', href: '/loan', icon: SwitchVerticalIcon, permissions: [PERMISSION.LOAN_READ] },

    /* ADMIN */
    {
        name: 'Thông báo',
        href: '/announce-config',
        icon: BellIcon,
        permissions: [PERMISSION.ANNOUNCE_CONFIG],
    },
    {
        name: 'Quản lý tài khoản',
        href: '/account',
        icon: UserIcon,
        permissions: [PERMISSION.ACCOUNT_READ],
    },
]

export const navigationMobile: Array<NavigationMobile> = [
    /* ADMIN */
    {
        name: 'Thông báo',
        href: '/announce-config',
        permissions: [PERMISSION.ANNOUNCE_CONFIG],
        component: AnnounceConfigNavLink,
    },
    {
        name: 'Quản lý tài khoản',
        href: '/account',
        permissions: [PERMISSION.ACCOUNT_READ],
        component: AccountNavLink,
    },

    /* CLIENT */
    {
        name: 'Quản lý chi tiêu',
        href: '/spending',
        permissions: [PERMISSION.SPENDING_READ],
        component: SpendingNavLink,
    },
    // {
    //     name: 'Quản lý chấm công',
    //     href: '/timekeeping',
    //     icon: CalendarIcon,
    //     permissions: [PERMISSION.TIMEKEEPING_READ],
    // },
    { name: 'Quản lý vay / cho vay', href: '/loan', permissions: [PERMISSION.LOAN_READ], component: LoanNavLink },
    { name: 'Thông báo', href: '/notify', permissions: [PERMISSION.ANNOUNCE_READ], component: NotifyNavLink },
    { name: 'Thông tin cá nhân', href: '/profile', permissions: [PERMISSION.PROFILE_READ], component: ProfileNavLink },
    {
        name: 'Cài đặt',
        href: '/setting',
        permissions: [PERMISSION.PROFILE_READ, PERMISSION.PROFILE_WRITE],
        component: SettingNavLink,
    },
]

export const userOptionData: Array<Array<OptionMenu>> = [
    [
        {
            id: 1,
            label: 'Thông tin cá nhân',
            onClick: ({ navigate, closeSidebar }) => {
                navigate('/profile')
                closeSidebar?.()
            },
            icon: UserIcon,
        },
        {
            id: 2,
            label: ({ userProfile }) => (userProfile?.isHasPassword ? 'Đổi' : 'Đặt') + ' mật khẩu',
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
            label: ({ theme: [value] }) => (checkDarkTheme(value) ? 'Chế độ sáng' : 'Chế độ tối'),
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
            label: 'Đăng xuất',
            onClick: ({ logout }) => {
                logout()
            },
            icon: LogoutIcon,
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
