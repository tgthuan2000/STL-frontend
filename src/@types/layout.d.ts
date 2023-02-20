import { SanityDocument } from '@sanity/client'
import { DefaultTFuncReturn } from 'i18next'
import React from 'react'
import { Navigation } from '~/constant/layout'
import { PERMISSION } from '~/constant/permission'
import { UseLocalStorageResult } from '~/hook/useLocalStorage'
import { IUserProfile } from './auth'

export interface SideBarProps {
    children: React.ReactNode
    title?: string
}

export type OptionFuncData =
    | string
    | ((data: {
          userProfile: SanityDocument<IUserProfile> | null | undefined
          theme: UseLocalStorageResult<string>
      }) => React.ReactNode)
    | DefaultTFuncReturn

export interface OptionMenuItemProps {
    btnClassName?: string
    iconClassName?: string
}
export interface OptionMenu {
    id: string
    component: React.FC<OptionMenuItemProps>
    permissions: Array<PERMISSION>
}
export type NavigationMobile = Omit<Navigation, 'icon'> & { component: React.FC<MobileNavLink> }
export interface NavLinkItemProps {
    data: Navigation
    onClick?: () => void
    open?: boolean
}

export interface NavLinkIconProps {
    data: NavigationMobile
    onClick?: () => void
    open?: boolean
}

export interface MobileNavLink {}
