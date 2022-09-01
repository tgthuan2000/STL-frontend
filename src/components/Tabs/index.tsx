import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TabsProps } from '~/@types/components'
import { SuspenseAnimate } from '~/components'

const TabItem = React.lazy(() => import('./TabItem'))

const Tabs: React.FC<TabsProps> = ({ data }) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const lineRef = useRef<HTMLDivElement>(null)
    const tabsRef = useRef<HTMLAnchorElement[]>([])

    useEffect(() => {
        if (lineRef.current && tabsRef.current) {
            const path = pathname.split('/')[3]
            if (path) {
                const index = data.findIndex(({ href }) => href === path)
                lineRef.current.style.left = `${tabsRef.current[index].offsetLeft}px`
                lineRef.current.style.width = `${tabsRef.current[index].offsetWidth}px`
            }
        }
    }, [pathname])

    return (
        <div className='block'>
            <div className='border-b border-gray-200'>
                <SuspenseAnimate className='relative overflow-x-auto overflow-y-hidden'>
                    <nav className='-mb-px flex sm:space-x-8 space-x-2 pb-3' aria-label='Tabs'>
                        {data.map((tab) => (
                            <TabItem key={tab.name} tab={tab} navigate={navigate} tabsRef={tabsRef} />
                        ))}
                        {/* line */}
                    </nav>
                    <div
                        ref={lineRef}
                        className='absolute h-0.5 rounded-full bg-indigo-500 transition-all bottom-3 left-0 w-0'
                    />
                </SuspenseAnimate>
            </div>
        </div>
    )
}

export default Tabs
