import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { CreateStep1Props } from '~/@types/announce-config'
import { DraftNotify, NotifyContentForm } from '~/@types/notify'
import { RichText } from '~/components/_base'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'

const schema = yup.object().shape({
    content: yup.string().required('Vui lòng nhập nội dung thông báo'),
})

const Step1: React.FC<CreateStep1Props> = ({ id, onSubmit }) => {
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const form = useForm<NotifyContentForm>({
        defaultValues: {
            content: draftNotify?.content ?? '',
        },
        resolver: yupResolver(schema),
    })
    const handleSubmit = async (data: NotifyContentForm) => {
        onSubmit(data)
    }
    return (
        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className='flex h-full flex-col'>
            <div className='mt-3 mb-5'>
                <RichText form={form} name='content' label='Nội dung' placeholder='Nhập nội dung thông báo' />
            </div>
        </form>
    )
}

export default Step1
