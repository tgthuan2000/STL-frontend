import {
    ArrowRightOnRectangleIcon,
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    ArrowsRightLeftIcon,
    CalendarDaysIcon,
    ClipboardDocumentCheckIcon,
    ClipboardDocumentListIcon,
    EllipsisHorizontalCircleIcon,
    HomeIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    PuzzlePieceIcon,
    QrCodeIcon,
    RectangleGroupIcon,
    UserPlusIcon,
} from '@heroicons/react/24/outline'
import { googleLogout } from '@react-oauth/google'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IMenuBtn } from '~/@types/components'
import axios from '~/axiosConfig'
import { CreateMember, MakeGetLoan, MakeLoan } from '~/features/loan/components'
import { CreatePermissionGroup } from '~/features/role-control/components'
import { AddCategory, AddMethod, MakeBudget, MakeCost, MakeIncome, MakeTransfer } from '~/features/spending/components'
import { MakeSchedule, MakeTimeKeeping } from '~/features/time/components'
import LANGUAGE from '~/i18n/language/key'

export const useMenuMobile = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_INCOME),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: PlusCircleIcon,
                children: () => <MakeIncome />,
                query: {
                    slide: 'add-income',
                },
            },
            {
                title: t(LANGUAGE.MAKE_COST),
                color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
                icon: MinusCircleIcon,
                children: () => <MakeCost />,
                query: {
                    slide: 'add-payment',
                },
            },
            {
                title: t(LANGUAGE.MAKE_TRANSFER),
                color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
                icon: ArrowsRightLeftIcon,
                children: () => <MakeTransfer />,
                query: {
                    slide: 'transfer',
                },
            },
            {
                title: t(LANGUAGE.MAKE_BUDGET),
                color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
                icon: PuzzlePieceIcon,
                children: () => <MakeBudget />,
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
    }, [t])

    return data
}

export const useMenuTimeMobile = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_SCHEDULE),
                color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300 dark:text-cyan-500',
                icon: CalendarDaysIcon,
                children: () => <MakeSchedule />,
                query: {
                    slide: 'create-schedule',
                },
            },
            {
                title: t(LANGUAGE.MAKE_TIMEKEEPING),
                color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
                icon: ClipboardDocumentCheckIcon,
                children: () => <MakeTimeKeeping />,
                query: {
                    slide: 'timekeeping',
                },
            },
        ]
    }, [t])

    return data
}

export const useMenuMobileOthers = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.CREATE_METHOD),
                color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300 dark:text-cyan-500',
                icon: QrCodeIcon,
                children: () => <AddMethod />,
                query: {
                    slide: 'add-method',
                },
            },
            {
                title: t(LANGUAGE.CREATE_CATEGORY),
                color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
                icon: RectangleGroupIcon,
                children: () => <AddCategory />,
                query: {
                    slide: 'category',
                },
            },
        ]
    }, [t])
    return data
}

export const useMenuLoanMobile = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_GET_LOAN),
                color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
                icon: ArrowTrendingUpIcon,
                children: () => <MakeGetLoan />,
                query: {
                    slide: 'get-loan',
                },
            },
            // {
            //     title: t(LANGUAGE_MAKE_LOAN),
            //     color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
            //     icon: TrendingDownIcon,
            //     children: () => <MakeLoan />,
            //     query: {
            //         slide: 'loan',
            //     },
            // },
            {
                title: t(LANGUAGE.CREATE_MEMBER),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: UserPlusIcon,
                children: () => <CreateMember />,
                query: {
                    slide: 'create-member',
                },
            },
        ]
    }, [t])
    return data
}

export const useMenuRoleControlMobile = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.CREATE_PERMISSION_GROUP),
                color: 'text-indigo-700 bg-indigo-200 hover:bg-indigo-300 dark:text-indigo-500',
                icon: RectangleGroupIcon,
                children: () => <CreatePermissionGroup />,
                query: {
                    slide: 'create-permission-group',
                },
            },
        ]
    }, [t])

    return data
}

export const useMenuSpendingPC = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const data: IMenuBtn[] = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_INCOME),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: PlusCircleIcon,
                children: () => <MakeIncome />,
                query: {
                    slide: 'add-income',
                },
            },
            {
                title: t(LANGUAGE.MAKE_COST),
                color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
                icon: MinusCircleIcon,
                children: () => <MakeCost />,
                query: {
                    slide: 'add-payment',
                },
            },
            {
                title: t(LANGUAGE.MAKE_TRANSFER),
                color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
                icon: ArrowsRightLeftIcon,
                children: () => <MakeTransfer />,
                query: {
                    slide: 'transfer',
                },
            },
            {
                title: t(LANGUAGE.MAKE_BUDGET),
                color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
                icon: PuzzlePieceIcon,
                children: () => <MakeBudget />,
                query: {
                    slide: 'budget',
                },
            },

            {
                title: t(LANGUAGE.LOGOUT),
                color: 'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-500',
                icon: ArrowRightOnRectangleIcon,
                to: '/',
                action: (logout) => {
                    googleLogout()
                    logout()
                    axios.defaults.headers.common['Authorization'] = null
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
                query: {
                    slide: 'add-category',
                },
            },
        ]
    }, [t])
    return data
}

export const useMenuLoanPC = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const data: IMenuBtn[] = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_GET_LOAN),
                color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
                icon: ArrowTrendingUpIcon,
                children: () => <MakeGetLoan />,
                query: {
                    slide: 'get-loan',
                },
            },
            {
                title: t(LANGUAGE.MAKE_LOAN),
                color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
                icon: ArrowTrendingDownIcon,
                children: () => <MakeLoan />,
                query: {
                    slide: 'loan',
                },
            },
            {
                title: t(LANGUAGE.CREATE_MEMBER),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: UserPlusIcon,
                children: () => <CreateMember />,
                query: {
                    slide: 'create-member',
                },
            },
            {
                title: t(LANGUAGE.LOGOUT),
                color: 'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-500',
                icon: ArrowRightOnRectangleIcon,
                to: '/',
                action: (logout) => {
                    googleLogout()
                    logout()
                    axios.defaults.headers.common['Authorization'] = null
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
    }, [t])
    return data
}

export const useMenuTimePC = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const data: IMenuBtn[] = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_SCHEDULE),
                color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300 dark:text-cyan-500',
                icon: CalendarDaysIcon,
                children: () => <MakeSchedule />,
                query: {
                    slide: 'create-schedule',
                },
            },
            {
                title: t(LANGUAGE.MAKE_TIMEKEEPING),
                color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
                icon: ClipboardDocumentCheckIcon,
                children: () => <MakeTimeKeeping />,
                query: {
                    slide: 'timekeeping',
                },
            },
            {
                title: t(LANGUAGE.LOGOUT),
                color: 'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-500',
                icon: ArrowRightOnRectangleIcon,
                to: '/',
                action: (logout) => {
                    googleLogout()
                    logout()
                    axios.defaults.headers.common['Authorization'] = null
                },
                divider: true,
            },
            {
                title: t(LANGUAGE.HOME),
                color: 'text-red-700 bg-red-200 hover:bg-red-300 dark:text-red-500',
                icon: HomeIcon,
                to: '/time',
            },
        ]
    }, [t])
    return data
}

export const useMenuRoleControlPC = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.CREATE_PERMISSION_GROUP),
                color: 'text-indigo-700 bg-indigo-200 hover:bg-indigo-300 dark:text-indigo-500',
                icon: RectangleGroupIcon,
                children: () => <CreatePermissionGroup />,
                query: {
                    slide: 'create-permission-group',
                },
            },
        ]
    }, [t])

    return data
}

export const useMenuSpendingPages = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
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
            //     query: {
            //         slide: 'budget',
            //     },
            // },
            // {
            //     title: t(LANGUAGE.CREATE_METHOD),
            //     color: 'text-cyan-700 dark:text-cyan-500',
            //     icon: QrCodeIcon,
            //     children: () => <AddMethod />,
            //     query: {
            //         slide: 'add-method',
            //     },
            // },
            // {
            //     title: t(LANGUAGE.CREATE_CATEGORY),
            //     color: 'text-cyan-700 dark:text-cyan-500',
            //     icon: RectangleGroupIcon,
            //     children: () => <AddCategory />,
            //     query: {
            //         slide: 'add-category',
            //     },
            // },
        ]
    }, [t])

    return data
}
export const useMenuLoanPages = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const data = useMemo(() => {
        return [
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
    }, [t])
    return data
}

export const useMenuTimePages = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.HOME),
                color: 'text-red-700 dark:text-red-500',
                icon: HomeIcon,
                to: '/time',
            },
        ]
    }, [t])

    return data
}

export const useMenuRoleControlPages = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
            { title: t(LANGUAGE.HOME), color: 'text-red-700 dark:text-red-500', icon: HomeIcon, to: '/role-control' },
        ]
    }, [t])

    return data
}
