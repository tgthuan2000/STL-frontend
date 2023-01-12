import { SanityDocument } from '@sanity/client'
import React from 'react'
import { NavigateFunction } from 'react-router-dom'
import { IUserProfile } from './auth'

export interface SideBarProps {
    children: React.ReactNode
    title?: string
}

export interface TopBarProps {
    onClickSidebar: (state: boolean) => void
}

export interface UserProps {
    onLogout: () => void
    onCloseSideBar: () => void
    userProfile: SanityDocument<IUserProfile> | undefined | null
}

export interface OptionData {
    logout: () => void
    data: OptionMenu
    navigate: NavigateFunction
    closeSidebar: () => void
}
export type OptionFuncData =
    | string
    | ((data: { userProfile: SanityDocument<IUserProfile> | null | undefined }) => React.ReactNode)

export interface OptionMenu {
    id: number
    label: OptionFuncData
    onClick: (data: OptionData) => void
    icon: React.FC<{ className?: string }>
}
