import {
    ArrowRightOnRectangleIcon,
    ArrowTrendingUpIcon,
    ArrowsRightLeftIcon,
    BuildingLibraryIcon,
    CalendarDaysIcon,
    ChartPieIcon,
    ClipboardDocumentListIcon,
    CubeIcon,
    EllipsisHorizontalCircleIcon,
    HomeIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    QrCodeIcon,
    RectangleGroupIcon,
    UserGroupIcon,
    UserPlusIcon,
} from '@heroicons/react/24/outline'
import { lazy, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { IMenuBtn } from '~/@types/components'
import LANGUAGE from '~/i18n/language/key'
import useLogout from './useLogout'

const CreateAccount = lazy(() => import('~/features/account/components/CreateAccount'))
const CreateMember = lazy(() => import('~/features/loan/components/CreateMember'))
const MakeCredit = lazy(() => import('~/features/loan/components/MakeCredit'))
const CreatePermissionGroup = lazy(() => import('~/features/role-control/components/CreatePermissionGroup'))
const CreateRole = lazy(() => import('~/features/role-control/components/CreateRole'))
const AddCategory = lazy(() => import('~/features/spending/components/AddCategory'))
const AddMethod = lazy(() => import('~/features/spending/components/AddMethod'))
const MakeBudget = lazy(() => import('~/features/spending/components/MakeBudget'))
const MakeLongBudget = lazy(() => import('~/features/spending/components/MakeLongBudget'))
const MakeCost = lazy(() => import('~/features/spending/components/MakeCost'))
const MakeIncome = lazy(() => import('~/features/spending/components/MakeIncome'))
const MakeTransfer = lazy(() => import('~/features/spending/components/MakeTransfer'))
const MakeSchedule = lazy(() => import('~/features/time/components/MakeSchedule'))

export const useMenuMobile = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_INCOME),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: PlusCircleIcon,
                children: <MakeIncome />,
                slide: 'add-income',
            },
            {
                title: t(LANGUAGE.MAKE_COST),
                color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
                icon: MinusCircleIcon,
                children: <MakeCost />,
                slide: 'add-payment',
            },
            {
                title: t(LANGUAGE.MAKE_TRANSFER),
                color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
                icon: ArrowsRightLeftIcon,
                children: <MakeTransfer />,
                slide: 'transfer',
            },
            {
                title: t(LANGUAGE.MAKE_BUDGET),
                color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
                icon: ChartPieIcon,
                children: <MakeBudget />,
                slide: 'budget',
            },
            {
                title: t(LANGUAGE.MAKE_LONG_BUDGET),
                color: 'text-purple-700 bg-purple-200 hover:bg-purple-300 dark:text-purple-500',
                icon: BuildingLibraryIcon,
                children: <MakeLongBudget />,
                slide: 'long-budget',
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
                children: <MakeSchedule />,
                slide: 'create-schedule',
            },
            // {
            //     title: t(LANGUAGE.MAKE_TIMEKEEPING),
            //     color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
            //     icon: ClipboardDocumentCheckIcon,
            //     children:  <MakeTimeKeeping />,
            //     slide: 'timekeeping',
            // },
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
                children: <AddMethod />,
                slide: 'add-method',
            },
            {
                title: t(LANGUAGE.CREATE_CATEGORY),
                color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
                icon: CubeIcon,
                children: <AddCategory />,
                slide: 'category',
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
                title: t(LANGUAGE.MAKE_CREDIT),
                color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
                icon: ArrowTrendingUpIcon,
                children: <MakeCredit />,
                slide: 'credit',
            },
            // {
            //     title: t(LANGUAGE_MAKE_LOAN),
            //     color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
            //     icon: TrendingDownIcon,
            //     children:  <MakeLoan />,
            //         slide: 'loan',
            // },
            {
                title: t(LANGUAGE.CREATE_MEMBER),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: UserPlusIcon,
                children: <CreateMember />,
                slide: 'create-member',
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
                children: <CreatePermissionGroup />,
                slide: 'create-permission-group',
            },
        ]
    }, [t])

    return data
}

export const useMenuAccountMobile = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.CREATE_ACCOUNT),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: UserPlusIcon,
                children: <CreateAccount />,
                slide: 'create-account',
            },
        ]
    }, [t])

    return data
}

export const useMenuSpendingPC = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const logout = useLogout()

    const data: IMenuBtn[] = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_INCOME),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: PlusCircleIcon,
                children: <MakeIncome />,
                slide: 'add-income',
            },
            {
                title: t(LANGUAGE.MAKE_COST),
                color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
                icon: MinusCircleIcon,
                children: <MakeCost />,
                slide: 'add-payment',
            },
            {
                title: t(LANGUAGE.MAKE_TRANSFER),
                color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
                icon: ArrowsRightLeftIcon,
                children: <MakeTransfer />,
                slide: 'transfer',
            },
            {
                title: t(LANGUAGE.MAKE_BUDGET),
                color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
                icon: ChartPieIcon,
                children: <MakeBudget />,
                slide: 'budget',
            },
            {
                title: t(LANGUAGE.MAKE_LONG_BUDGET),
                color: 'text-purple-700 bg-purple-200 hover:bg-purple-300 dark:text-purple-500',
                icon: BuildingLibraryIcon,
                children: <MakeLongBudget />,
                slide: 'long-budget',
            },

            {
                title: t(LANGUAGE.LOGOUT),
                color: 'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-500',
                icon: ArrowRightOnRectangleIcon,
                action: logout,
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
            // {
            //     title: t(LANGUAGE.METHOD_SPENDING),
            //     color: 'text-purple-700 bg-purple-200 hover:bg-purple-300 dark:text-purple-500',
            //     icon: QrCodeIcon,
            //     to: 'method',
            // },
            {
                title: t(LANGUAGE.LAYOUT),
                color: 'text-lime-700 bg-lime-200 hover:bg-lime-300 dark:text-lime-500',
                icon: RectangleGroupIcon,
                to: 'layout',
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
                children: <AddMethod />,
                slide: 'add-method',
                divider: true,
            },
            {
                title: t(LANGUAGE.CREATE_CATEGORY),
                color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300 dark:text-cyan-500',
                icon: CubeIcon,
                children: <AddCategory />,
                slide: 'add-category',
            },
        ]
    }, [t])
    return data
}

export const useMenuLoanPC = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const logout = useLogout()

    const data: IMenuBtn[] = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_CREDIT),
                color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300 dark:text-radical-red-500',
                icon: ArrowTrendingUpIcon,
                children: <MakeCredit />,
                slide: 'credit',
            },
            // {
            //     title: t(LANGUAGE.MAKE_LOAN),
            //     color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300 dark:text-prussian-blue-300',
            //     icon: ArrowTrendingDownIcon,
            //     children:  <MakeLoan />,
            //     slide: 'loan',
            // },
            {
                title: t(LANGUAGE.CREATE_MEMBER),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: UserPlusIcon,
                children: <CreateMember />,
                slide: 'create-member',
            },
            {
                title: t(LANGUAGE.LOGOUT),
                color: 'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-500',
                icon: ArrowRightOnRectangleIcon,
                action: logout,
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
        ]
    }, [t])
    return data
}

export const useMenuTimePC = (): IMenuBtn[] => {
    const { t } = useTranslation()
    const logout = useLogout()

    const data: IMenuBtn[] = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.MAKE_SCHEDULE),
                color: 'text-cyan-700 bg-cyan-200 hover:bg-cyan-300 dark:text-cyan-500',
                icon: CalendarDaysIcon,
                children: <MakeSchedule />,
                slide: 'create-schedule',
            },
            // {
            //     title: t(LANGUAGE.MAKE_TIMEKEEPING),
            //     color: 'text-yellow-700 bg-yellow-200 hover:bg-yellow-300 dark:text-yellow-500',
            //     icon: ClipboardDocumentCheckIcon,
            //     children:  <MakeTimeKeeping />,
            //         slide: 'timekeeping',
            // },
            {
                title: t(LANGUAGE.LOGOUT),
                color: 'text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-500',
                icon: ArrowRightOnRectangleIcon,
                action: logout,
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
                children: <CreatePermissionGroup />,
                slide: 'create-permission-group',
            },
            {
                title: t(LANGUAGE.CREATE_ROLE),
                color: 'text-rose-700 bg-rose-200 hover:bg-rose-300 dark:text-rose-500',
                icon: UserGroupIcon,
                children: <CreateRole />,
                slide: 'create-role',
            },
        ]
    }, [t])

    return data
}

export const useMenuAccountPC = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [
            {
                title: t(LANGUAGE.CREATE_ACCOUNT),
                color: 'text-green-700 bg-green-200 hover:bg-green-300 dark:text-green-500',
                icon: UserPlusIcon,
                children: <CreateAccount />,
                slide: 'create-account',
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
            // {
            //     title: t(LANGUAGE.METHOD_SPENDING),
            //     color: 'text-purple-700 dark:text-purple-500',
            //     icon: QrCodeIcon,
            //     to: 'method',
            // },
            {
                title: t(LANGUAGE.OTHERS),
                color: 'text-pink-700 dark:text-pink-500',
                icon: EllipsisHorizontalCircleIcon,
                to: 'others',
            },
            {
                title: t(LANGUAGE.LAYOUT),
                color: 'text-lime-700 dark:text-lime-500',
                icon: RectangleGroupIcon,
                to: 'layout',
            },
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

export const useMenuAccountPages = (): IMenuBtn[] => {
    const { t } = useTranslation()

    const data = useMemo(() => {
        return [{ title: t(LANGUAGE.HOME), color: 'text-red-700 dark:text-red-500', icon: HomeIcon, to: '/account' }]
    }, [t])

    return data
}
