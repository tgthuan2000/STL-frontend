import { EmailJSResponseStatus } from '@emailjs/browser'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { uuid } from '@sanity/uuid'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DraftNotify, NotifyAssignForm, NotifyContentForm, NotifyTitleDescForm } from '~/@types/notify'
import { BackButton, Button, Progress } from '~/components'
import { EMAIL_TEMPLATES } from '~/constant/email-template'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { createProgressOptions } from '~/constant/progress'
import { useLoading } from '~/context'
import { useLocalStorage, useMail } from '~/hook'
import { localStorageValue } from '~/hook/useLocalStorage'
import { client } from '~/sanityConfig'
import { GET_USERS_ID } from '~/schema/query/user'
import { CreateStep1, CreateStep2, CreateStep3, CreateStep4 } from '../components'

interface UserEmail {
    _id: string
    userName: string
    email: string
    allowSendMail: boolean
    sendMail: boolean
}

const Create = () => {
    const [, setDraftNotify, removeDraft] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const [stepParent] = useAutoAnimate<HTMLDivElement>()
    const [buttonRef] = useAutoAnimate<HTMLDivElement>()
    const navigate = useNavigate()
    const { loading, setSubmitLoading } = useLoading()
    const [step, setStep] = useState(1)
    const [sendMail] = useMail(EMAIL_TEMPLATES.NEW_NOTIFY)

    const onSubmitStep1 = async (data: NotifyContentForm) => {
        try {
            setSubmitLoading(true)
            setDraftNotify((prev) => ({ ...prev, content: data.content }))
            setStep(2)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const onSubmitStep2 = async (data: NotifyTitleDescForm) => {
        try {
            setSubmitLoading(true)
            setDraftNotify((prev) => ({ ...prev, title: data.title, description: data.description }))
            setStep(3)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const onSubmitStep3 = async (data: NotifyAssignForm) => {
        try {
            setSubmitLoading(true)
            setDraftNotify((prev) => ({ ...prev, users: data.users, sendAll: data.sendAll }))
            setStep(4)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const onSubmitStep4 = async (data: localStorageValue<DraftNotify>) => {
        try {
            setSubmitLoading(true)

            if (data) {
                const notifyId = uuid()
                const __ = client.transaction()
                const sentUsers: Array<Promise<EmailJSResponseStatus>> = []

                const createNotifyAssign = (data: Array<{ _id: string }> | undefined) => {
                    if (!isEmpty(data)) {
                        data?.forEach((d) => {
                            const doc = {
                                _type: 'assignNotify',
                                notify: { _type: 'reference', _ref: notifyId },
                                user: { _type: 'reference', _ref: d._id },
                                read: false,
                            }
                            __.create(doc)
                        })
                    }
                }

                const createSendMail = (
                    data: Array<UserEmail> | undefined,
                    callback: (mail: Promise<EmailJSResponseStatus>) => void
                ) => {
                    if (!isEmpty(data)) {
                        data?.filter((d, i, s) => d.allowSendMail && d.sendMail && s.indexOf(d) === i).forEach((d) => {
                            if (!d.email || !d.userName || !notifyId || !import.meta.env.VITE_APP_URL) {
                                console.log('Lỗi biến', {
                                    email: d.email,
                                    userName: d.userName,
                                    notifyId,
                                    url: import.meta.env.VITE_APP_URL,
                                })
                                toast.error('Lỗi gửi email')
                                return
                            }
                            const mail = sendMail({
                                to_name: d.userName,
                                to_email: d.email,
                                url: `${import.meta.env.VITE_APP_URL}/notify/${notifyId}`,
                            })
                            callback(mail)
                        })
                    }
                }

                /* CREATE NOTIFY */
                const documentCreateNotify = {
                    _id: notifyId,
                    _type: 'notify',
                    title: data.title,
                    description: data.description,
                    content: data.content,
                }
                __.createIfNotExists(documentCreateNotify)

                /* CREATE NOTIFY ASSIGN */
                if (data.sendAll) {
                    const users = await client.fetch<Array<UserEmail>>(GET_USERS_ID)
                    createNotifyAssign(users)
                    /* Xử lí gửi email */
                    createSendMail(users, (d) => sentUsers.push(d))
                } else {
                    createNotifyAssign(data.users)
                    /* Xử lí gửi email */
                    createSendMail(data.users, (d) => sentUsers.push(d))
                }

                await __.commit()

                if (!isEmpty(sentUsers)) {
                    const data = await Promise.all(sentUsers)
                    console.log(data)
                }

                removeDraft()
                navigate('/announce-config', { replace: true })
                toast.success('Tạo thông báo thành công')
            }
        } catch (error) {
            console.log(error)
            toast.error('Tạo thông báo thất bại')
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleSchedule = () => {}

    const getStepId = (step: number) => `step-${step}`

    const stepData = useMemo(() => {
        // An object that maps step numbers to components
        const steps: { [x: number]: React.ReactNode } = {
            1: <CreateStep1 id={getStepId(1)} onSubmit={onSubmitStep1} />,
            2: <CreateStep2 id={getStepId(2)} onSubmit={onSubmitStep2} />,
            3: <CreateStep3 id={getStepId(3)} onSubmit={onSubmitStep3} />,
            4: <CreateStep4 id={getStepId(4)} onSubmit={onSubmitStep4} />,
        }

        // Return the component for the current step, or a placeholder if the step does not exist
        return steps[step] ?? 'Unknown step'
    }, [step])

    const handleBack = () => {
        if (step > 1) {
            setStep((prev) => prev - 1)
            return
        }
        navigate(-1)
    }

    const stepId = useMemo(() => getStepId(step), [step])

    return (
        <div className='sm:mt-10 mt-5'>
            <div className='bg-white dark:bg-slate-800 min-h-[80vh] rounded-xl shadow-lg py-6 px-4 sm:py-8'>
                <Progress step={step} options={createProgressOptions} className='max-w-xl w-full mx-auto' />
                <div ref={stepParent}>
                    {step > 1 && (
                        <div
                            className={clsx('w-full mx-auto', {
                                'max-w-xl': ![4].includes(step),
                            })}
                        >
                            <BackButton onClick={handleBack} disabled={loading.submit} />
                        </div>
                    )}
                    {stepData}
                    <div
                        className={clsx(
                            'flex-shrink-0 border-t border-gray-200 dark:border-slate-600 px-4 py-5 sm:px-6 w-full mx-auto',
                            {
                                'max-w-xl': ![1, 4].includes(step),
                            }
                        )}
                    >
                        <div className='flex sm:justify-start justify-end space-x-3' ref={buttonRef}>
                            <Button
                                color={step === 4 ? 'radicalRed' : 'blue'}
                                type='submit'
                                form={stepId}
                                disabled={loading.submit}
                            >
                                {step === 4 ? 'Gửi thông báo' : 'Tiếp theo'}
                            </Button>
                            {/* {step === 4 && (
                                <Button
                                    color='cyan'
                                    type='button'
                                    disabled={loading.submit || true}
                                    onClick={handleSchedule}
                                >
                                    <CalendarIcon className='h-6' />
                                    Lên lịch hẹn
                                </Button>
                            )} */}
                            {step === 1 && (
                                <Button
                                    color='outline'
                                    type='button'
                                    onClick={() => {
                                        navigate(-1)
                                    }}
                                >
                                    Hủy bỏ
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create
