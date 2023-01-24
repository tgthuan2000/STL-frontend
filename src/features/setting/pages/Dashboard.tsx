import clsx from 'clsx'
import { Transaction } from '~/components'
import { settingOptions } from '../services'

const Dashboard = () => {
    return (
        <Transaction hasBack={false} title='Cài đặt'>
            <div className='grid gap-2 grid-cols-5 grid-rows-2 h-[300px] mx-2 mt-10'>
                {settingOptions.map((option) => (
                    <option.component
                        key={option.id}
                        className={clsx(
                            option.className,
                            'cursor-pointer font-normal rounded flex flex-wrap gap-2 items-center justify-center text-lg'
                        )}
                    />
                ))}
            </div>
        </Transaction>
    )
}

export default Dashboard
