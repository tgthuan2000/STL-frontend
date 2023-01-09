import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input, RichText, Selection, TextArea } from '~/components/_base'
import { Button, LazySearchSelect, Progress } from '~/components'
import { useLoading } from '~/context'
import { ArrowSmLeftIcon, TrashIcon } from '@heroicons/react/outline'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { IUserProfile } from '~/@types/auth'
import { ProgressItem } from '~/components/Progress'
import { UserSvg } from '~/components/_constant'
import { isEmpty } from 'lodash'
import { TEMPLATE } from '~/constant/template'
import { useQuery } from '~/hook'
import { SEARCH_USER_PAGINATE } from '~/schema/query/user'
import { COUNT_PAGINATE, TAGS } from '~/constant'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'

interface NotifyContentForm {
    content: string
}

interface NotifyTitleDescForm {
    title: string
    description: string
}
interface NotifyAssignForm {
    users: IUserProfile[]
}

const step1Schema = yup.object().shape({
    content: yup.string().required('Vui lòng nhập nội dung thông báo'),
})

const step2Schema = yup.object().shape({
    title: yup.string().required('Vui lòng nhập tiêu đề thông báo'),
    description: yup.string(),
})

const step3Schema = yup.object().shape({
    search: yup.object().nullable(),
    users: yup.array().min(1, 'Vui lòng chọn ít nhất 1 người nhận'),
})

const createProgressOptions: Array<ProgressItem> = [
    { step: 1, label: 'Nội dung' },
    { step: 2, label: 'Tiêu đề và mô tả' },
    { step: 3, label: 'Chọn người nhận' },
    { step: 4, label: 'Xem trước, đặt lịch và gửi' },
]

const Create = () => {
    const [stepParent] = useAutoAnimate<HTMLDivElement>()
    const [buttonRef] = useAutoAnimate<HTMLDivElement>()
    const navigate = useNavigate()
    const { loading, setSubmitLoading } = useLoading()
    const [step, setStep] = useState(1)

    const onSubmitContent = async (data: NotifyContentForm) => {
        try {
            setSubmitLoading(true)
            console.log(data)
            setStep(2)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const onSubmitTitleDesc = async (data: NotifyTitleDescForm) => {
        try {
            setSubmitLoading(true)
            console.log(data)
            setStep(3)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const onSubmitAssign = async (data: NotifyAssignForm) => {
        try {
            setSubmitLoading(true)
            console.log(data)
            setStep(4)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const onSubmitPreview = async () => {}

    const getStepId = (step: number) => `step-${step}`

    const stepData = useMemo(() => {
        const steps: { [x: number]: React.ReactNode } = {
            1: <Step1 id={getStepId(1)} onSubmit={onSubmitContent} />,
            2: <Step2 id={getStepId(2)} onSubmit={onSubmitTitleDesc} />,
            3: <Step3 id={getStepId(3)} onSubmit={onSubmitAssign} />,
            4: <Step4 id={getStepId(4)} previewData='Preview Data' onSubmit={onSubmitPreview} />,
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
                                    form={getStepId(step)}
                                    disabled={loading.submit}
                                >
                                    {step === 4 ? 'Gửi thông báo' : 'Tiếp theo'}
                                </Button>
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

interface Step1Props {
    id: string
    onSubmit: (data: NotifyContentForm) => Promise<void>
}

const Step1: React.FC<Step1Props> = ({ id, onSubmit }) => {
    const form = useForm<NotifyContentForm>({
        defaultValues: {
            content: '',
        },
        resolver: yupResolver(step1Schema),
    })
    const handleSubmit = async (data: NotifyContentForm) => {
        console.log(data)
        onSubmit(data)
    }
    return (
        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className='flex h-full flex-col'>
            <div className='mb-5'>
                <RichText form={form} name='content' label='Nội dung' placeholder='Nhập nội dung thông báo' />
            </div>
        </form>
    )
}

interface Step2Props {
    id: string
    onSubmit: (data: NotifyTitleDescForm) => Promise<void>
}

const Step2: React.FC<Step2Props> = ({ id, onSubmit }) => {
    const form = useForm<NotifyTitleDescForm>({
        defaultValues: {
            title: '',
            description: '',
        },
        resolver: yupResolver(step2Schema),
    })
    const handleSubmit = async (data: NotifyTitleDescForm) => {
        console.log(data)
        onSubmit(data)
    }
    return (
        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className='flex h-full flex-col'>
            <div className='space-y-5 mb-5'>
                <Input label='Tiêu đề' form={form} name='title' />
                <TextArea label='Mô tả ngắn' form={form} name='description' />
            </div>
        </form>
    )
}

interface Step3Props {
    id: string
    onSubmit: (data: NotifyAssignForm) => Promise<void>
}
export interface QueryData {
    users: {
        data: IUserProfile[]
        hasNextPage: boolean
    }
}
const Step3: React.FC<Step3Props> = ({ id, onSubmit }) => {
    const [userRef] = useAutoAnimate<HTMLDivElement>()

    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<QueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<QueryData>
    }>({
        query: { users: SEARCH_USER_PAGINATE },
        params: { search: '', __fromUser: 0, __toUser: COUNT_PAGINATE },
        tags: { users: TAGS.ALTERNATE },
    })

    const [{ users }, fetchData, deleteCacheData, reload] = useQuery<QueryData>(query, params, tags)
    const form = useForm<NotifyAssignForm>({
        defaultValues: { users: [] },
        resolver: yupResolver(step3Schema),
    })
    const handleSubmit = async (data: NotifyAssignForm) => {
        console.log(data)
        onSubmit(data)
    }

    const __users = form.watch('users')

    const handleChange = (data: any) => {
        if (data) {
            if (!__users.find((u) => u._id === data._id)) {
                form.setValue('users', [...__users, data])
            } else {
                form.setValue(
                    'users',
                    __users.filter((u) => u._id !== data._id)
                )
            }
        }
    }

    const handleSearch = (search: string) => {
        setQuery((prev) => ({
            ...prev,
            params: {
                ...prev.params,
                search,
            },
        }))

        reload('users')
    }

    const handleScrollGetMore = () => {
        const length = users?.data?.data.length

        if (length) {
            setQuery((prev) => ({
                ...prev,
                params: { ...prev.params, __fromUsers: length, __toUsers: length + COUNT_PAGINATE },
            }))
            reload('users')
        }
    }

    return (
        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className='flex h-full flex-col'>
            <div className='space-y-5 mb-5'>
                <LazySearchSelect
                    options={users.data?.data}
                    hasNextPage={users.data?.hasNextPage}
                    loading={users.loading}
                    label='Tìm kiếm'
                    onChange={handleChange}
                    onSearch={handleSearch}
                    onGetMore={handleScrollGetMore}
                />
                <div>
                    <p className='inline-block text-sm font-medium text-gray-700'>Danh sách người nhận thông báo</p>
                    <div className='mt-1 select-none border rounded-lg' ref={userRef}>
                        {isEmpty(__users) ? (
                            <p className='px-4 py-2 text-center'>{TEMPLATE.EMPTY_DATA}</p>
                        ) : (
                            __users.map((user) => (
                                <div className='px-4 py-2 flex gap-2 items-center'>
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.userName}
                                            className='h-8 w-8 rounded-full flex-shrink-0 object-cover'
                                        />
                                    ) : (
                                        <div className='h-8 w-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-400'>
                                            <UserSvg />
                                        </div>
                                    )}
                                    <div className='flex-1'>
                                        <p className='font-medium text-gray-900 truncate'>{user.userName}</p>
                                        <small className='font-normal text-gray-500 truncate block'>{user.email}</small>
                                    </div>
                                    <span
                                        className='p-2 bg-slate-100 hover:bg-slate-200 transition-all rounded-lg cursor-pointer'
                                        onClick={() => {
                                            form.setValue(
                                                'users',
                                                __users.filter((u) => u._id !== user._id)
                                            )
                                        }}
                                    >
                                        <TrashIcon className='h-5 text-radical-red-500' />
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}

interface Step4Props {
    id: string
    previewData: any
    onSubmit: () => Promise<void>
}

const Step4: React.FC<Step4Props> = ({ id, previewData, onSubmit }) => {
    const form = useForm()
    return (
        <form id={id} onSubmit={form.handleSubmit(onSubmit)} className='flex h-full flex-col'>
            <div>{previewData}</div>
        </form>
    )
}
