import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import { settingOptions } from '../services'

const Dashboard = () => {
    const { t } = useTranslation()
    return (
        <Transaction hasBack={false} title={t(LANGUAGE.SETTING_MANAGEMENT)}>
            {/* <small className='fixed z-50 bottom-2 right-2 italic text-gray-500 dark:text-slate-500 select-none'>
                {import.meta.env.VITE_VERSION_APP} • <b>{import.meta.env.VITE_VERSION_RELEASE_DATE}</b>
            </small> */}
            <div className='mx-2 mt-10 grid h-[300px] grid-cols-10 grid-rows-2 gap-2'>
                {settingOptions.map((option) => (
                    <option.component
                        key={option.id}
                        className={clsx(
                            option.className,
                            'flex cursor-pointer flex-col items-center justify-center gap-2 rounded p-2 text-lg font-normal'
                        )}
                    />
                ))}
            </div>
        </Transaction>
    )
}

export default Dashboard
