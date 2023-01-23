import clsx from 'clsx'
import React from 'react'
import { SideBarProps } from '~/@types/layout'
import { SideBarProvider, useSideBar } from '~/context'
import DesktopSideBar from './DesktopSideBar'
import MobileSideBar from './MobileSideBar'
import TopBar from './TopBar'

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
    const { desktop } = useSideBar()

    return (
        <div>
            {/* Top bar */}
            <TopBar />
            <div className='h-16 w-full' />
            {/* Sidebar for mobile */}
            <MobileSideBar />
            {/* Sidebar for desktop */}
            <DesktopSideBar />

            <div className={clsx('flex flex-col flex-1 transition-all', desktop.open ? 'md:pl-64' : 'md:pl-16')}>
                {/* --- Top bar --- */}

                <main className='flex-1'>
                    <div className='py-6'>
                        <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8'>
                            {/* Replace with your content */}
                            <div className='min-h-screen sm:min-h-[calc(100vh-50px)]'>{children}</div>
                            {/* /End replace */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

const sideBarHOC =
    (Component: React.FC<SideBarProps>): React.FC<SideBarProps> =>
    (props) => {
        return (
            <SideBarProvider>
                <Component {...props} />
            </SideBarProvider>
        )
    }

export default sideBarHOC(Sidebar)
