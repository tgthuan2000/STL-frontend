import { SanityDocument } from '@sanity/client'
import { IUserProfile } from './auth'

export interface Notify {
    title: string
    content: string
    description: string
    viewers: number
}
export interface NotifyItem {
    read: boolean
    notify: SanityDocument<Notify> & {
        _ref: string
    }
    user: SanityDocument<IUserProfile> & {
        _ref: string
    }
}

export interface NotifyPaginate {
    notify: Array<SanityDocument<NotifyItem>>
    total: number
    hasNextPage: boolean
}
