import {
    ArrowsUpDownIcon,
    BanknotesIcon,
    BellIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon,
    LockClosedIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavigationMobile } from '~/@types/layout'
import { Navigation } from '~/constant/layout'
import { PERMISSION } from '~/constant/permission'
import LANGUAGE from '~/i18n/language/key'

const AccountNavLink = React.lazy(() => import('~/components/NavLink/AccountNavLink'))
const AnnounceConfigNavLink = React.lazy(() => import('~/components/NavLink/AnnounceConfigNavLink'))
const LoanNavLink = React.lazy(() => import('~/components/NavLink/LoanNavLink'))
const TimeNavLink = React.lazy(() => import('~/components/NavLink/TimeNavLink'))
const NotifyNavLink = React.lazy(() => import('~/components/NavLink/NotifyNavLink'))
const ProfileNavLink = React.lazy(() => import('~/components/NavLink/ProfileNavLink'))
const SettingNavLink = React.lazy(() => import('~/components/NavLink/SettingNavLink'))
const SpendingNavLink = React.lazy(() => import('~/components/NavLink/SpendingNavLink'))
const FeedbackConfigNavLink = React.lazy(() => import('~/components/NavLink/FeedbackConfigNavLink'))
const RoleControlNavLink = React.lazy(() => import('~/components/NavLink/RoleControlNavLink'))

export const useNavigation = (): Array<Navigation> => {
    const { t } = useTranslation()
    const data = useMemo(() => {
        return [
            /* CLIENT */
            {
                name: t(LANGUAGE.SPENDING_MANAGEMENT),
                href: '/spending',
                icon: BanknotesIcon,
                permissions: [PERMISSION.SPENDING_READ],
            },
            {
                name: t(LANGUAGE.LOAN_MANAGEMENT),
                href: '/loan',
                icon: ArrowsUpDownIcon,
                permissions: [PERMISSION.LOAN_READ],
            },
            {
                name: t(LANGUAGE.TIME_MANAGEMENT),
                href: '/time',
                icon: CalendarIcon,
                permissions: [PERMISSION.TIME_READ],
            },

            /* ADMIN */
            {
                name: t(LANGUAGE.NOTIFY_MANAGEMENT),
                href: '/announce-config',
                icon: BellIcon,
                permissions: [PERMISSION.ANNOUNCE_CONFIG],
            },
            {
                name: t(LANGUAGE.ACCOUNT_MANAGEMENT),
                href: '/account',
                icon: UserGroupIcon,
                permissions: [PERMISSION.ACCOUNT_READ],
            },
            {
                name: t(LANGUAGE.FEEDBACK_MANAGEMENT),
                href: '/feedback-config',
                icon: ChatBubbleLeftRightIcon,
                permissions: [PERMISSION.FEEDBACK_CONFIG],
            },
            {
                name: t(LANGUAGE.ROLE_CONTROL),
                href: '/role-control',
                icon: LockClosedIcon,
                permissions: [PERMISSION.ROLE_CONTROL],
            },
        ]
    }, [t])
    return data
}

export const useNavigationMobile = (): Array<NavigationMobile> => {
    const { t } = useTranslation()
    const data = useMemo(() => {
        return [
            /* ADMIN */
            {
                name: t(LANGUAGE.NOTIFY_MANAGEMENT),
                href: '/announce-config',
                permissions: [PERMISSION.ANNOUNCE_CONFIG],
                component: AnnounceConfigNavLink,
            },
            {
                name: t(LANGUAGE.ACCOUNT_MANAGEMENT),
                href: '/account',
                permissions: [PERMISSION.ACCOUNT_READ],
                component: AccountNavLink,
            },
            {
                name: t(LANGUAGE.FEEDBACK_MANAGEMENT),
                href: '/feedback-config',
                permissions: [PERMISSION.FEEDBACK_CONFIG],
                component: FeedbackConfigNavLink,
            },
            {
                name: t(LANGUAGE.FEEDBACK_MANAGEMENT),
                href: '/role-control',
                permissions: [PERMISSION.ROLE_CONTROL],
                component: RoleControlNavLink,
            },

            /* CLIENT */
            {
                name: t(LANGUAGE.SPENDING_MANAGEMENT),
                href: '/spending',
                permissions: [PERMISSION.SPENDING_READ],
                component: SpendingNavLink,
            },
            {
                name: t(LANGUAGE.LOAN_MANAGEMENT),
                href: '/loan',
                permissions: [PERMISSION.LOAN_READ],
                component: LoanNavLink,
            },
            {
                name: t(LANGUAGE.TIME_MANAGEMENT),
                href: '/time',
                permissions: [PERMISSION.TIME_READ],
                component: TimeNavLink,
            },
            {
                name: t(LANGUAGE.NOTIFY_MANAGEMENT),
                href: '/notify',
                permissions: [PERMISSION.ANNOUNCE_READ],
                component: NotifyNavLink,
            },
            {
                name: t(LANGUAGE.PROFILE_MANAGEMENT),
                href: '/profile',
                permissions: [PERMISSION.PROFILE_READ],
                component: ProfileNavLink,
            },
            {
                name: t(LANGUAGE.SETTING_MANAGEMENT),
                href: '/setting',
                permissions: [PERMISSION.PROFILE_READ, PERMISSION.PROFILE_WRITE],
                component: SettingNavLink,
            },
        ]
    }, [t])
    return data
}
