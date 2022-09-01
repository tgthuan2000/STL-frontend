import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { TabItemProps } from '~/@types/components'

const TabItem: React.FC<TabItemProps> = ({ tab, navigate, tabsRef }) => {
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

export default TabItem
