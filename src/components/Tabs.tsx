import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { NavigateFunction, NavLink, useLocation, useNavigate } from 'react-router-dom'

interface TabData {
    name: string
    href: string
}

interface TabsProps {
    data: TabData[]
}

const Tabs = ({ data }: TabsProps) => {
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
                </div>
            </div>
        </div>
    )
}

export default Tabs

interface TabItemProps {
    tab: TabData
    navigate: NavigateFunction
    tabsRef: React.RefObject<HTMLAnchorElement[]>
}
const TabItem = ({ tab, navigate, tabsRef }: TabItemProps) => {
    const ref = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        if (tabsRef.current && ref.current) {
            tabsRef.current.push(ref.current)
        }
    }, [])

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Update the URL to match the selected tab.
        e.preventDefault()
        navigate(tab.href, {
            replace: true,
        })
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
                        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap pt-4 pb-3 px-1 font-medium text-sm select-none'
                )
            }
        >
            {tab.name}
        </NavLink>
    )
}
