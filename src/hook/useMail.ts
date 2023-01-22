import emailjs from '@emailjs/browser'
import { isEmpty } from 'lodash'
import { useCallback, useRef } from 'react'
import { IUseMail, MailParams } from '~/@types/hook'

emailjs.init(import.meta.env.VITE_EMAIL_PUBLIC_KEY)

const useMail: IUseMail = (templateId, serviceId = import.meta.env.VITE_EMAIL_SERVICE) => {
    const serviceRef = useRef(serviceId)
    const templateRef = useRef(templateId)

    const send = useCallback(
        (params: MailParams) => {
            if (isEmpty(params)) {
                throw new Error('Params is empty')
            }

            return emailjs.send(serviceRef.current, templateRef.current, params)
        },
        [serviceRef.current, templateRef.current]
    )

    return [send]
}

export default useMail
