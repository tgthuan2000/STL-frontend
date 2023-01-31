import { EmailJSResponseStatus } from '@emailjs/browser'
import React from 'react'
import { TAGS } from '~/constant'

export type Data<T> = {
    [Property in keyof T]: {
        loading: boolean
        data: undefined | T[Property]
        query: string
        params?: ParamsTypeUseQuery
        tags: TAGS
    }
}

export type useQueryType<T> = [
    Data<T>,
    () => Promise<void>,
    (...keys: Array<keyof T>) => string | null,
    (...keys: Array<keyof T>) => void,
    Boolean,
    React.Dispatch<React.SetStateAction<Data<T>>>
]

export type IUseMail = (
    templateId: string,
    serviceId?: string
) => [(params: MailParams) => Promise<EmailJSResponseStatus>]

export interface MailParams extends Record<string, unknown> {
    from_name?: string
    from_email?: string
    to_name?: string
    to_email?: string
    message?: string
}
