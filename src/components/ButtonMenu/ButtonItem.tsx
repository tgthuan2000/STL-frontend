import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuButtonProps } from '~/@types/components'
import { SlideOver } from '~/components'
import { useSlideOver } from '~/context'
import { useAuth, useProfile } from '~/store/auth'
import DesktopButton from './desktop/Button'
import MobileButton from './mobile/Button'

const ButtonItem: React.FC<MenuButtonProps & { mobile?: boolean }> = ({ data, mobile = false }) => {
    const { title, children, to, query, action } = data
    const { setIsOpen, setTitle } = useSlideOver()
    const navigate = useNavigate()
    const { removeUserProfile } = useProfile()
    const { removeToken } = useAuth()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (query || action) {
            action?.(logout)
            e.preventDefault()
            navigate(to)
            setIsOpen(true)
            setTitle(title)
        }
    }

    const logout = () => {
        removeToken()
        removeUserProfile()
    }

    return (
        <>
            {mobile ? (
                <MobileButton data={data} onClick={handleClick} />
            ) : (
                <DesktopButton data={data} onClick={handleClick} />
            )}
            <SlideOver>{children}</SlideOver>
        </>
    )
}

export default ButtonItem
