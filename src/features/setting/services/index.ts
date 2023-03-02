import React from 'react'
import { SettingOptions } from '~/@types/setting'
import { PERMISSION } from '~/constant/permission'

const Feedback = React.lazy(() => import('../components/Feedback'))
const Mode = React.lazy(() => import('../components/Mode'))
const ChangePassword = React.lazy(() => import('../components/ChangePassword'))
const Language = React.lazy(() => import('../components/Language'))
const Logout = React.lazy(() => import('../components/Logout'))

export const settingOptions: SettingOptions[] = [
    {
        id: 'feedback',
        className: 'col-start-1 col-span-3 row-start-1 row-span-2 dark:text-cyan-500',
        component: Feedback,
        permissions: [PERMISSION.FEEDBACK],
    },
    {
        id: 'mode',
        className: 'col-start-4 col-span-4 row-start-1 row-span-1 dark:text-yellow-500',
        component: Mode,
        permissions: [PERMISSION.PROFILE_CHANGE_MODE],
    },
    {
        id: 'change-password',
        className: 'col-start-8 col-span-4 row-start-1 row-span-1 dark:text-indigo-500',
        component: ChangePassword,
        permissions: [PERMISSION.PROFILE_CHANGE_PASSWORD],
    },
    {
        id: 'language',
        className: 'col-start-4 col-span-3 row-start-2 row-span-1 dark:text-radical-red-500',
        component: Language,
        permissions: [PERMISSION.PROFILE_CHANGE_LANGUAGE],
    },
    {
        id: 'logout',
        className: 'col-start-7 col-span-5 row-start-2 row-span-1 dark:text-slate-400',
        component: Logout,
        permissions: [PERMISSION.PROFILE_READ],
    },
]
