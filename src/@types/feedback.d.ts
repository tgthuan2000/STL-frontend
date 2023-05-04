import React from 'react'
import { List } from '.'
import { IUserProfile } from './auth'

export interface ChatInfoItemProps {
    data: List<Feedback>
    lastEl: boolean
    bottomImageLine: boolean
    onReply: (message: string, parentId: string, responded?: boolean) => any
    onEdit: (message: string, id: string) => any
    onDelete: (id: string) => any
    children: React.ReactNode
}

export interface Feedback {
    _id: string
    _createdAt: string
    message: string
    user: Omit<IUserProfile, 'isHasPassword' | 'google' | 'allowSendMail' | 'email'>
    edited: boolean
    deleted: boolean
    responded: boolean
    parent: Feedback | null
    childNum: number
}

export type IFeedback = Feedback & { children: Feedback[] | null }

export interface FeedbackQueryData {
    feedback: {
        data: IFeedback[]
    }
}

export interface InputFormProps {
    onSubmit: (message: string) => any
    defaultMessage?: string
    disabled?: boolean
    autoFocus?: boolean
}
