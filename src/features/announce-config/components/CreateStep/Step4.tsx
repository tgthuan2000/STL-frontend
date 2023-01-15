import { useForm } from 'react-hook-form'
import { CreateStep4Props } from '~/@types/announce-config'
import { DraftNotify } from '~/@types/notify'
import { Image, Prose } from '~/components'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { TEMPLATE } from '~/constant/template'
import { useLocalStorage } from '~/hook'

const Step4: React.FC<CreateStep4Props> = ({ id, onSubmit }) => {
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const form = useForm()
    const handleSubmit = async () => {
        if (window.confirm('Bạn có chắc chắn muốn gửi thông báo này?')) {
            await onSubmit(draftNotify)
        }
    }
    return (
        <div>
            <form
                id={id}
                onSubmit={form.handleSubmit(handleSubmit)}
                className='flex h-full flex-col sm:gap-3 gap-2 mb-4'
            >
                <div>
                    <p className='inline-block font-medium text-gray-900'>Danh sách người nhận</p>
                    {draftNotify?.sendAll ? (
                        <div className='p-2'>
                            <p className='font-medium text-sm text-radical-red-500 bg-radical-red-50 p-2 rounded-md select-none'>
                                Gửi cho tất cả mọi người
                            </p>
                        </div>
                    ) : (
                        <div className='border rounded-lg m-2 max-w-sm'>
                            {draftNotify?.users?.map((user) => (
                                <div key={user._id} className='px-4 py-2 flex gap-2 items-center'>
                                    <Image src={user.image} alt={user.userName} size='small' />

                                    <div className='flex-1'>
                                        <p className='font-medium text-gray-900 truncate'>{user.userName}</p>
                                        <small className='font-normal text-gray-500 truncate block'>{user.email}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <p className='inline-block font-medium text-gray-900'>Tiêu đề</p>
                    <div className='p-2 sm:text-lg text-base'>{draftNotify?.title}</div>
                </div>
                <div>
                    <p className='inline-block font-medium text-gray-900'>Mô tả ngắn</p>
                    <div className='border sm:p-5 p-3 m-2 rounded-lg'>
                        <Prose>{draftNotify?.description ?? TEMPLATE.EMPTY_DESCRIPTION}</Prose>
                    </div>
                </div>

                <div>
                    <p className='inline-block font-medium text-gray-900'>Nội dung</p>
                    <div className='border sm:p-5 p-3 m-2 rounded-lg'>
                        <Prose>{draftNotify?.content ?? TEMPLATE.EMPTY_DATA}</Prose>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Step4
