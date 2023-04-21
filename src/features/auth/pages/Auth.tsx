import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimateWrap, Logo } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'

const Auth = () => {
    return (
        <div className='relative h-screen overflow-hidden'>
            <div className='absolute top-1/4 w-full space-y-10'>
                <Logo className='text-8xl' />
                <AnimateWrap className='flex w-full flex-col items-center justify-center gap-2'>
                    <Suspense fallback={<LoadingText />}>
                        <Outlet />
                    </Suspense>
                </AnimateWrap>
            </div>
        </div>
    )
}

export default Auth
