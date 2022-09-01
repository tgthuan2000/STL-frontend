import { Navigation } from '~/@types/layout'

export const navigation: () => Promise<Navigation[]> = async () => {
    const { CalendarIcon, CashIcon, SwitchVerticalIcon } = await import('@heroicons/react/outline')
    return [
        { name: 'Quản lý chi tiêu', href: '/spending', icon: CashIcon },
        // { name: 'Quản lý chấm công', href: '/timekeeping', icon: CalendarIcon },
        { name: 'Quản lý vay / cho vay', href: '/loan', icon: SwitchVerticalIcon },
    ]
}
