import clsx from 'clsx'
import React from 'react'
import { SideBarProps } from '~/@types/layout'
import { ScrollToTopProvider, SideBarProvider, useSideBar } from '~/context'
import { useWindowSize } from '~/hook'
import { DesktopSideBar, DesktopTopBar } from './Desktop'
import { MobileTopBar } from './Mobile'

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
    const { desktop } = useSideBar()
    const { width } = useWindowSize()
    const mobileScreen = width < 768

    return (
        <div>
            {mobileScreen ? (
                <>
                    {/* Mobile */}
                    <MobileTopBar />
                </>
            ) : (
                <>
                    {/* Desktop */}
                    <DesktopTopBar />
                    <DesktopSideBar />
                </>
            )}

            <ScrollToTopProvider>
                <div
                    className={clsx(
                        'transition-all md:min-h-[calc(100vh-64px)]',
                        desktop.open ? 'md:pl-64' : 'md:pl-16'
                    )}
                >
                    {/* --- Top bar --- */}

                    <main className='py-6'>
                        <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                            {/* Replace with your content */}
                            <div className='sm:min-h-[calc(100vh-120px)]'>{children}</div>
                            {/* /End replace */}
                        </div>
                    </main>
                </div>
            </ScrollToTopProvider>
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
