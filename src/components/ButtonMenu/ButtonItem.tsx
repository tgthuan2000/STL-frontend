import React from 'react'
import { To, useNavigate, useSearchParams } from 'react-router-dom'
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
    const { title, children, query, action, to } = data
    const { setIsOpen, setTitle } = useSlideOver()
    const navigate = useNavigate()
    const logout = useLogout()
    const [searchParams] = useSearchParams()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (query || action) {
            const paramsUrl = new URLSearchParams(searchParams)
            let link = to ?? ''

            if (query) {
                for (let [key, value] of Object.entries(query)) {
                    paramsUrl.set(key, value)
                }
                link += `?${paramsUrl.toString()}`
            }

            action?.(logout)
            e.preventDefault()
            navigate(link, { replace: true })
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
