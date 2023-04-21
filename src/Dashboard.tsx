import clsx from 'clsx'
import { SayHiImage } from './components'
import { useWindowSize } from './hook'

const Dashboard = () => {
    const { width } = useWindowSize()

    return (
        <div
            className={clsx(
                'flex items-center justify-center',
                width > 768 ? 'h-[calc(100vh-120px)] ' : 'h-[calc(100vh-200px)]'
            )}
        >
            <div className='flex flex-col items-center justify-center gap-2 text-gray-900 dark:text-white'>
                {/* <p className='text-4xl font-medium'>{t(LANGUAGE.HOME)}</p> */}
                <SayHiImage />
            </div>
        </div>
    )
}

export default Dashboard
