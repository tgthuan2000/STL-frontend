import { Switch } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useDF } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { useProfile } from '~/store/auth'

const AllowSendMail = () => {
    const { t } = useTranslation()
    const { userProfile, addUserProfile } = useProfile()
    const [active, setActive] = useState(Boolean(userProfile?.allowSendMail))
    const toggleCheck = useDF<{ active: boolean }>((params) => {
        const { active } = params
        setActive((prev) => !prev)

        const commit = () => {
            return client.patch(userProfile?._id as string, { set: { allowSendMail: !active } }).commit()
        }

        const resolved = () => {
            addUserProfile({ ...userProfile, allowSendMail: active } as any)
            toast.success(t(LANGUAGE.NOTIFY_UPDATE_SUCCESS))
        }

        const error = (err: any) => {
            toast.error(t(LANGUAGE.NOTIFY_UPDATE_FAILED))
        }

        return { commit, resolved, error }
    }, 800)

    return (
        <div>
            <div className='flex items-center justify-between'>
                <label className='text-sm sm:text-base'>{t(LANGUAGE.RECEIVE_NOTIFY_BY_MAIL)}</label>
                <Switch
                    checked={active}
                    className={clsx(
                        active ? 'bg-indigo-600 dark:bg-sky-500' : 'bg-gray-200 dark:bg-slate-700',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-all'
                    )}
                    onChange={() => toggleCheck({ active })}
                >
                    <span
                        className={clsx(
                            active ? 'translate-x-6' : 'translate-x-1',
                            'inline-block h-4 w-4 transform rounded-full bg-white transition-all'
                        )}
                    />
                </Switch>
            </div>
        </div>
    )
}

export default AllowSendMail
