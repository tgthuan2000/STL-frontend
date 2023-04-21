// import DashboardImg from '~/assets/dashboard-image.png'
import { useFlashScreen } from '~/context'
import Logo from './Logo'
import SayHiImage from './SayHiImage'
const FlashScreen = () => {
    const { content, show } = useFlashScreen()

    if (!show) {
        return <></>
    }

    return (
        <div className='relative z-50 h-screen w-full bg-white dark:bg-slate-900'>
            <div className='absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80'>
                <Logo className='text-8xl' />
                <SayHiImage />
                <div className='w-full text-center'>{content}</div>
            </div>
        </div>
    )
}

export default FlashScreen
