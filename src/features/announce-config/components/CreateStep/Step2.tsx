import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { CreateStep2Props } from '~/@types/announce-config'
import { DraftNotify, NotifyTitleDescForm } from '~/@types/notify'
import { Input, RichText } from '~/components/_base'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'

const schema = yup.object().shape({
    title: yup.string().required('Vui lòng nhập tiêu đề thông báo'),
    description: yup.string(),
})

const Step2: React.FC<CreateStep2Props> = ({ id, onSubmit }) => {
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const form = useForm<NotifyTitleDescForm>({
        defaultValues: {
            title: draftNotify?.title ?? '',
            description: draftNotify?.description ?? '',
        },
        resolver: yupResolver(schema),
    })
    const handleSubmit = async (data: NotifyTitleDescForm) => {
        onSubmit(data)
    }
    return (
        <form
            id={id}
            onSubmit={form.handleSubmit(handleSubmit)}
            className='flex h-full flex-col max-w-xl w-full mx-auto'
        >
            <div className='space-y-5 mb-5'>
                <Input label='Tiêu đề' form={form} name='title' autoFocus />
                <RichText
                    label='Mô tả ngắn'
                    form={form}
                    name='description'
                    placeholder='Nhập nội dung'
                    className='xs'
                />
            </div>
        </form>
    )
}

export default Step2
