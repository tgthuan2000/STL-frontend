import { SanityDocument } from '@sanity/client'
import { IUserProfile } from './auth'

export interface Notify {
    title: string
    content: string
    description: string
    viewers: number
    _createdAt?: string
    _updatedAt?: string
}
export interface NotifyItem {
    read: boolean
    sentMail: boolean
    notify: SanityDocument<Notify> & {
        _ref: string
    }
    user: SanityDocument<IUserProfile> & {
        _ref: string
    }
}

export interface NotifyAdminItem {
    notify: SanityDocument<Notify> & {
        assigned: Array<{
            sentMail: boolean
            user: IUserProfile
        }>
    }
}

export interface NotifyPaginate {
    notify: Array<SanityDocument<NotifyItem>>
    total: number
    hasNextPage: boolean
}

export interface NotifyQueryData {
    notify: {
        data: Notify[]
        hasNextPage: boolean
    }
}

export interface DraftNotify {
    title?: string
    content?: string
    description?: string
    users?: Array<IUserProfile & { sendMail: boolean }>
    sendAll?: boolean
}

export interface NotifyContentForm {
    content: string
}

export interface NotifyTitleDescForm {
    title: string
    description: string
}
export interface NotifyAssignForm {
    users: Array<IUserProfile & { sendMail: boolean }>
    sendAll: boolean
}

export interface NotifyDetailQueryData {
    notify: SanityDocument<NotifyItem>
}

export interface NotifyDetailAdminQueryData {
    notify: SanityDocument<NotifyAdminItem>
}
