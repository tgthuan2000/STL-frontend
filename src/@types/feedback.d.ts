import { IUserProfile } from './auth'

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
