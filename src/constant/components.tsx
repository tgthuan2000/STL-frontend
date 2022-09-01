import { googleLogout } from '@react-oauth/google'
import { IMenuBtn } from '~/@types/components'

export const menuMobile: () => Promise<IMenuBtn[]> = async () => {
    const { MakeIncome, MakeCost, MakeTransfer } = await import('~/features/spending/components')
    const { ClipboardListIcon, MinusCircleIcon, PlusCircleIcon, SwitchHorizontalIcon } = await import(
        '@heroicons/react/outline'
    )
    return [
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
            to: 'transaction/tab-all',
        },
    ]
}

export const menuLoanMobile: () => Promise<IMenuBtn[]> = async () => {
    const { MakeGetLoan, CreateMember } = await import('~/features/loan/components')
    const { TrendingUpIcon, UserAddIcon } = await import('@heroicons/react/outline')
    return [
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
}

export const menuSpendingPC: () => Promise<IMenuBtn[]> = async () => {
    const { MakeIncome, MakeCost, MakeTransfer, AddCategory, AddMethod } = await import(
        '~/features/spending/components'
    )
    const {
        ClipboardListIcon,
        HomeIcon,
        LogoutIcon,
        MinusCircleIcon,
        PlusCircleIcon,
        QrcodeIcon,
        SwitchHorizontalIcon,
        TemplateIcon,
    } = await import('@heroicons/react/outline')
    return [
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
            to: 'transaction/tab-all',
        },
        {
            title: 'Phương thức thanh toán',
            color: 'text-purple-700 bg-purple-200 hover:bg-purple-300',
            icon: QrcodeIcon,
            to: 'method',
        },
        {
            title: 'Thể loại',
            color: 'text-purple-700 bg-purple-200 hover:bg-purple-300',
            icon: TemplateIcon,
            to: 'category',
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
}

export const menuLoanPC: () => Promise<IMenuBtn[]> = async () => {
    const { MakeGetLoan, CreateMember } = await import('~/features/loan/components')
    const { HomeIcon, TrendingUpIcon, UserAddIcon, LogoutIcon } = await import('@heroicons/react/outline')
    return [
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
        // {
        //     title: 'Giao dịch',
        //     color: 'text-orange-700 bg-orange-200 hover:bg-orange-300',
        //     icon: ClipboardListIcon,
        //     to: 'transaction/tab-all',
        // },
        // {
        //     title: 'Phương thức thanh toán',
        //     color: 'text-purple-700 bg-purple-200 hover:bg-purple-300',
        //     icon: QrcodeIcon,
        //     to: 'method',
        // },
    ]
}

export const menuSpendingPages: () => Promise<IMenuBtn[]> = async () => {
    const { AddCategory, AddMethod } = await import('~/features/spending/components')
    const { HomeIcon, ClipboardListIcon, QrcodeIcon, TemplateIcon } = await import('@heroicons/react/outline')
    return [
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
            to: 'transaction/tab-all',
        },
        {
            title: 'PTTT',
            color: 'text-purple-700',
            icon: QrcodeIcon,
            to: 'method',
        },
        {
            title: 'Thể loại',
            color: 'text-purple-700',
            icon: TemplateIcon,
            to: 'category',
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
            divider: true,
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
}
export const menuLoanPages: () => Promise<IMenuBtn[]> = async () => {
    const { HomeIcon } = await import('@heroicons/react/outline')
    return [
        {
            title: 'Trang chủ',
            color: 'text-red-700',
            icon: HomeIcon,
            to: '/loan',
        },
        // {
        //     title: 'Giao dịch',
        //     color: 'text-orange-700',
        //     icon: ClipboardListIcon,
        //     to: 'transaction/tab-all',
        // },
        // {
        //     title: 'PTTT',
        //     color: 'text-purple-700',
        //     icon: QrcodeIcon,
        //     to: 'method',
        // },
    ]
}

export const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Caroline Schultz' },
    { id: 8, name: 'Mason Heaney' },
    { id: 9, name: 'Claudie Smitham' },
    { id: 10, name: 'Emil Schaefer' },
]
