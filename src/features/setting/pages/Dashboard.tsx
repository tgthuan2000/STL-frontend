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
            <div className='mx-2 mt-10 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-2 md:grid-cols-12 md:grid-rows-2'>
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
                                    'flex items-center justify-start gap-2 rounded p-4 text-sm font-normal hover:opacity-70 md:min-h-[150px] md:flex-col md:justify-center md:p-2 md:text-lg',
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
