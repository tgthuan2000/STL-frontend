import { SettingOptions } from '~/@types/setting'
import { ChangePassword, Feedback, Logout, Mode, Language } from '../components'

export const settingOptions: SettingOptions[] = [
    {
        id: 'feedback',
        className:
            'col-start-1 col-span-3 row-start-1 row-span-2 text-gray-900 bg-gray-300 dark:bg-slate-800 dark:text-cyan-500',
        component: Feedback,
    },
    {
        id: 'mode',
        className:
            'col-start-4 col-span-4 row-start-1 row-span-1 text-gray-900 bg-gray-300 dark:bg-slate-800 dark:text-yellow-500',
        component: Mode,
    },
    {
        id: 'change-password',
        className:
            'col-start-8 col-span-4 row-start-1 row-span-1 text-gray-900 bg-gray-300 dark:bg-slate-800 dark:text-indigo-500',
        component: ChangePassword,
    },
    {
        id: 'language',
        className:
            'col-start-4 col-span-3 row-start-2 row-span-1 text-gray-900 bg-gray-300 dark:bg-slate-800 dark:text-radical-red-500',
        component: Language,
    },
    {
        id: 'logout',
        className:
            'col-start-7 col-span-5 row-start-2 row-span-1 text-gray-900 bg-gray-300 dark:bg-slate-800 dark:text-slate-500',
        component: Logout,
    },
]
