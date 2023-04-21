import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { localStorageValue } from '~/@types/hook'
import { DraftNotify, NotifyAssignForm, NotifyContentForm, NotifyTitleDescForm } from '~/@types/notify'
import { AnimateWrap, BackButton, Button, Progress, SubmitWrap, Transaction } from '~/components'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLoading } from '~/context'
import { useAxios, useLocalStorage } from '~/hook'
import { useCreateProgressOptions } from '~/hook/progress'
import LANGUAGE from '~/i18n/language/key'
import { CreateStep1, CreateStep2, CreateStep3, CreateStep4 } from '../components'

const Create = () => {
    const { t } = useTranslation()
    const [, setDraftNotify, removeDraft] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const navigate = useNavigate()
    const { loading, setSubmitLoading } = useLoading()
    const [step, setStep] = useState(1)
    const createProgressOptions = useCreateProgressOptions()
    const axios = useAxios()

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
                await axios.post('/notification/assign', { data, url: import.meta.env.VITE_APP_URL })
                removeDraft()
                navigate('/announce-config', { replace: true })
                toast.success(t(LANGUAGE.NOTIFY_CREATE_NOTIFY_SUCCESS))
            }
        } catch (error) {
            console.log(error)
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
        <Transaction title={t(LANGUAGE.CREATE_NOTIFY)}>
            <div className='mt-5 sm:mt-10'>
                <div className='min-h-[80vh] rounded-xl bg-white py-6 px-4 shadow-lg dark:bg-slate-800 sm:py-8'>
                    <Progress step={step} options={createProgressOptions} className='mx-auto w-full max-w-xl' />
                    <AnimateWrap>
                        {step > 1 && (
                            <div
                                className={clsx('mx-auto w-full', {
                                    'max-w-xl': ![4].includes(step),
                                })}
                            >
                                <BackButton onClick={handleBack} disabled={loading.submit} />
                            </div>
                        )}
                        {stepData}
                        <SubmitWrap className={clsx({ 'max-w-xl': ![1, 4].includes(step) })}>
                            <Button
                                color={step === 4 ? 'radicalRed' : 'blue'}
                                type='submit'
                                form={stepId}
                                disabled={loading.submit}
                            >
                                {step === 4 ? t(LANGUAGE.SEND_NOTIFY) : t(LANGUAGE.NEXT)}
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
                                    {t(LANGUAGE.CANCEL)}
                                </Button>
                            )}
                        </SubmitWrap>
                    </AnimateWrap>
                </div>
            </div>
        </Transaction>
    )
}

export default Create
