import { SanityDocument } from '@sanity/client'
import React from 'react'
import { NavigateFunction } from 'react-router-dom'
import { Navigation } from '~/constant/layout'
import { UseLocalStorageResult } from '~/hook/useLocalStorage'
import { IUserProfile } from './auth'

export interface SideBarProps {
    children: React.ReactNode
    title?: string
}

export interface UserProps {
    onLogout: () => void
    onCloseSideBar?: () => void
    userProfile: SanityDocument<IUserProfile> | undefined | null
    open?: boolean
}

export interface OptionData {
    logout: () => void
    data: OptionMenu
    navigate: NavigateFunction
    closeSidebar?: () => void
    theme: UseLocalStorageResult<string>
}

export type OptionFuncData =
    | string
    | ((data: {
          userProfile: SanityDocument<IUserProfile> | null | undefined
          theme: UseLocalStorageResult<string>
      }) => React.ReactNode)

export interface OptionMenu {
    id: number
    label: OptionFuncData
    onClick: (data: OptionData) => void
    icon: React.FC<{ className?: string; theme: UseLocalStorageResult<string> }>
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
