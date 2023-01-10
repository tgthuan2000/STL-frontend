import { useForm } from 'react-hook-form'
import { DraftNotify } from '~/@types/notify'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import parse from 'html-react-parser'
import { UserSvg } from '~/components/_constant'
import { TEMPLATE } from '~/constant/template'
import { localStorageValue } from '~/hook/useLocalStorage'

interface CreateStep4Props {
    id: string
    onSubmit: (data: localStorageValue<DraftNotify>) => Promise<void>
}

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
                    <p className='inline-block font-medium text-gray-900'>Tiêu đề</p>
                    <div className='p-2'>{draftNotify?.title}</div>
                </div>
                <div>
                    <p className='inline-block font-medium text-gray-900'>Mô tả ngắn</p>
                    <div className='font-normal text-gray-700 text-xs sm:text-sm p-2'>
                        {draftNotify?.description || TEMPLATE.EMPTY_DESCRIPTION}
                    </div>
                </div>
                <div>
                    <p className='inline-block font-medium text-gray-900'>Danh sách người nhận</p>
                    {draftNotify?.sendAll ? (
                        <div className='p-2'>
                            <p className='font-medium text-sm text-radical-red-500 bg-radical-red-50 p-2 rounded-md select-none'>
                                Gửi cho tất cả mọi người
                            </p>
                        </div>
                    ) : (
                        <div className='border rounded-lg m-2'>
                            {draftNotify?.users?.map((user) => (
                                <div key={user._id} className='px-4 py-2 flex gap-2 items-center'>
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
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <p className='inline-block font-medium text-gray-900'>Nội dung</p>
                    <div className='prose border rounded-lg p-5 m-2'>
                        {draftNotify?.content && parse(draftNotify.content)}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Step4
