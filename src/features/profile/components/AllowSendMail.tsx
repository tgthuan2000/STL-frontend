import { isUndefined } from 'lodash'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Toggle } from '~/components/_base'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { useProfile } from '~/store/auth'

const AllowSendMail = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const firstRef = useRef(false)
    const form = useForm({
        defaultValues: {
            allowSendMail: userProfile?.allowSendMail,
        },
    })

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null
        if (firstRef.current) {
            const allowSendMail = form.watch('allowSendMail')
            if (isUndefined(allowSendMail)) return

            timeout = setTimeout(() => {
                try {
                    const sendMail = async () => {
                        const __ = client.transaction()

                        __.patch(userProfile?._id as string, {
                            set: {
                                allowSendMail,
                            },
                        })
                        await __.commit()
                        toast.success(t(LANGUAGE.NOTIFY_UPDATE_SUCCESS))
                    }
                    sendMail()
                } catch (error) {
                    console.log(error)
                    toast.error(t(LANGUAGE.NOTIFY_UPDATE_FAILED))
                }
            }, 1000)
        }
        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [JSON.stringify(form.watch('allowSendMail'))])

    useEffect(() => {
        firstRef.current = true
    }, [])

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Toggle form={form} name='allowSendMail' label={t(LANGUAGE.ALLOW_RECEIVE_NOTIFY_BY_MAIL)} />
        </form>
    )
}

export default AllowSendMail
