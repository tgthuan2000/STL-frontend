import { SettingOptions } from '~/@types/setting'
import { ChangePassword, Feedback, Logout, Mode } from '../components'

export const settingOptions: SettingOptions[] = [
    {
        id: 1,
        className:
            'col-start-1 col-span-3 row-start-2 row-span-1 text-gray-900 bg-gray-300 dark:bg-slate-800 dark:text-indigo-500',
        component: ChangePassword,
    },
    {
        id: 2,
        className:
            'col-start-3 col-span-3 row-start-1 row-span-1 text-gray-900 bg-gray-300 dark:bg-slate-800 dark:text-yellow-500',
        component: Mode,
    },
    {
        id: 3,
        className:
            'col-start-1 col-span-2 row-start-1 row-span-1 text-gray-900 bg-gray-300 dark:bg-slate-800 dark:text-cyan-500',
        component: Feedback,
    },
    {
        id: 4,
        className:
            'col-start-4 col-span-2 row-start-2 row-span-1 text-gray-900 bg-gray-300 dark:bg-slate-800 dark:text-slate-500',
        component: Logout,
    },
]
