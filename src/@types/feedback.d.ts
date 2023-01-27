import React from 'react'
import { List } from '.'
import { IUserProfile } from './auth'

export interface MessagesProps {
    data: Feedback[] | undefined
    onSeeMoreClick: (parentId: string) => any
    onReply: (message: string, parentId: string) => any
}
export interface ChatInfoItemProps {
    data: List<Feedback>
    lastEl: boolean
    bottomImageLine: boolean
    onReply: (message: string, parentId: string) => any
}

export interface Feedback {
    _id: string
    _createdAt: string
    message: string
    user: Omit<IUserProfile, 'isHasPassword' | 'google' | 'allowSendMail' | 'email'>
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
}

export interface SeeMoreButtonProps {
    onClick: () => any
    replyNum: number
}
