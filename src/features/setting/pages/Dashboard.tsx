import clsx from 'clsx'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useConfig } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import NoPermission from '../components/NoPermission'
import { settingOptions } from '../services'

const Dashboard = () => {
    const { t } = useTranslation()
    const { hasPermissions } = useConfig()
    return (
        <Transaction hasBack={false} title={t(LANGUAGE.SETTING_MANAGEMENT)}>
            {/* <small className='fixed z-50 bottom-2 right-2 italic text-gray-500 dark:text-slate-500 select-none'>
                {import.meta.env.VITE_VERSION_APP} • <b>{import.meta.env.VITE_VERSION_RELEASE_DATE}</b>
            </small> */}
            <div className='mx-2 mt-10 grid h-[300px] grid-cols-10 grid-rows-2 gap-2'>
                <Suspense fallback={<LoadingText />}>
                    {settingOptions.map((option) => {
                        let Component = option.component
                        const hasPermission = hasPermissions(option.permissions)
                        if (!hasPermission) {
                            Component = NoPermission
                        }
                        return (
                            <Component
                                key={option.id}
                                className={clsx(
                                    option.className,
                                    'flex flex-col items-center justify-center gap-2 rounded p-2 text-lg font-normal',
                                    hasPermission
                                        ? 'cursor-pointer bg-gray-300 text-gray-900 dark:bg-slate-700'
                                        : 'cursor-not-allowed bg-gray-400 text-gray-600 dark:bg-slate-800'
                                )}
                            />
                        )
                    })}
                </Suspense>
            </div>
        </Transaction>
    )
}

export default Dashboard
