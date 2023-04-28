import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuButtonProps } from '~/@types/components'
import { SlideOver } from '~/components'
import { useSlideOver } from '~/context'
import { useLogout } from '~/hook'
import DesktopButton from './desktop/Button'
import MobileButton from './mobile/Button'

const ButtonItem: React.FC<MenuButtonProps & { mobile?: boolean; mode?: 'v1' | 'v2' }> = ({
    data,
    mobile = false,
    mode = 'v1',
}) => {
    const { title, children, to, query, action } = data
    const { setIsOpen, setTitle } = useSlideOver()
    const navigate = useNavigate()
    const logout = useLogout()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (query || action) {
            action?.(logout)
            e.preventDefault()
            navigate(to)
            setIsOpen(true)
            setTitle(title)
        }
    }

    const props = {
        data,
        onClick: handleClick,
    }

    return (
        <>
            {mobile ? (
                <>
                    {mode === 'v1' && <MobileButton.v1 {...props} />}
                    {mode === 'v2' && <MobileButton.v2 {...props} />}
                </>
            ) : (
                <>
                    {mode === 'v1' && <DesktopButton.v1 {...props} />}
                    {mode === 'v2' && <DesktopButton.v2 {...props} />}
                </>
            )}
            <SlideOver>{children}</SlideOver>
        </>
    )
}

export default ButtonItem
