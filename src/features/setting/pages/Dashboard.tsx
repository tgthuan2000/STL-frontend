import clsx from 'clsx'
import { Suspense, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useConfig } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { settingOptions } from '../services'

const Dashboard = () => {
    const { t } = useTranslation()
    const { hasPermissions } = useConfig()

    const options = useMemo(() => {
        return settingOptions.filter((option) => hasPermissions(option.permissions))
    }, [hasPermissions])

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.SETTING_MANAGEMENT)}>
            <div className='mx-2 mt-10 grid grid-cols-[repeat(auto-fill,minmax(196px,1fr))] gap-2'>
                <Suspense fallback={<LoadingText />}>
                    {options.map((option) => {
                        const Component = option.component

                        return (
                            <Component
                                key={option.id}
                                className={clsx(
                                    option.className,
                                    'flex cursor-pointer items-center justify-start gap-2 rounded-lg bg-gray-200 px-4 py-3 text-sm font-normal text-gray-900 hover:opacity-70 dark:bg-slate-800'
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
