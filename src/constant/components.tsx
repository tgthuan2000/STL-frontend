import {
    ClipboardListIcon,
    HomeIcon,
    LogoutIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    PuzzleIcon,
    QrcodeIcon,
    SwitchHorizontalIcon,
    TemplateIcon,
    TrendingUpIcon,
    UserAddIcon,
} from '@heroicons/react/outline'
import { googleLogout } from '@react-oauth/google'
import { IMenuBtn } from '~/@types/components'
import { CreateMember, MakeGetLoan } from '~/features/loan/components'
import { AddCategory, AddMethod, MakeBudget, MakeCost, MakeIncome, MakeTransfer } from '~/features/spending/components'

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

export const menuLoanMobile: IMenuBtn[] = [
    {
        title: 'Vay tiền',
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300',
        icon: TrendingUpIcon,
        children: () => <MakeGetLoan />,
        to: '?slide=get-loan',
        query: {
            slide: 'get-loan',
        },
    },
    // {
    //     title: 'Cho vay tiền',
    //     color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300',
    //     icon: TrendingDownIcon,
    //     children: () => <MakeLoan />,
    //     to: '?slide=loan',
    //     query: {
    //         slide: 'loan',
    //     },
    // },
    {
        title: 'Tạo thành viên',
        color: 'text-green-700 bg-green-200 hover:bg-green-300',
        icon: UserAddIcon,
        children: () => <CreateMember />,
        to: '?slide=create-member',
        query: {
            slide: 'create-member',
        },
    },
]

export const menuSpendingPC: IMenuBtn[] = [
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
        title: 'Ngân sách',
        color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300',
        icon: PuzzleIcon,
        children: () => <MakeBudget />,
        to: '?slide=budget',
        query: {
            slide: 'budget',
        },
    },

    {
        title: 'Đăng xuất',
        color: 'text-gray-700 bg-gray-200 hover:bg-gray-300',
        icon: LogoutIcon,
        to: '/',
        action: (removeUserProfile) => {
            googleLogout()
            removeUserProfile()
        },
        divider: true,
    },
    {
        title: 'Trang chủ',
        color: 'text-red-700 bg-red-200 hover:bg-red-300',
        icon: HomeIcon,
        to: '/spending',
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
    {
        title: 'Tạo mới phương thức thanh toán',
        color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300',
        icon: QrcodeIcon,
        children: () => <AddMethod />,
        to: '?slide=add-method',
        query: {
            slide: 'add-method',
        },
        divider: true,
    },
    {
        title: 'Tạo mới thể loại',
        color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300',
        icon: TemplateIcon,
        children: () => <AddCategory />,
        to: '?slide=add-category',
        query: {
            slide: 'add-category',
        },
    },
]

export const menuLoanPC: IMenuBtn[] = [
    {
        title: 'Vay tiền',
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300',
        icon: TrendingUpIcon,
        children: () => <MakeGetLoan />,
        to: '?slide=get-loan',
        query: {
            slide: 'get-loan',
        },
    },
    // {
    //     title: 'Cho vay tiền',
    //     color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300',
    //     icon: TrendingDownIcon,
    //     children: () => <MakeLoan />,
    //     to: '?slide=loan',
    //     query: {
    //         slide: 'loan',
    //     },
    // },
    {
        title: 'Tạo thành viên',
        color: 'text-green-700 bg-green-200 hover:bg-green-300',
        icon: UserAddIcon,
        children: () => <CreateMember />,
        to: '?slide=create-member',
        query: {
            slide: 'create-member',
        },
    },
    {
        title: 'Đăng xuất',
        color: 'text-gray-700 bg-gray-200 hover:bg-gray-300',
        icon: LogoutIcon,
        to: '/',
        action: (removeUserProfile) => {
            googleLogout()
            removeUserProfile()
        },
        divider: true,
    },
    {
        title: 'Trang chủ',
        color: 'text-red-700 bg-red-200 hover:bg-red-300',
        icon: HomeIcon,
        to: '/loan',
    },
    {
        title: 'Giao dịch',
        color: 'text-orange-700 bg-orange-200 hover:bg-orange-300',
        icon: ClipboardListIcon,
        to: 'transaction',
    },
    // {
    //     title: 'Phương thức thanh toán',
    //     color: 'text-purple-700 bg-purple-200 hover:bg-purple-300',
    //     icon: QrcodeIcon,
    //     to: 'method',
    // },
]

export const menuSpendingPages: IMenuBtn[] = [
    {
        title: 'Trang chủ',
        color: 'text-red-700',
        icon: HomeIcon,
        to: '/spending',
    },
    {
        title: 'Giao dịch',
        color: 'text-orange-700',
        icon: ClipboardListIcon,
        to: 'transaction',
    },
    {
        title: 'PTTT',
        color: 'text-purple-700',
        icon: QrcodeIcon,
        to: 'method',
    },
    {
        title: 'Ngân sách',
        color: 'text-yellow-700',
        icon: PuzzleIcon,
        children: () => <MakeBudget />,
        to: '?slide=budget',
        query: {
            slide: 'budget',
        },
        divider: true,
    },
    {
        title: 'Tạo mới phương thức thanh toán',
        color: 'text-cyan-700',
        icon: QrcodeIcon,
        children: () => <AddMethod />,
        to: '?slide=add-method',
        query: {
            slide: 'add-method',
        },
    },
    {
        title: 'Tạo mới thể loại',
        color: 'text-cyan-700',
        icon: TemplateIcon,
        children: () => <AddCategory />,
        to: '?slide=add-category',
        query: {
            slide: 'add-category',
        },
    },
]
export const menuLoanPages: IMenuBtn[] = [
    {
        title: 'Trang chủ',
        color: 'text-red-700',
        icon: HomeIcon,
        to: '/loan',
    },
    {
        title: 'Giao dịch',
        color: 'text-orange-700',
        icon: ClipboardListIcon,
        to: 'transaction',
    },
    // {
    //     title: 'PTTT',
    //     color: 'text-purple-700',
    //     icon: QrcodeIcon,
    //     to: 'method',
    // },
]

export const people = [
    { _id: 1, name: 'Wade Cooper' },
    { _id: 2, name: 'Arlene Mccoy' },
    { _id: 3, name: 'Devon Webb' },
    { _id: 4, name: 'Tom Cook' },
    { _id: 5, name: 'Tanya Fox' },
    { _id: 6, name: 'Hellen Schmidt' },
    { _id: 7, name: 'Caroline Schultz' },
    { _id: 8, name: 'Mason Heaney' },
    { _id: 9, name: 'Claudie Smitham' },
    { _id: 10, name: 'Emil Schaefer' },
]
