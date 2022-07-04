import {
    ClipboardListIcon,
    HomeIcon,
    LogoutIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    QrcodeIcon,
    SwitchHorizontalIcon,
} from '@heroicons/react/outline'
import { IMenuBtn } from '~/@types/components'
import { MakeIncome, MakeCost, MakeTransfer } from '~/components'

export const menuMobile: IMenuBtn[] = [
    {
        title: 'Thêm thu nhập',
        color: 'text-green-700 bg-green-200 hover:bg-green-300',
        icon: PlusCircleIcon,
        children: () => <MakeIncome />,
        to: '?slide=add-income',
        query: {
            slide: 'add-income',
        },
    },
    {
        title: 'Thêm chi phí',
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300',
        icon: MinusCircleIcon,
        children: () => <MakeCost />,
        to: '?slide=add-payment',
        query: {
            slide: 'add-payment',
        },
    },
    {
        title: 'Chuyển khoản',
        color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300',
        icon: SwitchHorizontalIcon,
        children: () => <MakeTransfer />,
        to: '?slide=transfer',
        query: {
            slide: 'transfer',
        },
    },
    {
        title: 'Giao dịch',
        color: 'text-orange-700 bg-orange-200 hover:bg-orange-300',
        icon: ClipboardListIcon,
        to: 'transaction',
    },
]

export const menuPC: IMenuBtn[] = [
    {
        title: 'Thêm thu nhập',
        color: 'text-green-700 bg-green-200 hover:bg-green-300',
        icon: PlusCircleIcon,
        children: () => <MakeIncome />,
        to: '?slide=add-income',
        query: {
            slide: 'add-income',
        },
    },
    {
        title: 'Thêm chi phí',
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300',
        icon: MinusCircleIcon,
        children: () => <MakeCost />,
        to: '?slide=add-payment',
        query: {
            slide: 'add-payment',
        },
    },
    {
        title: 'Chuyển khoản',
        color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300',
        icon: SwitchHorizontalIcon,
        children: () => <MakeTransfer />,
        to: '?slide=transfer',
        query: {
            slide: 'transfer',
        },
    },
    {
        title: 'Đăng xuất',
        color: 'text-gray-700 bg-gray-200 hover:bg-gray-300',
        icon: LogoutIcon,
        to: '/',
        divider: true,
    },
    {
        title: 'Trang chủ',
        color: 'text-red-700 bg-red-200 hover:bg-red-300',
        icon: HomeIcon,
        to: '/',
    },
    {
        title: 'Giao dịch',
        color: 'text-orange-700 bg-orange-200 hover:bg-orange-300',
        icon: ClipboardListIcon,
        to: 'transaction',
    },
    {
        title: 'Phương thức thanh toán',
        color: 'text-purple-700 bg-purple-200 hover:bg-purple-300',
        icon: QrcodeIcon,
        to: 'method',
    },
]

export const people = [{ id: 1, name: 'Leslie Alexander' }]
