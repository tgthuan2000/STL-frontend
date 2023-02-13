import {
    ArrowRightOnRectangleIcon,
    ArrowsRightLeftIcon,
    ArrowTrendingUpIcon,
    ClipboardDocumentListIcon,
    RectangleGroupIcon,
    HomeIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    PuzzlePieceIcon,
    QrCodeIcon,
    UserPlusIcon,
    EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline'
import { googleLogout } from '@react-oauth/google'
import { IMenuBtn } from '~/@types/components'
import { CreateMember, MakeGetLoan } from '~/features/loan/components'
import { AddCategory, AddMethod, MakeBudget, MakeCost, MakeIncome, MakeTransfer } from '~/features/spending/components'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n

export const menuMobile: IMenuBtn[] = [
    {
        title: t(LANGUAGE.MAKE_INCOME),
        color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
        icon: PlusCircleIcon,
        children: () => <MakeIncome />,
        to: '?slide=add-income',
        query: {
            slide: 'add-income',
        },
    },
    {
        title: t(LANGUAGE.MAKE_COST),
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
        icon: MinusCircleIcon,
        children: () => <MakeCost />,
        to: '?slide=add-payment',
        query: {
            slide: 'add-payment',
        },
    },
    {
        title: t(LANGUAGE.MAKE_TRANSFER),
        color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
        icon: ArrowsRightLeftIcon,
        children: () => <MakeTransfer />,
        to: '?slide=transfer',
        query: {
            slide: 'transfer',
        },
    },
    {
        title: t(LANGUAGE.MAKE_BUDGET),
        color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
        icon: PuzzlePieceIcon,
        children: () => <MakeBudget />,
        to: '?slide=budget',
        query: {
            slide: 'budget',
        },
    },
    // {
    //     title: t(LANGUAGE.TRANSACTION),
    //     color: 'text-orange-700 bg-orange-200 hover:bg-orange-300 dark:text-orange-500',
    //     icon: ClipboardDocumentListIcon,
    //     to: 'transaction',
    // },
]
export const menuMobileOthers: IMenuBtn[] = [
    {
        title: t(LANGUAGE.CREATE_METHOD),
        color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300 dark:text-cyan-500',
        icon: QrCodeIcon,
        children: () => <AddMethod />,
        to: '?slide=add-method',
        query: {
            slide: 'add-method',
        },
    },
    {
        title: t(LANGUAGE.CREATE_CATEGORY),
        color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
        icon: RectangleGroupIcon,
        children: () => <AddCategory />,
        to: '?slide=category',
        query: {
            slide: 'category',
        },
    },
]

export const menuLoanMobile: IMenuBtn[] = [
    {
        title: t(LANGUAGE.MAKE_GET_LOAN),
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
        icon: ArrowTrendingUpIcon,
        children: () => <MakeGetLoan />,
        to: '?slide=get-loan',
        query: {
            slide: 'get-loan',
        },
    },
    // {
    //     title: t(LANGUAGE_MAKE_LOAN),
    //     color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
    //     icon: TrendingDownIcon,
    //     children: () => <MakeLoan />,
    //     to: '?slide=loan',
    //     query: {
    //         slide: 'loan',
    //     },
    // },
    {
        title: t(LANGUAGE.CREATE_MEMBER),
        color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
        icon: UserPlusIcon,
        children: () => <CreateMember />,
        to: '?slide=create-member',
        query: {
            slide: 'create-member',
        },
    },
]

export const menuSpendingPC: IMenuBtn[] = [
    {
        title: t(LANGUAGE.MAKE_INCOME),
        color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
        icon: PlusCircleIcon,
        children: () => <MakeIncome />,
        to: '?slide=add-income',
        query: {
            slide: 'add-income',
        },
    },
    {
        title: t(LANGUAGE.MAKE_COST),
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
        icon: MinusCircleIcon,
        children: () => <MakeCost />,
        to: '?slide=add-payment',
        query: {
            slide: 'add-payment',
        },
    },
    {
        title: t(LANGUAGE.MAKE_TRANSFER),
        color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
        icon: ArrowsRightLeftIcon,
        children: () => <MakeTransfer />,
        to: '?slide=transfer',
        query: {
            slide: 'transfer',
        },
    },
    {
        title: t(LANGUAGE.MAKE_BUDGET),
        color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
        icon: PuzzlePieceIcon,
        children: () => <MakeBudget />,
        to: '?slide=budget',
        query: {
            slide: 'budget',
        },
    },

    {
        title: t(LANGUAGE.LOGOUT),
        color: 'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-500',
        icon: ArrowRightOnRectangleIcon,
        to: '/',
        action: (removeUserProfile) => {
            googleLogout()
            removeUserProfile()
        },
        divider: true,
    },
    {
        title: t(LANGUAGE.HOME),
        color: 'text-red-700 bg-red-200 hover:bg-red-300 dark:text-red-500',
        icon: HomeIcon,
        to: '/spending',
    },
    {
        title: t(LANGUAGE.TRANSACTION),
        color: 'text-orange-700 bg-orange-200 hover:bg-orange-300 dark:text-orange-500',
        icon: ClipboardDocumentListIcon,
        to: 'transaction',
    },
    {
        title: t(LANGUAGE.METHOD_SPENDING),
        color: 'text-purple-700 bg-purple-200 hover:bg-purple-300 dark:text-purple-500',
        icon: QrCodeIcon,
        to: 'method',
    },
    {
        title: t(LANGUAGE.OTHERS),
        color: 'text-pink-700 bg-pink-200 hover:bg-pink-300 dark:text-pink-500',
        icon: EllipsisHorizontalCircleIcon,
        to: 'others',
    },
    {
        title: t(LANGUAGE.CREATE_METHOD),
        color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300 dark:text-cyan-500',
        icon: QrCodeIcon,
        children: () => <AddMethod />,
        to: '?slide=add-method',
        query: {
            slide: 'add-method',
        },
        divider: true,
    },
    {
        title: t(LANGUAGE.CREATE_CATEGORY),
        color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300 dark:text-cyan-500',
        icon: RectangleGroupIcon,
        children: () => <AddCategory />,
        to: '?slide=add-category',
        query: {
            slide: 'add-category',
        },
    },
]

export const menuLoanPC: IMenuBtn[] = [
    {
        title: t(LANGUAGE.MAKE_GET_LOAN),
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
        icon: ArrowTrendingUpIcon,
        children: () => <MakeGetLoan />,
        to: '?slide=get-loan',
        query: {
            slide: 'get-loan',
        },
    },
    // {
    //     title: t(LANGUAGE_MAKE_LOAN),
    //     color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
    //     icon: TrendingDownIcon,
    //     children: () => <MakeLoan />,
    //     to: '?slide=loan',
    //     query: {
    //         slide: 'loan',
    //     },
    // },
    {
        title: t(LANGUAGE.CREATE_MEMBER),
        color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
        icon: UserPlusIcon,
        children: () => <CreateMember />,
        to: '?slide=create-member',
        query: {
            slide: 'create-member',
        },
    },
    {
        title: t(LANGUAGE.LOGOUT),
        color: 'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-500',
        icon: ArrowRightOnRectangleIcon,
        to: '/',
        action: (removeUserProfile) => {
            googleLogout()
            removeUserProfile()
        },
        divider: true,
    },
    {
        title: t(LANGUAGE.HOME),
        color: 'text-red-700 bg-red-200 hover:bg-red-300 dark:text-red-500',
        icon: HomeIcon,
        to: '/loan',
    },
    {
        title: t(LANGUAGE.TRANSACTION),
        color: 'text-orange-700 bg-orange-200 hover:bg-orange-300 dark:text-orange-500',
        icon: ClipboardDocumentListIcon,
        to: 'transaction',
    },
    // {
    //     title: t(LANGUAGE.METHOD_SPENDING),
    //     color: 'text-purple-700 bg-purple-200 hover:bg-purple-300 dark:text-purple-500',
    //     icon: QrCodeIcon,
    //     to: 'method',
    // },
]

export const menuSpendingPages: IMenuBtn[] = [
    {
        title: t(LANGUAGE.HOME),
        color: 'text-red-700 dark:text-red-500',
        icon: HomeIcon,
        to: '/spending',
    },
    {
        title: t(LANGUAGE.TRANSACTION),
        color: 'text-orange-700 dark:text-orange-500',
        icon: ClipboardDocumentListIcon,
        to: 'transaction',
    },
    {
        title: t(LANGUAGE.METHOD_SPENDING),
        color: 'text-purple-700 dark:text-purple-500',
        icon: QrCodeIcon,
        to: 'method',
    },
    {
        title: t(LANGUAGE.OTHERS),
        color: 'text-pink-700 dark:text-pink-500',
        icon: EllipsisHorizontalCircleIcon,
        to: 'others',
    },
    // {
    //     title: t(LANGUAGE.MAKE_BUDGET),
    //     color: 'text-yellow-700 dark:text-yellow-500',
    //     icon: PuzzlePieceIcon,
    //     children: () => <MakeBudget />,
    //     to: '?slide=budget',
    //     query: {
    //         slide: 'budget',
    //     },
    // },
    // {
    //     title: t(LANGUAGE.CREATE_METHOD),
    //     color: 'text-cyan-700 dark:text-cyan-500',
    //     icon: QrCodeIcon,
    //     children: () => <AddMethod />,
    //     to: '?slide=add-method',
    //     query: {
    //         slide: 'add-method',
    //     },
    // },
    // {
    //     title: t(LANGUAGE.CREATE_CATEGORY),
    //     color: 'text-cyan-700 dark:text-cyan-500',
    //     icon: RectangleGroupIcon,
    //     children: () => <AddCategory />,
    //     to: '?slide=add-category',
    //     query: {
    //         slide: 'add-category',
    //     },
    // },
]
export const menuLoanPages: IMenuBtn[] = [
    {
        title: t(LANGUAGE.HOME),
        color: 'text-red-700 dark:text-red-500',
        icon: HomeIcon,
        to: '/loan',
    },
    {
        title: t(LANGUAGE.TRANSACTION),
        color: 'text-orange-700 dark:text-orange-500',
        icon: ClipboardDocumentListIcon,
        to: 'transaction',
    },
    // {
    //     title: t(LANGUAGE.METHOD_SPENDING),
    //     color: 'text-purple-700 dark:text-purple-500',
    //     icon: QrCodeIcon,
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
