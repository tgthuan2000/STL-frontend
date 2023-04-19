import React from 'react'
import DashboardImg from '~/assets/dashboard-image.png'
import Image from './Image'
import LoadingIcon from './Loading/LoadingIcon'
import Logo from './Logo'

interface Props {
    children: React.ReactNode
}

const FlashScreen: React.FC<Props> = (props) => {
    const { children } = props

    return (
        <div className='relative z-10 h-screen w-full'>
            <div className='absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 -translate-y-1/2 sm:h-80 sm:w-80'>
                <Logo className='text-8xl' />
                <Image
                    src={DashboardImg}
                    className='h-full w-full object-cover'
                    fallback={
                        <div className='text-center'>
                            <LoadingIcon />
                        </div>
                    }
                />
                <div className='w-full text-center'>{children}</div>
            </div>
        </div>
    )
}

export default FlashScreen
