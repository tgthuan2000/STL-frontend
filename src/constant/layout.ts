import { BellIcon, CalendarIcon, CashIcon, SwitchVerticalIcon, UserIcon } from '@heroicons/react/outline'
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
