import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CreateStep4Props } from '~/@types/announce-config'
import { DraftNotify } from '~/@types/notify'
import { Image, Prose } from '~/components'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const Step4: React.FC<CreateStep4Props> = ({ id, onSubmit }) => {
    const { t } = useTranslation()
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const form = useForm()
    const handleSubmit = async () => {
        if (window.confirm(t(LANGUAGE.CONFIRM_NOTIFY) as string)) {
            await onSubmit(draftNotify)
        }
    }
    return (
        <div className='mt-3 text-gray-900 dark:text-slate-200'>
            <form
                id={id}
                onSubmit={form.handleSubmit(handleSubmit)}
                className='mb-4 flex h-full flex-col gap-2 sm:gap-3'
            >
                <div>
                    <p className='inline-block font-medium'>{t(LANGUAGE.LIST_RECEIVE_NOTIFY_MEMBER)}</p>
                    {draftNotify?.sendAll ? (
                        <div className='p-2'>
                            <p className='select-none rounded-md bg-radical-red-50 p-2 text-sm font-medium text-radical-red-500 dark:bg-slate-900'>
                                {t(LANGUAGE.SEND_ALL_MEMBER)}
                            </p>
                        </div>
                    ) : (
                        <div className='m-2 max-w-sm rounded-lg border dark:border-slate-600'>
                            {draftNotify?.users?.map((user) => (
                                <div key={user._id} className='flex items-center gap-2 px-4 py-2'>
                                    <Image
                                        src={user.image}
                                        alt={user.userName}
                                        avatar={{ roundFull: true, size: 'small' }}
                                    />

                                    <div className='flex-1'>
                                        <p className='truncate font-medium'>{user.userName}</p>
                                        <small className='block truncate font-normal text-gray-500'>{user.email}</small>
                                    </div>
                                    {user.allowSendMail && user.sendMail && (
                                        <span title={t(LANGUAGE.SEND_MAIL) as string} className='text-cyan-400'>
                                            <EnvelopeIcon className='h-5' />
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <p className='inline-block font-medium'>{t(LANGUAGE.TITLE)}</p>
                    <div className='p-2 text-base sm:text-lg'>{draftNotify?.title}</div>
                </div>
                <div>
                    <p className='inline-block font-medium'>{t(LANGUAGE.SHORT_DESCRIPTION)}</p>
                    <div className='m-2 rounded-lg border p-3 dark:border-slate-600 sm:p-5'>
                        <Prose>{draftNotify?.description ?? t(LANGUAGE.EMPTY_DESCRIPTION)}</Prose>
                    </div>
                </div>

                <div>
                    <p className='inline-block font-medium'>{t(LANGUAGE.CONTENT)}</p>
                    <div className='m-2 rounded-lg border p-3 dark:border-slate-600 sm:p-5'>
                        <Prose>{draftNotify?.content ?? t(LANGUAGE.EMPTY_DATA)}</Prose>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Step4
