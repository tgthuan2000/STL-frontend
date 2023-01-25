import clsx from 'clsx'
import { Transaction } from '~/components'
import { settingOptions } from '../services'

const Dashboard = () => {
    return (
        <Transaction hasBack={false} title='Cài đặt'>
            <small className='fixed z-50 bottom-2 right-2 italic text-gray-500 dark:text-slate-500 select-none'>
                {import.meta.env.VITE_VERSION_APP} • <b>{import.meta.env.VITE_VERSION_RELEASE_DATE}</b>
            </small>
            <div className='grid gap-2 grid-cols-5 grid-rows-2 h-[300px] mx-2 mt-10'>
                {settingOptions.map((option) => (
                    <option.component
                        key={option.id}
                        className={clsx(
                            option.className,
                            'cursor-pointer font-normal rounded flex flex-col gap-2 items-center justify-center text-lg p-2'
                        )}
                    />
                ))}
            </div>
        </Transaction>
    )
}

export default Dashboard
