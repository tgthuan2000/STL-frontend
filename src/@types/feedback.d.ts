import React from 'react'
import { List } from '.'
import { IUserProfile } from './auth'

export interface MessagesProps {
    data?: IData2[]
}
export interface ChatInfoItemProps {
    data: List<IData>
    bottomLine: boolean
}

export interface IData {
    _id: string
    _createdAt: Date
    message: string
    user: Omit<IUserProfile, 'isHasPassword' | 'google' | 'allowSendMail' | 'email'>
    parentId: string | null
    childNum: number
}

export type IData2 = IData & { children: IData[] | null }
