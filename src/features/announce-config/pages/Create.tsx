import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowSmLeftIcon, CalendarIcon } from '@heroicons/react/outline'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { DraftNotify, NotifyAssignForm, NotifyContentForm, NotifyTitleDescForm } from '~/@types/notify'
import { Button, Progress } from '~/components'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { createProgressOptions } from '~/constant/progress'
import { useLoading } from '~/context'
import { useLocalStorage } from '~/hook'
import { CreateStep1, CreateStep2, CreateStep3, CreateStep4 } from '../components'

const Create = () => {
    const [, setDraftNotify, removeDraft] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const [stepParent] = useAutoAnimate<HTMLDivElement>()
    const [buttonRef] = useAutoAnimate<HTMLDivElement>()
    const navigate = useNavigate()
    const { loading, setSubmitLoading } = useLoading()
    const [step, setStep] = useState(1)

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

    const onSubmitStep4 = async () => {
        try {
            setSubmitLoading(true)
            removeDraft()
            navigate(-1)
            toast.success('Tạo thông báo thành công')
        } catch (error) {
            console.log(error)
            toast.error('Tạo thông báo thất bại')
        } finally {
            setSubmitLoading(false)
        }
    }

    const getStepId = (step: number) => `step-${step}`

    const stepData = useMemo(() => {
        const steps: { [x: number]: React.ReactNode } = {
            1: <CreateStep1 id={getStepId(1)} onSubmit={onSubmitStep1} />,
            2: <CreateStep2 id={getStepId(2)} onSubmit={onSubmitStep2} />,
            3: <CreateStep3 id={getStepId(3)} onSubmit={onSubmitStep3} />,
            4: <CreateStep4 id={getStepId(4)} onSubmit={onSubmitStep4} />,
        }

        return steps[step] ?? 'Unknown step'
    }, [step])

    const handleBack = () => {
        if (step > 1) {
            setStep((prev) => prev - 1)
            return
        }
        navigate(-1)
    }

    const handleSchedule = () => {}

    const stepId = useMemo(() => getStepId(step), [step])

    return (
        <div className='sm:mt-10 mt-5'>
            <div className='bg-white min-h-[80vh] rounded-xl shadow-lg py-6 px-4 sm:py-8'>
                <div className='max-w-xl w-full mx-auto'>
                    <Progress step={step} options={createProgressOptions} />
                    {step > 1 && (
                        <button
                            className='mb-2 p-1 bg-slate-200 hover:bg-slate-700 cursor-pointer transition-colors group rounded-full inline-block disabled:opacity-50'
                            onClick={handleBack}
                            disabled={loading.submit}
                        >
                            <ArrowSmLeftIcon className='h-6 text-gray-700 group-hover:text-white transition-colors' />
                        </button>
                    )}
                    <div ref={stepParent}>
                        {stepData}
                        <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                            <div className='flex sm:justify-start justify-end space-x-3' ref={buttonRef}>
                                <Button
                                    color={step === 4 ? 'radicalRed' : 'blue'}
                                    type='submit'
                                    form={stepId}
                                    disabled={loading.submit}
                                >
                                    {step === 4 ? 'Gửi thông báo' : 'Tiếp theo'}
                                </Button>
                                {step === 4 && (
                                    <Button
                                        color='cyan'
                                        type='button'
                                        disabled={loading.submit || true}
                                        onClick={handleSchedule}
                                    >
                                        <CalendarIcon className='h-6' />
                                        Lên lịch hẹn
                                    </Button>
                                )}
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
        </div>
    )
}

export default Create
