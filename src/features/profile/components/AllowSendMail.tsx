import { isUndefined } from 'lodash'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Toggle } from '~/components/_base'
import { client } from '~/sanityConfig'
import useAuth from '~/store/auth'

const AllowSendMail = () => {
    const { userProfile } = useAuth()
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
                        toast.success('Cập nhật thành công')
                    }
                    sendMail()
                } catch (error) {
                    console.log(error)
                    toast.error('Cập nhật thất bại')
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
            <Toggle form={form} name='allowSendMail' label='Cho phép nhận thông tin qua email' />
        </form>
    )
}

export default AllowSendMail
