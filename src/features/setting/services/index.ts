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
        className: 'dark:text-cyan-500',
        component: Feedback,
        permissions: [PERMISSION.FEEDBACK],
    },
    {
        id: 'mode',
        className: 'dark:text-yellow-500',
        component: Mode,
        permissions: [PERMISSION.PROFILE_CHANGE_MODE],
    },
    {
        id: 'change-password',
        className: 'dark:text-indigo-500',
        component: ChangePassword,
        permissions: [PERMISSION.PROFILE_CHANGE_PASSWORD],
    },
    {
        id: 'language',
        className: 'dark:text-radical-red-500',
        component: Language,
        permissions: [PERMISSION.PROFILE_CHANGE_LANGUAGE],
    },
    {
        id: 'device',
        className: 'dark:text-pink-500',
        component: Device,
        permissions: [PERMISSION.PROFILE_READ],
    },
    {
        id: 'logout',
        className: 'dark:text-slate-400',
        component: Logout,
        permissions: [PERMISSION.PROFILE_READ],
    },
]
