import React from 'react'
import { List } from '.'
import { IUserProfile } from './auth'

export interface MessagesProps {
    data: Feedback[] | undefined
    onSeeMoreClick: (parentId: string) => any
    onReply: (message: string, parentId: string) => any
    onEdit: (message: string, id: string) => any
    onDelete: (id: string) => any
}
export interface ChatInfoItemProps {
    data: List<Feedback>
    lastEl: boolean
    bottomImageLine: boolean
    onReply: (message: string, parentId: string) => any
    onEdit: (message: string, id: string) => any
    onDelete: (id: string) => any
}

export interface Feedback {
    _id: string
    _createdAt: string
    message: string
    user: Omit<IUserProfile, 'isHasPassword' | 'google' | 'allowSendMail' | 'email'>
    edited: boolean
    deleted: boolean
    parentId: string | null
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
}

export interface SeeMoreButtonProps {
    onClick: () => any
    replyNum: number
}
