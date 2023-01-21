import { BellIcon, CashIcon, LockClosedIcon, LogoutIcon, SwitchVerticalIcon, UserIcon } from '@heroicons/react/outline'
import { OptionMenu } from '~/@types/layout'
import { ThemeIcon } from '~/components'
import { localStorageValue } from '~/hook/useLocalStorage'
import { LOCAL_STORAGE_KEY } from './localStorage'
import { PERMISSION } from './permission'

interface Navigation {
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

export const userOptionData: Array<Array<OptionMenu>> = [
    [
        {
            id: 1,
            label: 'Thông tin cá nhân',
            onClick: ({ navigate, closeSidebar }) => {
                navigate('/profile')
                closeSidebar()
            },
            icon: UserIcon,
        },
        {
            id: 2,
            label: ({ userProfile }) => (userProfile?.isHasPassword ? 'Đổi' : 'Đặt') + ' mật khẩu',
            onClick: ({ navigate, closeSidebar }) => {
                navigate('/profile/change-password')
                closeSidebar()
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
