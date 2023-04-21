import React from 'react'
import { SettingOptions } from '~/@types/setting'
import { PERMISSION } from '~/constant/permission'

const Feedback = React.lazy(() => import('../components/Feedback'))
const Mode = React.lazy(() => import('../components/Mode'))
const ChangePassword = React.lazy(() => import('../components/ChangePassword'))
const Language = React.lazy(() => import('../components/Language'))
const Device = React.lazy(() => import('../components/Device'))
const Logout = React.lazy(() => import('../components/Logout'))

export const settingOptions: SettingOptions[] = [
    {
        id: 'feedback',
        className: 'md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2 dark:text-cyan-500',
        component: Feedback,
        permissions: [PERMISSION.FEEDBACK],
    },
    {
        id: 'mode',
        className: 'md:col-start-3 md:col-span-4 md:row-start-1 md:row-span-1 dark:text-yellow-500',
        component: Mode,
        permissions: [PERMISSION.PROFILE_CHANGE_MODE],
    },
    {
        id: 'change-password',
        className: 'md:col-start-7 md:col-span-4 md:row-start-1 md:row-span-1 dark:text-indigo-500',
        component: ChangePassword,
        permissions: [PERMISSION.PROFILE_CHANGE_PASSWORD],
    },
    {
        id: 'language',
        className: 'md:col-start-3 md:col-span-3 md:row-start-2 md:row-span-1 dark:text-radical-red-500',
        component: Language,
        permissions: [PERMISSION.PROFILE_CHANGE_LANGUAGE],
    },
    {
        id: 'device',
        className: 'md:col-start-11 md:col-span-2 md:row-start-1 md:row-span-2 dark:text-pink-500',
        component: Device,
        permissions: [PERMISSION.PROFILE_READ],
    },
    {
        id: 'logout',
        className: 'md:col-start-6 md:col-span-5 md:row-start-2 md:row-span-1 dark:text-slate-400',
        component: Logout,
        permissions: [PERMISSION.PROFILE_READ],
    },
]
