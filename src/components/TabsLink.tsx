import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { TabLinkItemProps, TabsLinkProps } from '~/@types/components'

const TabsLink: React.FC<TabsLinkProps> = ({ data }) => {
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
                <div className='relative overflow-x-auto overflow-y-hidden'>
                    <nav className='-mb-px flex space-x-2 pb-3 sm:space-x-8' aria-label='Tabs'>
                        {data.map((tab) => (
                            <TabsLinkItem key={tab.name} tab={tab} navigate={navigate} tabsRef={tabsRef} />
                        ))}
                        {/* line */}
                    </nav>
                    <div
                        ref={lineRef}
                        className='absolute bottom-3 left-0 h-0.5 w-0 rounded-full bg-indigo-500 transition-all'
                    />
                </div>
            </div>
        </div>
    )
}

export default TabsLink

const TabsLinkItem: React.FC<TabLinkItemProps> = ({ tab, navigate, tabsRef }) => {
    const ref = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        if (tabsRef.current && ref.current) {
            tabsRef.current.push(ref.current)
        }
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Update the URL to match the selected tab.
        e.preventDefault()
        navigate(tab.href, { replace: true })
    }

    return (
        <NavLink
            key={tab.name}
            ref={ref}
            to={tab.href}
            onClick={handleClick}
            className={({ isActive }) =>
                clsx(
                    isActive
                        ? 'text-indigo-600'
                        : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'select-none whitespace-nowrap px-1 pt-4 pb-3 text-sm font-medium'
                )
            }
        >
            {tab.name}
        </NavLink>
    )
}
