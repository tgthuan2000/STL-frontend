import React from 'react'
import { ButtonMenuProviderProps, MenuButtonProps } from '~/@types/components'
import { SlideOverProvider } from '~/context'

export type MobileButtonProps = MenuButtonProps & { onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined }

const ButtonMenuProvider: React.FC<ButtonMenuProviderProps> = ({ data, children }) => {
    return (
        <>
            {data.map((item) => (
                <SlideOverProvider key={item.title} query={item.query} title={item.title}>
                    {children(item)}
                </SlideOverProvider>
            ))}
        </>
    )
}

export default ButtonMenuProvider
