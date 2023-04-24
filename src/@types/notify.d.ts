import { SanityDocument } from '@sanity/client'
import { IUserProfile } from './auth'

export interface NotifyPaginate {
    notify: Array<AssignedNotify>
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
    notify: AssignedNotify
}

export interface NotifyDetailAdminQueryData {
    notify: SanityDocument<NotifyAdminItem>
}

export interface Notify {
    _id: string
    _createdAt: string
    _updatedAt: string
    title: string
    content: string
    description: string
    viewers: IUserProfile[]
}

export interface AssignedNotify {
    _id: string
    _createdAt: string
    _updatedAt: string
    read: boolean
    sentMail: boolean
    notify: Notify
    user: IUserProfile
}

export type ClientNotifyDataType = Omit<AssignedNotify, '_updatedAt' | 'sentMail' | 'user' | 'notify'> & {
    notify: Omit<Notify, '_createdAt' | '_updatedAt' | 'viewers'> & { viewers: number }
}

export interface ClientNotifyData {
    notify: ClientNotifyDataType
}

export interface AdminNotifyData {
    notify: AdminNotifyDataType
}

export interface AdminAssigned {
    _id?: string
    read: boolean
    sentMail: boolean
    user: IUserProfile
}
type AdminNotifyDataType = Omit<Notify, '_updatedAt' | ''> & { assigned: Array<AdminAssigned> }
